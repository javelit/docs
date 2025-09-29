---
title: Caching and state
slug: /develop/api-reference/caching-and-state
---

# Caching and state

Optimize performance and add statefulness to your app!

## Caching

Streamlit provides powerful [cache primitives](/develop/concepts/architecture/caching) for data and global resources. 
They allow your app to stay performant even when loading data from the web, manipulating large datasets, or performing expensive computations.

<TileContainer>

<RefCard href="/develop/api-reference/caching-and-state/jt.cache" size="full">

<h4>Cache data</h4>

Function decorator to cache functions that return data (e.g. dataframe transforms, database queries, ML inference).

```java
// share a ML model - init 
var mlModel = Jt.cache().computeIfAbsent("model", k -> loadMlModel());

// share a DB connection
var conn = Jt.cache().computeIfAbsent("connection", k -> connectToDb());
```

</RefCard>

</TileContainer>

## Browser and server state

Jeamlit re-executes your script with each user interaction. 
Widgets have built-in statefulness between reruns, but Session State lets you do more!

<TileContainer>
{/*
<RefCard href="/develop/api-reference/caching-and-state/st.context">

<h4>Context</h4>

`st.context` provides a read-only interface to access cookies, headers, locale, and other browser-session information.

```python
st.context.cookies
st.context.headers
```

</RefCard>

*/}

<RefCard href="/develop/api-reference/caching-and-state/jt.sessionstate" size="two-third">

<h4>Session State</h4>

Save data between reruns and across pages.

```python
if ((Jt.sessionState().contains("ml_model")) {
    Jt.sessionState().put("ml_model", loadModel());
}
var mlModel = Jt.sessionState().get("ml_model");

// one liner alternative
var mlModel = Jt.sessionState.computeIfAbsent("ml_model", k -> loadModel());
```

</RefCard>
<RefCard href="/develop/api-reference/caching-and-state/st.query_params">

<h4>Query parameters</h4>

Read the query parameters that are shown in the browser's URL bar. 

{/* Get, set, or clear the query parameters that are shown in the browser's URL bar. */}

```java
List<String> people = Jt.urlQueryParameters().get("people");



```

</RefCard>

</TileContainer>
