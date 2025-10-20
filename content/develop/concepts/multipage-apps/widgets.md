---
title: Working with widgets in multipage apps
slug: /develop/concepts/multipage-apps/widgets
description: Understand how widgets interact with pages
---

# Working with widgets in multipage apps

When you create a widget in a Javelit app, Javelit generates a widget ID and uses it to make your widget stateful. 
As your app reruns with user interaction, Javelit keeps track of the widget's value by associating its value to its ID. 
In particular, a widget's ID depends on the page where it's created. 

This guide explains three strategies to deal with the behavior if you'd like to have a widget remain stateful across 
all pages. If you don't want a widget to appear on all pages, but you do want it to remain stateful when you navigate away 
from its page (and then back), Options 2 and 3 can be used. For detailed information about these strategies, 
see [Understanding widget behavior](/develop/concepts/architecture/widget-behavior).

## Option 1: Execute your widget command in your entrypoint file

When you define your multipage app with `Jt.page` and `Jt.navigation`, your entrypoint file becomes a frame of common 
elements around your pages. When you execute a widget command in your entrypoint file, Javelit associates the widget 
to your entrypoint file instead of a particular page. Since your entrypoint file is executed in every app rerun, any 
widget in your entrypoint file will remain stateful as your users switch between pages.

The following example includes a slider in the sidebar that is rendered and stateful on all pages. 
The slider widget has an assigned key so you can access its value through Components State within a page.

**Directory structure:**

```
your-repository/
├── Page1.java
├── Page2.java
└── App.java
```

**`App.java`:**

```java
import io.javelit.core.Jt;

public class App {
    public static void main() {
        var currentPage = Jt.navigation(Jt.page(Page1.class), Jt.page(Page2.class)).use();
        
        Jt.slider("Size").key("size").use(Jt.SIDEBAR);
        
        currentPage.run();
    }
}
```

## Option 2: Give a key to your widget

If you want to navigate away from a widget and return to it while keeping its value, 
simply give the widget a key with `.key()`.

Get more details about this method in the [Widget Behavior guide](/develop/concepts/architecture/widget-behavior#widgets-do-not-persist-if-not-rendered-except-if-provided-a-key)
and in the [Session State and Components State advanced concepts](/develop/concepts/architecture/session-state#session-state-and-components-state-association) 

Here is an example:
```
javelit run https://raw.githubusercontent.com/javelit/javelit/refs/heads/main/examples/WidgetPersistenceMultiPage.java
```
