---
title: Advanced concepts of Jeamlit
slug: /get-started/fundamentals/advanced-concepts
---

# Advanced concepts of Jeamlit

Now that you know how a Jeamlit app runs and handles data, let's talk about being efficient. Caching allows you to save the output of a function so you can skip over it on rerun. Session State lets you save information for each user that is preserved between reruns. This not only allows you to avoid unecessary recalculation, but also allows you to create dynamic pages and handle progressive processes.

## Caching

Caching allows your app to stay performant even when loading data from the web, manipulating large datasets, or performing expensive computations.

To cache a value in Jeamlit, you simply need to put it in a dedicated `Map` that is shared between all users: `Jt.cache()`.

Example:

```java
// initialization - this will only run once for all users
if (!Jt.cache().contains("data")) {
    Jt.cache().put("data", loadData());    
}

// use the data in your app
var data = Jt.cache().get("data");
Jt.text("here is the data: " + data.toString()).use();
```

Use this cache to store ML models, shared database connections, data read from a file, etc...


<Note>
You app may perform mutations on the data.  
If you don't want the mutations to affect the cached value - hence all users - you should perform a deep-copy.
Use `Jt.deepCopy()`. 
</Note>

### `TypedMap`

`Jt.cache()` actually returns a `TypedMap`.   
`TypedMap` overloads `Map<String, Object>`, adding casting methods for primitive types:
```
get --> getString, getInt, getLong, getBoolean, getDouble
computeIfAbsent --> computeIfAbsentString, computeIfAbsentInt, computeIfAbsentLong, computeIfAbsentBoolean, computeIfAbsentDouble
compute --> computeInt, computeLong, ...
computeIfPresent --> ...
...
```
Caching and retrieving primitive values is simpler with these methods!
{/*TODO CYRIL ADD LINK TO JAVADOC */}

## Session State

Session State provides a `Map` where you can save information that is preserved between script reruns. 
**Each session gets their own isolated Session State**.   
Use `Jt.sessionState()` to store and retrieve values. For example, `Jt.sessionState().get("my_key")`.  
Same as for the Cache, the `Map` returned is a [TypedMap](#typedmap).  
Remember that widgets handle their statefulness all by themselves, so you won't always need to use Session State!

### What is a session?

A session is a single instance of viewing an app. If you view an app from two different tabs in your browser, each tab will have its own session. So each viewer of an app will have a Session State tied to their specific view. Jeamlit maintains this session as the user interacts with the app. If the user refreshes their browser page or reloads the URL to the app, their Session State resets and they begin again with a new session.

### Examples of using Session State

Here's a simple app that counts the number of times the page has been run. Every time you click the button, the script will rerun.

```java
import io.jeamlit.core.Jt;

public class TestApp {

    public static void main(String[] args) {
        Jt.sessionState().putIfAbsent("counter", 0);

        Jt.sessionState().computeInt("counter", (k, v) -> v + 1);

        Jt.text("This page has run %s times.".formatted(Jt.sessionState().getInt("counter"))).use();
        Jt.button("Run it again").use();
    }
}
```

- **First run:** The first time the app runs for each user, Session State is empty. Therefore, a key-value pair is created (`"counter":0`). As the method continues, the counter is immediately incremented (`"counter":1`) and the result is displayed: "This page has run 1 times." When the page has fully rendered, the script has finished and the Jeamlit server waits for the user to do something. When that user clicks the button, a rerun begins.

- **Second run:** Since "counter" is already a key in Session State, it is not reinitialized. As the script continues, the counter is incremented (`"counter":2`) and the result is displayed: "This page has run 2 times."

There are a few common scenarios where Session State is helpful. As demonstrated above, Session State is used when you have a progressive process that you want to build upon from one rerun to the next. Session State can also be used to prevent recalculation, similar to caching. However, the differences are important:

- Cached values are accessible to all users across all sessions.
- Values in session state are only available in the single session where it was saved.

If you are pulling the same data for all users, you'd likely put the value in the Cache. On the other hand, if you pull data specific to a user, such as querying their personal information, you may want to save that in Session State. That way, the queried data is only available in that one session.

As mentioned in [Basic concepts](/get-started/fundamentals/main-concepts#widgets), widgets work in a similar way as Session State, but widgets states are handled automatically. 
As an advanced feature however, you can read their values from the Components State `Map` with `Jt.componentsState()`. 
After you finish understanding the basics of Jeamlit, check out our guide on [Widget behavior](/develop/concepts/architecture/widget-behavior) to dig in the details if you're interested.


{/* TODO 
## Connections

As hinted above, you can use `@st.cache_resource` to cache connections. This is the most general solution which allows you to use almost any connection from any Python library. However, Jeamlit also offers a convenient way to handle some of the most popular connections, like SQL! `st.connection` takes care of the caching for you so you can enjoy fewer lines of code. Getting data from your database can be as easy as:

```python
import streamlit as st

conn = st.connection("my_database")
df = conn.query("select * from my_table")
st.dataframe(df)
```

Of course, you may be wondering where your username and password go. Jeamlit has a convenient mechanism for [Secrets management](/develop/concepts/connections/secrets-management). For now, let's just see how `st.connection` works very nicely with secrets. In your local project directory, you can save a `.streamlit/secrets.toml` file. You save your secrets in the toml file and `st.connection` just uses them! For example, if you have an app file `streamlit_app.py` your project directory may look like this:

```bash
your-LOCAL-repository/
├── .streamlit/
│   └── secrets.toml # Make sure to gitignore this!
└── streamlit_app.py
```

For the above SQL example, your `secrets.toml` file might look like the following:

```toml
[connections.my_database]
    type="sql"
    dialect="mysql"
    username="xxx"
    password="xxx"
    host="example.com" # IP or URL
    port=3306 # Port number
    database="mydb" # Database name
```

Since you don't want to commit your `secrets.toml` file to your repository, you'll need to learn how your host handles secrets when you're ready to publish your app. Each host platform may have a different way for you to pass your secrets. If you use Jeamlit Community Cloud for example, each deployed app has a settings menu where you can load your secrets. After you've written an app and are ready to deploy, you can read all about how to [Deploy your app](/deploy/streamlit-community-cloud/deploy-your-app) on Community Cloud.

*/}
