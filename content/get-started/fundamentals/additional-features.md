---
title: Additional Javelit features
slug: /get-started/fundamentals/additional-features
---

# Additional Javelit features

So you've read all about Javelit's [Basic concepts](/get-started/fundamentals/main-concepts) and gotten a taste of caching and Session State in [Advanced concepts](/get-started/fundamentals/advanced-concepts). But what about the bells and whistles? Here's a quick look at some extra features to take your app to the next level.

{/* theming not implemented yet

## Theming

Javelit supports Light and Dark themes out of the box. Javelit will first
check if the user viewing an app has a Light or Dark mode preference set by
their operating system and browser. If so, then that preference will be used.
Otherwise, the Light theme is applied by default.

You can also change the active theme from "⋮" → "Settings".

![Changing Themes](/images/change_theme.gif)

Want to add your own theme to an app? The "Settings" menu has a theme editor
accessible by clicking on "Edit active theme". You can use this editor to try
out different colors and see your app update live.

![Editing Themes](/images/edit_theme.gif)

When you're happy with your work, themes can be saved by
[setting config options](/develop/concepts/configuration)
in the `[theme]` config section. After you've defined a theme for your app, it
will appear as "Custom Theme" in the theme selector and will be applied by
default instead of the included Light and Dark themes.

More information about the options available when defining a theme can be found
in the [theme option documentation](/develop/concepts/configuration/theming).

<Note>

The theme editor menu is available only in local development. If you've deployed your app using
Javelit Community Cloud, the "Edit active theme" button will no longer be displayed in the "Settings"
menu.

</Note>

<Tip>

Another way to experiment with different theme colors is to turn on the "Run on save" option, edit
your config.toml file, and watch as your app reruns with the new theme colors applied.

</Tip>

*/}

## Pages

As apps grow large, it becomes useful to organize them into multiple pages. 
This makes the app easier to manage as a developer and easier to navigate as a user. Javelit provides a 
powerful way to create multipage apps using [`Jt.page`](/develop/api-reference/navigation/jt.page) and [`Jt.navigation`](/develop/api-reference/navigation/jt.navigation). 
Just create your pages and connect them with navigation as follows:

1. Create an entry point class (or method in _embedded_ mode) that defines and connects your pages
2. Create separate Java methods for each page's content. They are passed as Java `Runnable`.
3. Use [`Jt.page`](/develop/api-reference/navigation/jt.page) to define your pages and [`Jt.navigation`](/develop/api-reference/navigation/jt.navigation) to connect them

Here's an example of a three-page app:

<details open>
<summary><code>App.java</code></summary>

```java
import io.javelit.core.Jt;
import io.javelit.core.Page;
import java.util.List;

public class App {

    public static void main(String[] args) {
        // register the pages
        var currentPage = Jt.navigation(Jt.page("/main", () -> home()).title("Home").icon("🎈"),
                                        Jt.page("/page2", () -> page2()).title("Page 2").icon("❄️"),
                                        Jt.page("/page3", () -> page3()).title("Page 3").icon("🎉")).use();
        // run the current page
        currentPage.run();
    }

    public static void home() {
        Jt.title("Main Page 🎈").use();
        Jt.markdown("Welcome to the main page!").use();
    }

    public static void page2() {
        Jt.title("Page 2 ❄️").use();
        Jt.text("This is the second page").use();
    }

    public static void page3() {
        Jt.title("Page 3 🎉").use();
        Jt.markdown("This is the **third** page!").use();
    }
}
```

</details>

Now run `javelit run App.java` and view your shiny new multipage app! The navigation menu will automatically appear, allowing users to switch between pages.

<Image src="/images/mpa-v2-main-concepts.gif" />

Our documentation on [Multipage apps](/develop/concepts/multipage-apps) teaches you how to add pages to your app, including how to define pages, structure and run multipage apps, and navigate between pages. Once you understand the basics, [create your first multipage app](/get-started/tutorials/create-a-multipage-app)!

## Custom components

If you can't find the right component within the Javelit library, you can build your own 
with Javelit's [components API](/develop/concepts/custom-components/intro). If you think a component should be part of the official Javelit library, 
[reach out on the forum](https://github.com/javelit/javelit/discussions).

{/*
try out custom components to extend Javelit's built-in functionality. Explore and browse through popular, community-created components 
in the [Components gallery](https://streamlit.io/components).
*/}

## Static file serving

As you learned in Javelit fundamentals, Javelit runs a server that clients connect to. That means viewers of your app 
don't have direct access to the files which are local to your app. 
Most of the time, this doesn't matter because Javelit commands handle that for you. 
When you use `Jt.image(<path-to-image>)` your Javelit server will access the file and handle the necessary 
hosting so your app viewers can see it. However, if you want a direct URL to an image or file you'll need to 
host it. 

In **Standalone** mode, this requires creating a directory named `static` next to your app class.
For example, your project could look like:

```bash
your-project/
├── static/
│   └── my_hosted-image.png
└── YourApp.java
```

In **Embedded** mode, this requires creating a directory named `static` in your `resources` folder.
For example, your maven project could look like:
```bash
your-project/
├── static/
│   └── my_hosted-image.png
├── src/
│   └── main
│       └── java
│           └── YourApp.java
│       └── resources
│           └── static
│               └── my_hosted-image.png
└── pom.xml
```


To learn more, read our guide on [Static file serving](/develop/concepts/configuration/serving-static-files).

## App testing

Good development hygiene includes testing your code. Automated testing allows you to write higher quality code, 
faster! Javelit has a built-in testing utilities. Learn more in our guide to [App testing](http://localhost:3000/develop/concepts/app-testing).
{/*
framework that let's you build tests easily. Use your favorite testing framework to run your tests. We like [`pytest`](https://pypi.org/project/pytest/). When you test a Javelit app, you simulate running the app, declare user input, and inspect the results. You can use GitHub workflows to automate your tests and get instant alerts about breaking changes. Learn more in our guide to [App testing](/develop/concepts/app-testing).
*/}
