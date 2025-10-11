---
title: Using forms
slug: /develop/concepts/architecture/forms
---

# Using forms

When you don't want to rerun your script with each input made by a user, [`Jt.form`](/develop/api-reference/execution-flow/jt.form) is here to help! Forms make it easy to batch user input into a single rerun. This guide to using forms provides examples and explains how users interact with forms.

## Principle

If a widget is not in a form, that widget will trigger a script rerun whenever a user changes its value. For widgets with keyed input (`st.number_input`, `st.text_input`, `st.text_area`), a new value triggers a rerun when the user clicks or tabs out of the widget. A user can also submit a change by pressing `Enter` while their cursor is active in the widget.

On the other hand if a widget is inside of a form, the script will not rerun when a user clicks or tabs out of that 
widget. For widgets inside a form, the script will rerun when the form is submitted and all widgets within the form will 
send their updated values to the Java backend.

![Forms](/images/forms.gif)

<Tip>
Run the example above with:
```bash
jeamlit run https://raw.githubusercontent.com/jeamlit/jeamlit/refs/heads/main/examples/form/FormExample.java
```
</Tip>

{/* TODO create gif for jeamlit - avoir reusing streamlit example */}

{/*

A user can submit a form using **Enter** on their keyboard if their cursor active in a widget that accepts keyed input. 
Within `st.number_input` and `st.text_input` a user presses **Enter** to submit the form. Within `st.text_area` a user 
presses `Ctrl+Enter`/`⌘+Enter` to submit the form.

![Keyboard-submit forms](/images/form-submit-keyboard.png)

*/}

## Widget values

Before a form is submitted, all widgets within that form will have default values, just like widgets outside of a form have default values.

```java 
var formContainer = Jt.form().use();
double myNumber = Jt.slider("pick a value").value(10).use(formContainer);
Jt.formSubmitButton("Submit form").use(formContainer);

// this is outside the form
Jt.text(myNumber).use();
// at first run will display the default value
// 10
```

{/* todo implement cloud
<Cloud name="doc-forms-default" height="450px"/>

*/}

## Forms are containers

When `Jt.form` is called, a container is created on the frontend. You can write to that container like you do with 
other [container elements](/develop/api-reference/layout). That is, you call `.use(containerForm)`. Additionally, you can place 
`Jt.formSubmitButton` anywhere in the form container.

```java
var formContainer = Jt.form().use();

// This is writing directly to the main container (.use()) Since the form container is
// defined above, this will appear below everything in the form
Jt.text("this text will appear last!").use();

// These components are used in the form container, so they appear inside the form.
// the submit button appears before the slider
boolean formSubmitted = Jt.formSubmitButton("Send value").use(formContainer);
double value = Jt.slider("Pick a value").use(formContainer);
if (formSubmitted) {
  Jt.text("Value sent: " + ).use()    
}
```

{/* TODO CYRIL CLOUDIFY

<Cloud name="doc-forms-container" height="375px"/>

*/}

## Data flow

The purpose of a form is to override the default behavior of Jeamlit which reruns a script as soon as the user makes a change. For widgets outside of a form, the logical flow is:

1. The user changes a widget's value on the frontend.
2. The widget's value in `Jt.sessionState` and in the Java backend (server) is updated.
3. The script rerun begins.
4. If the widget has a callback, it is executed as a prefix to the page rerun.
5. When the updated widget's function is executed during the rerun, it outputs the new value.

For widgets inside a form, any changes made by a user (step 1) do not get passed to the Java backend (step 2) until 
the form is submitted. Furthermore, the only widget inside a form that can have a callback function is 
the `Jt.formSubmitButton`. 

{/* TODO CYRIL form doc cloud would help

## Processing form submissions

If you need to execute a process using newly submitted values, you have three major patterns for doing so.

### Execute the process after the form

If you need to execute a one-time process as a result of a form submission, you can condition that process on the `st.form_submit_button` and execute it after the form. If you need results from your process to display above the form, you can use containers to control where the form displays relative to your output.

```python
import streamlit as st

col1,col2 = st.columns([1,2])
col1.title('Sum:')

with st.form('addition'):
    a = st.number_input('a')
    b = st.number_input('b')
    submit = st.form_submit_button('add')

if submit:
    col2.title(f'{a+b:.2f}')
```

<Cloud name="doc-forms-process1" height="400px"/>

### Use a callback with session state

You can use a callback to execute a process as a prefix to the script rerunning.

<Important>

When processing newly updated values within a callback, do not pass those values to the callback directly through the `args` or `kwargs` parameters. You need to assign a key to any widget whose value you use within the callback. If you look up the value of that widget from `st.session_state` within the body of the callback, you will be able to access the newly submitted value. See the example below.

</Important>

```python
import streamlit as st

if 'sum' not in st.session_state:
    st.session_state.sum = ''

def sum():
    result = st.session_state.a + st.session_state.b
    st.session_state.sum = result

col1,col2 = st.columns(2)
col1.title('Sum:')
if isinstance(st.session_state.sum, float):
    col2.title(f'{st.session_state.sum:.2f}')

with st.form('addition'):
    st.number_input('a', key = 'a')
    st.number_input('b', key = 'b')
    st.form_submit_button('add', on_click=sum)
```

<Cloud name="doc-forms-process2" height="400px"/>

### Use `st.rerun`

If your process affects content above your form, another alternative is using an extra rerun. This can be less resource-efficient though, and may be less desirable that the above options.

```python
import streamlit as st

if 'sum' not in st.session_state:
    st.session_state.sum = ''

col1,col2 = st.columns(2)
col1.title('Sum:')
if isinstance(st.session_state.sum, float):
    col2.title(f'{st.session_state.sum:.2f}')

with st.form('addition'):
    a = st.number_input('a')
    b = st.number_input('b')
    submit = st.form_submit_button('add')

# The value of st.session_state.sum is updated at the end of the script rerun,
# so the displayed value at the top in col2 does not show the new sum. Trigger
# a second rerun when the form is submitted to update the value above.
st.session_state.sum = a + b
if submit:
    st.rerun()
```

<Cloud name="doc-forms-process3" height="400px"/>


*/}

## Limitations

- Every form must contain a `Jt.formSubmitButton`.
- `Jt.button` and `Jt.download_button` cannot be added to a form.
- `Jt.form` cannot be embedded inside another `Jt.form`.
- Callback functions can only be assigned to `Jt.formSubmitButton` within a form; no other widgets in a form can have a callback.
- Interdependent widgets within a form are unlikely to be particularly useful. If you pass `widget1`'s value 
  into `widget2` when they are both inside a form, then `widget2` will only update when the form is submitted.
