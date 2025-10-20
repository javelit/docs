---
title: Install and run Javelit standalone
slug: /get-started/installation/standalone
---

<Note>
Prefer to read code directly? Take a look at the [corresponding example project](https://github.com/javelit/javelit-example-standalone-vanilla) on GitHub.
</Note>


# Javelit Standalone

This is the simplest and most bare-boned install method for Javelit.
This method is best for simple apps, education, testing, and JBang-like projects.

This page will walk you through installing Javelit and creating a simple "Hello world" app. We'll show you two installation methods: using JBang (recommended) or downloading the JAR directly. At the end, you'll build a simple interactive app with a click counter and run it.

## Prerequisites

As with any programming tool, in order to install Javelit you first need to make sure your
computer is properly set up. More specifically, you'll need:

1. **Java JDK >= 21**

   Download and install a Java JDK (we recommend [Eclipse Adoptium](https://adoptium.net/)).

   You can verify your Java installation by running:
   ```bash
   java --version
   ```

2. **JBang (recommended)**

    [JBang](https://www.jbang.dev/) makes it easy to install Javelit as a CLI.  
    Install JBang following the [official installation instructions](https://www.jbang.dev/download/).  
    
3. **Jbang plugin (recommended)**  
    Javelit uses the same dependency import feature as Jbang. 
    Install the JBang plugin in your IDE for better code completion and highlighting: 
    - IntelliJ IDEA: [JBang plugin](https://plugins.jetbrains.com/plugin/18257-jbang)
    - VS Code: [JBang extension](https://marketplace.visualstudio.com/items?itemName=jbangdev.jbang-vscode)

## Install Javelit

You have two options to install Javelit:

### Option 1: Using JBang (recommended)

1. Open a terminal and install Javelit:

   ```bash
   # Install Javelit with JBang
   jbang app install javelit@javelit
   ```

2. Verify the installation by running:

   ```bash
   javelit --version
   ```

### Option 2: Download JAR directly

1. Open a terminal and download the Javelit JAR:

   ```bash
   # Download Javelit JAR
   curl -L -o javelit.jar https://repo1.maven.org/maven2/io/javelit/javelit/${JEAMLIT_VERSION}/javelit-${JEAMLIT_VERSION}-all.jar
   ```

2. Verify the installation by running:

   ```bash
   java -jar javelit.jar --version
   ```

## Create a "Hello World" app and run it

1. Create a file named `App.java` in your project folder:

```java
/// usr/bin/env jbang "$0" "$@" ; exit $?

// import a dependency with JBang-like imports (optional)
//DEPS org.apache.commons:commons-math3:3.6.1

// NOTE: this Javelit import is only here to help the IntelliJ JBang plugin - it is not strictly necessary
//DEPS io.javelit:javelit:0.23.0

import io.javelit.core.Jt;
import org.apache.commons.math3.stat.descriptive.DescriptiveStatistics;

public class App {

    public static void main(String[] args) {
        Jt.title("Hello World !").use();

        Jt.markdown("## A simple click app").use();

        // initialize state - values in the session state are maintained at each update
        Jt.sessionState().putIfAbsent("count", 0);

        // if button is clicked, increment the count value
        if (Jt.button("Click me").use()) {
            Jt.sessionState().computeIfPresentInt("count", (k, v) -> v + 1);
        }

        // display the count
        int count = Jt.sessionState().getInt("count");
        boolean plural = count > 1;
        Jt.markdown("The button was clicked **%s** time%s".formatted(count, plural ? "s" : ""))
                .use();


        // Use the imported library apache commons-math
        Jt.divider().use();
        Jt.markdown("## Using imported apache math dependency").use();
        double[] values = {1.2, 2.3, 3.4, 4.5, 5.6};
        DescriptiveStatistics stats = new DescriptiveStatistics(values);
        double stdDev = stats.getStandardDeviation();
        Jt.text("Computed statistic with Apache commons-math: " + stdDev).use();
    }
}
```

2. Run your Javelit app:

   **If you installed with JBang:**
   ```bash
   javelit run App.java
   ```

   **If you downloaded the JAR:**
   ```bash
   java -jar javelit.jar run App.java
   ```

5. Your Javelit app should appear in a new tab in your web browser! Try clicking the button to see the counter increment.

6. To stop the Javelit server, press `Ctrl+C` in the terminal.

## Development tips

- **Hot reload**: Edit the `App.java` file and save it. The app will reload automatically in your browser.
- **Dependencies**: You can add JBang-style dependencies with `//DEPS` comments at the top of your file.
- **IDE support**: Install the JBang plugin for your IDE to get proper syntax highlighting and code completion.

## What's next?

Read about our [Basic concepts](/get-started/fundamentals/main-concepts) to understand Javelit's dataflow model.
