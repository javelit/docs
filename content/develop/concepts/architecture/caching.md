---
title: Caching overview
slug: /develop/concepts/architecture/caching
---

# Caching overview

Javelit runs your script from top to bottom at every user interaction or code change. This execution model 
makes development super easy. But it comes with two major challenges:

1. Long-running functions run again and again, which slows down your app.
2. Objects get recreated again and again, which makes it hard to persist them across reruns or sessions.

But don't worry! Javelit lets you tackle both issues by providing a cache `Map` with `Jt.cache`. Cached values are stored 
globally and shared across all users and reruns. The pattern is simple: check if a value exists in the 
cache, compute it if absent or retrieve it if present. This makes your app much faster 
and helps with persisting objects across reruns. If you need 
to save results that should only be accessible within a session, use [Session State](/develop/concepts/architecture/session-state) instead.

## Minimal example

To get a value from the cache or compute it if absent: 

```java
var res = Jt.cache().computeIfAbsent("my_key", key -> computeValue());
```
... yes, this is just the Java [Map](https://docs.oracle.com/javase/8/docs/api/java/util/Map.html) interface being used.  
`Jt.cache()` actually returns a `TypedMap`. `TypedMap` overloads `Map<String, Object>`, adding casting methods for primitive types:
```
get --> getString, getInt, getLong, getBoolean, getDouble
computeIfAbsent --> computeIfAbsentString, computeIfAbsentInt, computeIfAbsentLong, computeIfAbsentBoolean, computeIfAbsentDouble
compute --> computeInt, computeLong, ...
computeIfPresent --> ...
...
```

Caching and retrieving primitive values is simpler with these helper methods.

<Warning>
Be cautious when performing mutations on the data stored in the map!   
If you don't want the mutations to affect the cached value - hence all users - you should perform a deep-copy.
Use `Jt.deepCopy()`.
</Warning>

### Common use cases for caching
- Reading data from a file
- Transforming data
- Performing expensive computations
- Querying a database
- Querying an API
- Loading ML models
- Running an ML model (inference)
- Creating or processing images
- Creating charts
- Lazy computations
- Database connections
- Opening persistent file handles
- Opening persistent threads

## Advanced usage

### Controlling cache size and duration

If your app runs for a long time and constantly caches values, you might run into two problems:

1. The app runs out of memory because the cache is too large.
2. Objects in the cache become stale, e.g. because you cached old data from a database.

As of today, Javelit is not opinionated on how these problems should be managed.
We recommend using existing Cache implementations like [Guava cache](https://github.com/google/guava/wiki/cachesexplained). 
Put the "advanced" cache implementation inside the Javelit cache.

Here is an example for a cache with a maximum size of 1000 elements and a TTL of 10 minutes:  
```java
import java.util.concurrent.TimeUnit;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.LoadingCache;

...

LoadingCache expiringCache = (LoadingCache) Jt.cache().computeIfAbsent("expiringCache", 
                         k -> CacheBuilder.newBuilder()
                                          .maximumSize(1000)
                                          .expireAfterWrite(10, TimeUnit.MINUTES)
                                          .build(...));

// use the expiring cache 
var cachedValue = expiringCache.getUnchecked("some_value");
```


{/* TODO cyril implement spinner experience  
### Customizing the spinner
*/}

### Using components inside cache computations

It is totally possible to use components inside a cache computation:
```java
var dataframe = Jt.cache().computeIfAbsent("data", k -> {
    Jt.text("Loading dataframe").use();
    return loadData();
    });
```

though it is **NOT** recommended to use input widgets, as the behavior will be confusing:


```java
var dataframe = Jt.cache().computeIfAbsent("data", k -> {
   // DON'T DO THIS !  
   int numLines = Jt.slider("Number of lines to load").use();
   return loadData(numLines);
});
```
*Explanation for the brave: At the first run, `numLines` will take the default value of the widget. The cached value will be 
computed from the default value of the widget. The widget will be visible to the user. Then when the user interacts 
with the widget, numLines will take the user input value. There will be a cache hit, so the cached value will not be 
changed, the new numLines will not be used and the slider will not appear.*

Prefer: 
```java
int numLines = Jt.slider("number of lines to load").use();
var dataframe = Jt.cache().computeIfAbsent("data_" + numLines, k -> {
   Jt.text("loading dataframe with num lines " + numLines).use();
   return loadData(numLines);
});
```
Notice how we have one cache key for every `numLines` value possible: `computeIfAbsent("data_" + numLines, ...`. But 
be cautious, this could make the cache grow fast.  
