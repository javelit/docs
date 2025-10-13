---
title: Add statefulness to apps
slug: /develop/concepts/architecture/session-state
---

# Add statefulness to apps

## What is State?

We define access to a Jeamlit app in a browser tab as a **session**. For each browser tab that connects to the Jeamlit server, a new session is created. Jeamlit reruns your script from top to bottom every time you interact with your app. Each reruns takes place in a blank slate: no variables are shared between runs.

Session State is a way to share variables between reruns, for each user session. In addition to the ability to store and persist state, Jeamlit also exposes the ability to manipulate state using Callbacks. Session state also persists across pages inside a [multipage app](/develop/concepts/multipage-apps).

In this guide, we will illustrate the usage of **Session State**, **Components State** and **Callbacks** as we build a stateful Counter app.

For details on the Session State and Callbacks API, please refer to our [Session State API Reference Guide](/develop/api-reference/caching-and-state/jt.sessionstate).

{/* TODO dev rel video
Also, check out this Session State basics tutorial video by Jeamlit Developer Advocate Dr. Marisa Smith to get started:
<YouTube videoId="92jUAXBmZyU" />
*/}

## Build a Counter

Let's call our app `Counter.java`. It initializes a `count` variable and has a button to increment the value stored in the `count` variable:

```java
import io.jeamlit.core.Jt;

public class Counter {
    public static void main(String[] args) {
        Jt.title("Counter Example").use();

        int count = 0;

        boolean increment = Jt.button("Increment").use();
        if (increment) {
            count += 1;
        }

        Jt.text("Count = " + count).use();
    }
}
```

No matter how many times we press the **_Increment_** button in the above app, the `count` remains at 1. Let's understand why:

- Each time we press the **_Increment_** button, Jeamlit reruns `Counter.java` from top to bottom, and with every run, `count` gets initialized to `0`.
- Pressing **_Increment_** subsequently adds 1 to 0, thus `count=1` no matter how many times we press **_Increment_**.

As we'll see later, we can avoid this issue by storing `count` as a Session State variable. By doing so, we're indicating to Jeamlit that it should maintain the value stored inside a Session State variable across app reruns.

Let's learn more about the API to use Session State.

### Initialization

The Session State provides a Java `Map` interface:

```java
// Check if 'key' already exists in session state
// If not, then initialize it
if (!Jt.sessionState().containsKey("key")) {
    Jt.sessionState().put("key", "value");
}

// Or use the more concise and atomic computeIfAbsent pattern
Jt.sessionState().computeIfAbsent("key", k -> "value");
```

`Jt.sessionState()` actually returns a `TypedMap`. `TypedMap` overloads `Map<String, Object>`, adding casting methods for primitive types:
```
get --> getString, getInt, getLong, getBoolean, getDouble
computeIfAbsent --> computeIfAbsentString, computeIfAbsentInt, computeIfAbsentLong, computeIfAbsentBoolean, computeIfAbsentDouble
compute --> computeInt, computeLong, ...
computeIfPresent --> ...
...
```
Manipulating common types is simpler with these methods. 

### Reads and updates

Read the value of an item in Session State using the `get()` method:

```java
// Reads - generic get() returns Object
Object value = Jt.sessionState().get("key");
Jt.text("Value: " + value).use();

// Or use TypedMap casting getters 
int intValue = Jt.sessionState().getInt("count");
```

Update an item in Session State by using the `put()` method:

```java
// Updates
Jt.sessionState().put("key", "value2");
```

In Java, accessing an uninitialized key returns `null`. Use type-safe getters with defaults to avoid `NullPointerException`:

```java
// Returns null if key doesn't exist
Object value = Jt.sessionState().get("nonexistent");  // null

// Safe approach: use getOrDefault
String safeValue = (String) Jt.sessionState().getOrDefault("nonexistent", "default");

// Or use type-safe getters
String strValue = Jt.sessionState().getOrDefaultString("nonexistent", "default");
```

Let's now take a look at a few examples that illustrate how to add Session State to our Counter app.

### Example 1: Add Session State

Now that we've got a hang of the Session State API, let's update our Counter app to use Session State:

```java
import io.jeamlit.core.Jt;

public class Counter {
    public static void main(String[] args) {
        Jt.title("Counter Example").use();

        // Initialize count in session state if not present
        Jt.sessionState().computeIfAbsentInt("count", 0);

        boolean increment = Jt.button("Increment").use();
        if (increment) {
            // Increment the count in session state
            Jt.sessionState().computeInt("count", (k, v) -> v + 1);
        }

        int count = Jt.sessionState().getInt("count");
        Jt.text("Count = " + count).use();
    }
}
```

As you can see in the above example, pressing the **_Increment_** button updates the `count` each time.

### Example 2: Session State and Callbacks

Now that we've built a basic Counter app using Session State, let's move on to something a little more complex. 
The next example uses Callbacks with Session State.

**Callbacks**: A callback is a `Function` which gets called when an input widget changes. Callbacks can be used with 
widgets using the parameters `onChange` (or `onClick`). 
{/* TODO document callbacks in reference ? 
The full Callbacks API can be found in 
our [Session State API Reference Guide](/develop/api-reference/caching-and-state/jt.sessionstate#use-callbacks-to-update-session-state).
*/}

```java 
import io.jeamlit.core.Jt;

public class Counter {
    public static void main(String[] args) {
        Jt.title("Counter Example using Callbacks").use();

        // Initialize count in session state if not present
        Jt.sessionState().computeIfAbsentInt("count", k -> 0);

        Jt.button("Increment")
                .onClick(b -> Jt.sessionState().computeInt("count", (k,v) -> v + 1))
                .use();

        int count = Jt.sessionState().getInt("count");
        Jt.text("Count = " + count).use();
    }
}
```

Now, pressing the **_Increment_** button updates the count each time by calling the Callback `Function` passed in `onClick`.

### Example 3: Forms, Callbacks, Session State and Components State

Say we now want to not only increment the `count`, but also store when it was last updated. 
We illustrate doing this using forms, callbacks and components state:

```java
import io.jeamlit.core.Jt;
import io.jeamlit.core.JtContainer;
import java.time.LocalTime;

public class Counter {
    public static void main(String[] args) {
        Jt.title("Counter Example with Form").use();

        // Initialize session state
        Jt.sessionState().putIfAbsentInt("count", 0);
        Jt.sessionState().putIfAbsent("last_updated", LocalDate.of(2025, 1, 1));

        // Create form
        JtContainer form = Jt.form().use();

        // create input widgets with easy to retrieve keys
        Jt.dateInput("Enter the time")
                .value(LocalDate.now())
                .key("updateDate")
                .use(form);
        Jt.numberInput("Enter a value", Integer.class)
                .value(0)
                .step(1)
                .key("incrementValue")
                .use(form);

        // Handle form submission
        Jt.formSubmitButton("Update")
                .onClick(b -> {
                    Jt.sessionState().computeInt("count", (k, v) -> v + Jt.componentsState().getInt("incrementValue"));
                    Jt.sessionState().put("last_updated", Jt.componentsState().get("updateDate"));
                })
                .use(form);

        // Display current values
        int count = Jt.sessionState().getInt("count");
        LocalDate lastUpdated = (LocalDate) Jt.sessionState().get("last_updated");

        Jt.text("Current Count = " + count).use();
        Jt.text("Last Updated = " + lastUpdated).use();
    }
}
```

Notice how in the callback function we obtain the current values of the input widgets with `Jt.componentsState`.
`Jt.componentsState` is a **read-only** `Map` that holds the values of input widgets that were assigned a key with `.key()`.  
To retrieve a widget’s value by its key, you must manually set the widget’s key using `.key()`.

Learn more about Components State below.

Note: this is an advanced example to showcase callbacks and `Jt.componentsState`. 
The same app could be implemented in a simpler fashion: 

<Collapse title="Click to see the simpler implementation" expanded={false} >
```java
import io.jeamlit.core.Jt;
import io.jeamlit.core.JtContainer;
import java.time.LocalTime;

public class Counter {
    public static void main(String[] args) throws InterruptedException {
        Jt.title("Counter Example with Form").use();

        // Initialize session state
        Jt.sessionState().putIfAbsentInt("count", 0);
        Jt.sessionState().putIfAbsent("last_updated", LocalDate.of(2025, 1, 1));

        // Create form
        JtContainer form = Jt.form().use();

        // create input widgets with easy to retrieve keys
        LocalDate updateDate = Jt.dateInput("Enter the time")
                                  .value(LocalDate.now())
                                  .use(form);
        int incrementValue = Jt.numberInput("Enter a value", Integer.class)
          .value(0)
          .step(1)
          .use(form);

        // Handle form submission
        if (Jt.formSubmitButton("Update").use(form)) {
            Jt.sessionState().computeInt("count", (k, v) -> v + incrementValue);
            Jt.sessionState().put("last_updated", updateDate);
        }

        // Display current values
        int count = Jt.sessionState().getInt("count");
        LocalDate lastUpdated = (LocalDate) Jt.sessionState().get("last_updated");

        Jt.text("Current Count = " + count).use();
        Jt.text("Last Updated = " + lastUpdated).use();
    }
    }
}
```
</Collapse> 


## Advanced concepts

### Session State and Components State association

**Session State** allows you to store variables across reruns.   
In a multipage app, Session State variables are available across pages. 

**Components State** allows you to retrieve the value of any *keyed* input widget, at any point in the app logic, across reruns. 
In a multipage app, **keyed** widget values are page-scoped. If the same key (e.g., `.key("my-key")`) is used on two 
different pages, calling `Jt.componentsState().get("my-key")` will correctly return the value for the widget on the current page.   
`Jt.componentsState()` is not mutable to prevent mistakes. To update the value a of widget by key, you can use `Jt.setComponentState()`.

By default, **keyed** input widget values are persisted even if the widget is not displayed in an app run.  
This is simpler to understand with an example. Run: 
```bash
jeamlit run https://raw.githubusercontent.com/jeamlit/jeamlit/refs/heads/main/examples/WidgetPersistenceAfterNoRender.java
```
This can be disabled by calling `.noPersist()`. 

In a multipage app, *keyed* widget values persist across pages. For example, if you navigate from Page1 to Page2 and 
then return to Page1, the *keyed* widget values on Page1 remain intact.   
To force a page to clear all its **keyed** values when left, use `Jt.page(...).noPersistWhenLeft`.
Here is an example you can run:
```bash
jeamlit run https://raw.githubusercontent.com/jeamlit/jeamlit/refs/heads/main/examples/WidgetPersistenceMultiPage.java
```


### Caveats and limitations

Here are some limitations to keep in mind when using Session State and Components State

- Session State exists for as long as the tab is open and connected to the Jeamlit server. As soon as you close the tab, everything stored in Session State is lost.
- Session State is not persisted. If the Jeamlit server crashes, then everything stored in Session State gets wiped
- the same applies for Components State

{/* TODO improve jt.sessionstate doc

For caveats and limitations with the Session State API, please see the [API limitations](/develop/api-reference/caching-and-state/jt.sessionstate#caveats-and-limitations).

*/}
