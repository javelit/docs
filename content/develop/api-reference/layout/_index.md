---
title: Layouts and Containers
slug: /develop/api-reference/layout
---

# Layouts and Containers

## Complex layouts

Jeamlit provides several options for controlling how different elements are laid out on the screen.

<TileContainer>
<RefCard href="/develop/api-reference/layout/jt.columns">

<Image pure alt="screenshot" src="/images/api/columns.jpg" />

<h4>Columns</h4>

Insert containers laid out as side-by-side columns.

```java
var cols = Jt.columns("my-cols", 2).use();
Jt.text("This is column 1").use(cols.col(0));
Jt.text("This is column 2").use(cols.col(1));
```

</RefCard>
<RefCard href="/develop/api-reference/layout/jt.container">

<Image pure alt="screenshot" src="/images/api/container.jpg" />

<h4>Container</h4>

Insert a multi-element container.

```java
var c = Jt.container("my-container").use();
Jt.text("This will show last").use();
Jt.text("This will show first").use(c);
Jt.text("This will show second").use(c);
```

</RefCard>

{/*
<RefCard href="/develop/api-reference/execution-flow/st.dialog">

<Image pure alt="screenshot" src="/images/api/dialog.jpg" />

<h4>Modal dialog</h4>

Insert a modal dialog that can rerun independently from the rest of the script.

```java
@st.dialog("Sign up")
def email_form():
    name = st.text_input("Name")
    email = st.text_input("Email")
```

</RefCard>
*/}

<RefCard href="/develop/api-reference/layout/jt.empty">

<Image pure alt="screenshot" src="/images/api/empty.jpg" />

<h4>Empty</h4>

Insert a single-element container.

```java
var e = Jt.empty("my-empty").use();
Jt.text("This will show last").use();
Jt.text("This will be replaced").use(e);
Jt.text("This will show first").use(e);
```

</RefCard>
<RefCard href="/develop/api-reference/layout/jt.expander">

<Image pure alt="screenshot" src="/images/api/expander.jpg" />

<h4>Expander</h4>

Insert a multi-element container that can be expanded/collapsed.

```java
var exp = Jt.expander("my-exp", "Open to see more").use();
Jt.text("This is more content").use(exp);
```

</RefCard>
<RefCard href="/develop/api-reference/layout/jt.popover">

<Image pure alt="screenshot" src="/images/api/popover.svg" />

<h4>Popover</h4>

Insert a multi-element popover container that can be opened/closed.

```java
var pop = Jt.popover("my-pop", "Settings").use();
Jt.checkbox("Show completed").use(pop);
```

</RefCard>

{/*
<RefCard href="/develop/api-reference/layout/st.sidebar">

<Image pure alt="screenshot" src="/images/api/sidebar.jpg" />

<h4>Sidebar</h4>

Display items in a sidebar.

```java
st.sidebar.write("This lives in the sidebar")
st.sidebar.button("Click me!")
```

</RefCard>
*/}

<RefCard href="/develop/api-reference/layout/jt.tabs">

<Image pure alt="screenshot" src="/images/api/tabs.jpg" />

<h4>Tabs</h4>

Insert containers separated into tabs.

```java
var tabs = Jt.tabs("my-tabs", List.of("Tab 1", "Tab 2")).use();
Jt.text("This is tab 1").use(tabs.tab(0));
Jt.text("This is tab 2").use(tabs.tab(1));
```

</RefCard>
</TileContainer>

{/*
<ComponentSlider>

<ComponentCard href="https://github.com/okld/streamlit-elements">

<Image pure alt="screenshot" src="/images/api/components/elements.jpg" />

<h4>Streamlit Elements</h4>

Create a draggable and resizable dashboard in Streamlit. Created by [@okls](https://github.com/okls).

```python
from streamlit_elements import elements, mui, html

with elements("new_element"):
  mui.Typography("Hello world")
```

</ComponentCard>

<ComponentCard href="https://github.com/lukasmasuch/streamlit-pydantic">

<Image pure alt="screenshot" src="/images/api/components/pydantic.jpg" />

<h4>Pydantic</h4>

Auto-generate Streamlit UI from Pydantic Models and Dataclasses. Created by [@lukasmasuch](https://github.com/lukasmasuch).

```python
import streamlit_pydantic as sp

sp.pydantic_form(key="my_form",
  model=ExampleModel)
```

</ComponentCard>

<ComponentCard href="https://github.com/blackary/st_pages">

<Image pure alt="screenshot" src="/images/api/components/pages.jpg" />

<h4>Streamlit Pages</h4>

An experimental version of Streamlit Multi-Page Apps. Created by [@blackary](https://github.com/blackary).

```python
from st_pages import Page, show_pages, add_page_title

show_pages([ Page("streamlit_app.py", "Home", "🏠"),
  Page("other_pages/page2.py", "Page 2", ":books:"), ])
```

</ComponentCard>

</ComponentSlider>
*/}
