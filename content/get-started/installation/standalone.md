---
title: Install and run Jeamlit standalone
slug: /get-started/installation/standalone
---

<Note>
Prefer to read code directly? Take a look at the [corresponding example project](https://github.com/jeamlit/jeamlit-example-standalone-vanilla) on GitHub.
</Note>


# Jeamlit Standalone

This is the simplest and most bare-boned install method for Jeamlit.
This method is best for simple apps, education, testing, and JBang-like projects.

This page will walk you through installing Jeamlit and creating a simple "Hello world" app. We'll show you two installation methods: using JBang (recommended) or downloading the JAR directly. At the end, you'll build a simple interactive app with a click counter and run it.

## Prerequisites

As with any programming tool, in order to install Jeamlit you first need to make sure your
computer is properly set up. More specifically, you'll need:

1. **Java JDK >= 21**

   Download and install a Java JDK (we recommend [Eclipse Adoptium](https://adoptium.net/)).

   You can verify your Java installation by running:
   ```bash
   java --version
   ```

2. **JBang (recommended)**

    [JBang](https://www.jbang.dev/) makes it easy to install Jeamlit as a CLI.  
    Install JBang following the [official installation instructions](https://www.jbang.dev/download/).  
    
3. **Jbang plugin (recommended)**  
    Jeamlit uses the same dependency import feature as Jbang. 
    Install the JBang plugin in your IDE for better code completion and highlighting: 
    - IntelliJ IDEA: [JBang plugin](https://plugins.jetbrains.com/plugin/18257-jbang)
    - VS Code: [JBang extension](https://marketplace.visualstudio.com/items?itemName=jbangdev.jbang-vscode)

## Install Jeamlit

You have two options to install Jeamlit:

### Option 1: Using JBang (recommended)

1. Open a terminal and install Jeamlit:

   ```bash
   # Install Jeamlit with JBang
   jbang app install jeamlit@jeamlit
   ```

2. Verify the installation by running:

   ```bash
   jeamlit --version
   ```

### Option 2: Download JAR directly

1. Open a terminal and download the Jeamlit JAR:

   ```bash
   # Download Jeamlit JAR
   curl -L -o jeamlit.jar https://repo1.maven.org/maven2/io/jeamlit/jeamlit/${JEAMLIT_VERSION}/jeamlit-${JEAMLIT_VERSION}-all.jar
   ```

2. Verify the installation by running:

   ```bash
   java -jar jeamlit.jar --version
   ```

## Create a "Hello World" app and run it

1. Create a file named `App.java` in your project folder:

```java
/// usr/bin/env jbang "$0" "$@" ; exit $?

// import a dependency with JBang-like imports (optional)
//DEPS org.apache.commons:commons-math3:3.6.1

// NOTE: this Jeamlit import is only here to help the IntelliJ JBang plugin - it is not strictly necessary
//DEPS io.jeamlit:jeamlit:0.23.0

import io.jeamlit.core.Jt;
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

2. Run your Jeamlit app:

   **If you installed with JBang:**
   ```bash
   jeamlit run App.java
   ```

   **If you downloaded the JAR:**
   ```bash
   java -jar jeamlit.jar run App.java
   ```

5. Your Jeamlit app should appear in a new tab in your web browser! Try clicking the button to see the counter increment.

6. To stop the Jeamlit server, press `Ctrl+C` in the terminal.

## Development tips

- **Hot reload**: Edit the `App.java` file and save it. The app will reload automatically in your browser.
- **Dependencies**: You can add JBang-style dependencies with `//DEPS` comments at the top of your file.
- **IDE support**: Install the JBang plugin for your IDE to get proper syntax highlighting and code completion.

## What's next?

Read about our [Basic concepts](/get-started/fundamentals/main-concepts) to understand Jeamlit's dataflow model.
