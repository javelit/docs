---
title: Widget behavior
slug: /develop/concepts/architecture/widget-behavior
---

# Understanding widget behavior

Widgets (like `Jt.button`, `Jt.selectbox`, and `Jt.textInput`) are at the heart of Jeamlit apps. They are the 
interactive elements of Jeamlit that pass information from your users into your Java code. Widgets often work how 
you want, but they can have surprising behavior in some situations. Understanding the different parts of 
a widget and the precise order in which events occur helps you achieve your desired results.

This guide covers advanced concepts about widgets. Generally, it begins with simpler concepts and increases in complexity. For most beginning users, these details won't be important to know right away. When you want to dynamically change widgets or preserve widget information between pages, these concepts will be important to understand. We recommend having a basic understanding of [Session State](/develop/api-reference/caching-and-state/st.session_state) before reading this guide.

<Collapse title="🚡 TL;DR" expanded={false}>

1. The actions of one user do not affect the widgets of any other user.
2. A widget `.use()` call makes the widget appear in the app and returns the widget's current value.
3. Widgets return their default values on their first call before a user interacts with them.
4. A widget's identity depends on the arguments passed to the widget function. Changing a widget's label, min or max value, default value, placeholder text, help text, or key will cause it to reset.
5. If you don't call a widget function in an app run, Jeamlit will delete the widget's value, 
   *including its key-value pair in the Components State*, **except if you provide a key to the widget with `.key()`**

The last two points (widget identity and widget deletion) are the most relevant when dynamically changing widgets 
or working with multi-page applications. This is covered in detail later in this guide: [Statefulness of widgets](#statefulness-of-widgets).

</Collapse>

## Anatomy of a widget

There are four parts to keep in mind when using widgets:

1. The frontend component as seen by the user.
2. The backend value or value as seen through `Jt.componentsState`.
3. The key of the widget used to access its value via `Jt.componentsState`.
4. The return value given by the widget's function.

### Widgets are session dependent

Widget states are dependent on a particular session (browser connection). The actions of one user do not affect the widgets of any other user. Furthermore, if a user opens up multiple tabs to access an app, each tab will be a unique session. Changing a widget in one tab will not affect the same widget in another tab.

### Widgets can return any type 

The value of a widget as seen through `Jt.componentsState` and returned by the widget function can be of any type. 
For example, `Jt.button` returns a boolean value, while `Jt.navigation` returns a `JtPage` instance that contains non-serializable values.   
The first time a widget function is called (before a user interacts with it), it will return its default value. 
(e.g. `st.selectbox` returns the first option by default.) Default values are configurable for all widgets with a few 
special exceptions like `Jt.button` and `Jt.fileUploader`.

### Keys help distinguish widgets and access their values

Widget keys serve three purposes:

1. Uniquely identify otherwise identical widgets.
2. Enable access of a widget's value through `Jt.componentsState`.
3. Persist a widget’s value across app reruns, even if the widget isn't called.   

Whenever possible, Jeamlit updates widgets incrementally on the frontend instead of rebuilding them with each rerun. 
This means Jeamlit assigns an ID to each widget from the arguments passed to the widget function. A widget's ID is based 
on the page it is running in (for multipage apps) and its parameters such as label, min or max value, default value, 
placeholder text, help text, and key. If you have two widgets of the same type with the same arguments on 
the same page, you will get a `DuplicateWidgetIDException` error. In this case, assign unique keys to the two widgets.

#### Jeamlit can't understand two identical widgets on the same page

```java
// This will throw a DuplicateWidgetIDException.
Jt.button("OK").use();
Jt.button("OK").use();
```

#### Use keys to distinguish otherwise identical widgets

```java
Jt.button("OK").key("privacy").use();
Jt.button("OK").key("terms").use();
```

## Order of operations

When a user interacts with a widget, the order of logic is:

1. Its value in `Jt.componentsState` is updated.
2. The callback function (if any) is executed.
3. The page reruns with the widget function returning its new value.

If the callback function writes anything to the screen, that content will appear above the rest of the page. 
A callback function runs as a _prefix_ to the script rerunning. Consequently, that means anything written via a 
callback function will disappear as soon as the user performs their next action. Other widgets should generally not 
be created within a callback function.

<Note>

Callback functions provide as argument the widget's previous value.
If you want to use a widget's new value in its own callback function, assign a key to the widget and 
call `Jt.componentState().get("<theKey>")`.
</Note>

{/* TODO clarify form behavior for this tricky case 
### Using callback functions with forms

Using a callback function with a form requires consideration of this order of operations.

```python
import streamlit as st

if "attendance" not in st.session_state:
    st.session_state.attendance = set()


def take_attendance():
    if st.session_state.name in st.session_state.attendance:
        st.info(f"{st.session_state.name} has already been counted.")
    else:
        st.session_state.attendance.add(st.session_state.name)


with st.form(key="my_form"):
    st.text_input("Name", key="name")
    st.form_submit_button("I'm here!", on_click=take_attendance)
```

<Cloud name="doc-guide-widgets-form-callbacks" height="250px"/>

*/}

## Statefulness of widgets

As long as the defining parameters of a widget remain the same and that widget is continuously rendered on the frontend, then it will be stateful and remember user input.

### Changing parameters of a widget will reset it

If any of the defining parameters of a widget change, Jeamlit will see it as a new widget and it will reset. The use of manually assigned keys and default values is particularly important in this case. _Note that callback functions, callback args and kwargs, label visibility, and disabling a widget do not affect a widget's identity._

In this example, we have a slider whose min value is changed with a number picker. Try interacting with each slider 
to change its value then change the min setting to see what happens.

```java
int minimum = Jt.numberInput("mini", Integer.class).minValue(0).maxValue(10).use();
int slider1 = Jt.slider("no key").min(minimum).use().intValue();
int slider2 = Jt.slider("with key").key("key1").min(minimum).use().intValue();
```

Run the example with:
```bash
jeamlit run https://raw.githubusercontent.com/jeamlit/jeamlit/refs/heads/main/examples/WidgetIdentity.java
```

{/*
<Cloud name="doc-guide-widgets-change-parameters" height="550px"/>
*/}

#### Explanations

As soon as the min value is changed, the sliders reset. The 
changing of the min value makes them "new" widgets from Jeamlit's perspective, so they are recreated from 
scratch when the app reruns with the changed parameters. Since no default value is defined, each widget defaults to 
the min value (the sliders would reset to another specific default value if one was provided). This is the same with 
or without a key since the sliders are seen as a new widgets either way. There is a subtle point to understand 
about pre-existing keys connecting to widgets. This will be explained further down in [Widget life cycle](#widget-life-cycle).

A solution to [Retain statefulness when changing a widget's parameters](#retain-statefulness-when-changing-a-widgets-parameters) is provided further on.

### Widgets do not persist if not rendered except if provided a key

If a widget's function is not called during an app run: Jeamlit will delete the widget's value (including its 
key-value pair in the Components State) except if you provide a key to the widget with `.key()`. Even temporarily 
hiding a widget will cause it to reset when it reappears if no key is provided.  
If you have a widget with a key but don't want its value to be persisted when the widget is not called, use `noPersist()`.
Learn more about this behavior and the multipage case in the advanced concepts of [Session and Components State](/develop/concepts/architecture/session-state#session-state-and-components-state-association).

## Widget life cycle

When a widget function is called, Jeamlit will check if it already has a widget with the same parameters. Jeamlit will reconnect if it thinks the widget already exists. Otherwise, it will make a new one.

As mentioned earlier, Jeamlit determines a widget's ID based on parameters such as label, min or max value, default value, 
placeholder text, help text, and key. The page name also factors into a widget's ID. 

{/* TODO decide how callback should be used as part of the key or not - pretty sure it should not, because it will be regenerated each time 
On the other hand, callback functions, callback args and kwargs, label visibility, and disabling a widget do not affect a widget's identity.
*/}

{/* TODO - not stable for the moment

### Calling a widget function when the widget doesn't already exist

If your script rerun calls a widget function with changed parameters or calls a widget function that wasn't used on the last script run:

1. Jeamlit will build the frontend and backend parts of the widget, using its default value.
2. If the widget has been assigned a key, Jeamlit will check if that key already exists in Session State.  
   a. If it exists and is not currently associated with another widget, Jeamlit will assign that key's value to the widget.
   b. Otherwise, it will assign the default value to the key in `st.session_state` (creating a new key-value pair or overwriting an existing one).
3. If there are args or kwargs for a callback function, they are computed and saved at this point in time.
4. The widget value is then returned by the function.

Step 2 can be tricky. If you have a widget:

```python
st.number_input("Alpha",key="A")
```

and you change it on a page rerun to:

```python
st.number_input("Beta",key="A")
```

Jeamlit will see that as a new widget because of the label change. The key `"A"` will be considered part of the widget labeled `"Alpha"` and will not be attached as-is to the new widget labeled `"Beta"`. Jeamlit will destroy `st.session_state.A` and recreate it with the default value.

If a widget attaches to a pre-existing key when created and is also manually assigned a default value, you will get a warning if there is a disparity. If you want to control a widget's value through `st.session_state`, initialize the widget's value through `st.session_state` and avoid the default value argument to prevent conflict.

### Calling a widget function when the widget already exists

When rerunning a script without changing a widget's parameters:

1. Jeamlit will connect to the existing frontend and backend parts.
2. If the widget has a key that was deleted from `st.session_state`, then Jeamlit will recreate the key using the current frontend value. (e.g Deleting a key will not revert the widget to a default value.)
3. It will return the current value of the widget.

*/}

### Widget clean-up process

When Jeamlit gets to the end of a script run, it will delete the data for any widgets it has in memory that were not 
rendered on the screen. Most importantly, that means Jeamlit will delete all key-value pairs in `st.session_state` associated with a widget not currently on screen.

## Additional examples

### Retain statefulness when changing a widget's parameters

Here is a solution to our earlier example of changing a slider's min values.
To simplify the example, we only work with one slider. 

```java
int minimum = Jt.numberInput("mini", Integer.class).minValue(0).maxValue(10).use();
int slider1Value = Math.max(minimum, Jt.componentsState().getOrDefaultDouble("slider1", 0.).intValue());
int slider1 = Jt.slider("slide it").key("slider1").value(slider1Value).min(minimum).use().intValue();
```

{/*  TODO CLOUD 
<Cloud name="doc-guide-widgets-change-parameters-solution" height="250px"/>
*/}

The idea is the following:  
- add a `.key()` to the slider to make its value accessible in the Components State.
- before rendering the slider, fetch its most recent value using `Jt.componentsState().get...` but ...
- ... caution! the last value may not be compatible with the new minimum constraint. For instance, if the last value is 3 but the new minimum is 5, 3 is not a valid value anymore. If the current value is invalid, fallback to the new minimum instead.
- pass the *safe* last value to the slider  

<Tip>
Changing a widget's configuration can make its current value invalid.  
The right way to handle invalid values depends on both the widget and your business logic.  
That is why Jeamlit resets widgets when their configuration changes. 

If you really need to maintain a widget value when its configuration is changed, it will be up to you to implement 
invalid value resolution. In general, the logic will look like this:
```java
var widgetValue = resolveIfInvalid(newConfig, Jt.componentsState().getOrDefault("widgetKey"))
Jt.yourWidget().someConfig(newConfig).value(widgetValue).key("widgetKey").use()
```
</Tip>

