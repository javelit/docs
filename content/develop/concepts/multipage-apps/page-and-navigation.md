---
title: Define multipage apps with Jt.page and Jt.navigation
slug: /develop/concepts/multipage-apps/page-and-navigation
description: Understand the method for defining multipage apps
---

# Define multipage apps with `Jt.page` and `Jt.navigation`

This page assumes you understand the [Page terminology](/develop/concepts/multipage-apps/overview#page-terminology) presented in the overview.

## App structure

When using `Jt.navigation`, your entrypoint file acts like a page router. Each page is an app executed from your 
entrypoint file. You can define a page from a Java class {/* TODO IMPLEMENT CALLABLE or function */}. If you include 
elements or widgets in your entrypoint file, they become common elements between your pages. In this case, you can 
think of your entrypoint file like a picture frame around each of your pages.

You can only call `Jt.navigation` once per app run and you must call it from your entrypoint file. When a user selects 
a page in navigation (or is routed through a command like `Jt.switchPage`), `Jt.navigation` returns the selected page. 
You must manually execute that page with the `.run()` method. The following example is a two-page app where each page 
is defined by a Java class.

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
import io.javelit.core.JtPage;

public class App {
    public static void main(String[] args) {
        JtPage currentPage = Jt.navigation(
                Jt.page(Page1.class), Jt.page(Page2.class)).use();
    }
}
```

## Defining pages

`Jt.page` lets you define a page builder. The first and only required argument defines your page class {/* TODO multipage callable which can be a Python file or function */}. 
Pass the page builders to `Jt.navigation` to register them as pages in your app.

If you don't define your page title or URL pathname, Javelit will infer them from the Class name name as described in 
the multipage apps [Overview](/develop/concepts/multipage-apps/overview#automatic-page-labels-and-urls). 
However, `Jt.page` lets you configure them manually. See [Jt.page API reference](/develop/api-reference/navigation/jt.page). 

{/* 
The following example uses `st.set_page_config` to set a page title and favicon consistently across pages. Each page will have its own label and icon in the navigation menu, but the browser tab will show a consistent title and favicon on all pages.

**Directory structure:**

```
your-repository/
├── create.py
├── delete.py
└── streamlit_app.py
```

**`streamlit_app.py`:**

```python
import streamlit as st

create_page = st.Page("create.py", title="Create entry", icon=":material/add_circle:")
delete_page = st.Page("delete.py", title="Delete entry", icon=":material/delete:")

pg = st.navigation([create_page, delete_page])
st.set_page_config(page_title="Data manager", page_icon=":material/edit:")
pg.run()
```

<div style={{ maxWidth: '564px', margin: 'auto' }}>
<Image src="/images/mpa-v2-use-set-page-config.jpg" frame />
</div>

*/}

## Customizing navigation

You can display your navigation menu in the sidebar or along the top of your app using the `position` parameter in `Jt.navigation`. 
If you want to group your pages into sections, `Jt.navigation` lets you insert headers in the sidebar navigation or 
drop-down groups in the top navigation. Alternatively, you can disable the default navigation widget and build a 
custom navigation menu with `Jt.pageLink`.

Additionally, you can dynamically change which pages you pass to `Jt.navigation`. However, only the page 
returned by `Jt.navigation` accepts the `.run()` method. If a user enters a URL with a pathname, and that pathname is 
not associated to a page in `Jt.navigation`, Javelit will return a "Page not found" page.

### Adding section headers

The simplest way to customize your navigation menu is to organize the pages within `Jt.navigation`. You can sort or group 
pages, as well as remove any pages you don't want the user to access. This is a convenient way to handle user permissions. 
However, you can't hide a page in navigation while keeping it accessible through a direct URL. If you need to hide a page 
while keeping it accessible, you'll need to hide the default navigation menu and build a navigation menu with commands like `Jt.pageLink`.

The following example creates a login wall. When a user starts a new session, they are not logged in. 
In this case, the only available page is the login page. If a user tries to access another page by URL, it will create 
a new session and Javelit will not recognize the page. The user will be diverted to the login page. However, 
after a user logs in, they will see a navigation menu with different pages and be directed to the dashboard as the app's default page (i.e. homepage).

**`App.java`:**

```java
import io.javelit.core.Jt;

public class App {

    public static void main(String[] args) {
        boolean loggedIn = Jt.sessionState().computeIfAbsentBoolean("logged_in", k -> false);

        if (!loggedIn) {
            var currentPage = Jt.navigation(Jt.page(LoginPage.class)).hidden().use();
            currentPage.run();
        } else {
            var currentPage = Jt.navigation(Jt.page(DashboardPage.class).home(), Jt.page(LogoutPage.class)).use();
            currentPage.run();
        }
    }

    public class LoginPage {
        public static void main(String[] args) {
            if (Jt.button("Log in").use()) {
                Jt.sessionState().put("logged_in", Boolean.TRUE);
                Jt.rerun(true);
            }
        }
    }

    public class LogoutPage {
        public static void main(String[] args) {
            if (Jt.button("Log out").use()) {
                Jt.sessionState().put("logged_in", Boolean.FALSE);
                Jt.rerun(true);
            }
        }
    }

    public class DashboardPage {
        public static void main(String[] args) {
            Jt.title("The dashboards").use();
            Jt.text("This dashboard page is only available if the user is logged in.").use();
            Jt.markdown("*the dashboard is not implemented, this is for example purpose*").use();
        }
    }
}
```

*Note: in a real project, the `LoginPage`, `LogoutPage` and `DashboardPage` classes would be written to dedicated files 
and imported by the entrypoint `App` class.*

You can try this app with:
```
javelit run https://raw.githubusercontent.com/javelit/javelit/refs/heads/main/examples/login/App.java
```

{/* TODO implement sections   

<div style={{ maxWidth: '564px', margin: 'auto' }}>
<Image src="/images/mpa-v2-page-sections.jpg" frame />
</div>

*/}

### Dynamically changing the available pages

You can change what pages are available to a user by updating the list of pages in `Jt.navigation`. This is a convenient 
way to handle role-based or user-based access to certain pages. 

{/* TODO tutorial 
For more information, check out our tutorial, [Create a dynamic navigation menu](/develop/tutorials/multipage/dynamic-navigation).
*/}

### Building a custom navigation menu

If you want more control over your navigation menu, you can hide the default navigation and build your own. 
You can hide the default navigation by chaining `hidden()"` to your `Jt.navigation()` call. 
If you want a page to be available to a user without showing it in the navigation menu, you must use this method. 
A user can't be routed to a page if the page isn't included in `Jt.navigation`. This applies to navigation by URL as 
well as commands like `Jt.switchPage` and `Jt.pageLink`.
