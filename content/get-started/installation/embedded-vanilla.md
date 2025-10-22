---
title: Embed Javelit in a Maven/Gradle project
slug: /get-started/installation/embedded-vanilla
---

<Note>
Prefer to read code directly? Take a look at the [corresponding example project](https://github.com/javelit/javelit-example-embedded-maven) on GitHub.
</Note>


# Javelit Embedded

This method embeds Javelit as a dependency in your existing Maven or Gradle project.
This method is best for complex apps, existing systems, and production deployments.

This page will walk you through adding Javelit to your Maven or Gradle project, creating a simple interactive app, and launching an embedded server. You'll build the same click counter app but with full control over the server lifecycle.

## Prerequisites

As with any Java project, you'll need:

1. **Java JDK >= 21**

   Download and install a Java JDK (we recommend [Eclipse Adoptium](https://adoptium.net/)).

   You can verify your Java installation by running:
   ```bash
   java --version
   ```

2. **Maven or Gradle**

   - Maven: Download from [maven.apache.org](https://maven.apache.org/download.cgi) or use the Maven wrapper (`mvnw`) included in most projects
   - Gradle: Download from [gradle.org](https://gradle.org/install/) or use the Gradle wrapper (`gradlew`)

3. **An IDE (recommended)**

   We recommend [IntelliJ IDEA](https://www.jetbrains.com/idea/) for the best hot-reload experience with Javelit.

## Setup

### With Maven

1. Add the Javelit dependency to your `pom.xml`:

   ```xml
   <dependencies>
    <dependency>
        <groupId>io.javelit</groupId>
        <artifactId>javelit</artifactId>
        <version>${JEAMLIT_VERSION}</version>
    </dependency>

    <!-- Optional: Add any other dependencies your app needs -->
    <dependency>
        <groupId>org.apache.commons</groupId>
        <artifactId>commons-math3</artifactId>
        <version>3.6.1</version>
    </dependency>

    <!-- Recommended: Add a logging implementation if you don't have one already -->
    <dependency>
        <groupId>ch.qos.logback</groupId>
        <artifactId>logback-classic</artifactId>
        <version>1.5.18</version>
    </dependency>
    </dependencies>
   ```

2. Make sure your `pom.xml` specifies Java 21:

   ```xml
   <properties>
       <maven.compiler.source>21</maven.compiler.source>
       <maven.compiler.target>21</maven.compiler.target>
       <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
   </properties>
   ```

### With Gradle

1. Add the Javelit dependency to your `build.gradle`:

   ```gradle
   dependencies {
    implementation 'io.javelit:javelit:${JEAMLIT_VERSION}'
    // Optional: Add any other dependencies your app needs
    implementation 'org.apache.commons:commons-math3:3.6.1'

    // Recommended: Add a logging implementation
    implementation 'ch.qos.logback:logback-classic:1.5.18'
   }
   ```

2. Make sure your `build.gradle` specifies Java >= 21:

   ```gradle
   java {
       toolchain {
           languageVersion = JavaLanguageVersion.of(21)
       }
   }
   ```

## Create your Javelit app

1. Create `src/main/java/Main.java`:
```java
import io.javelit.core.Jt;
import io.javelit.core.Server;
import org.apache.commons.math3.stat.descriptive.DescriptiveStatistics;

public class Launcher {

    public static void main(String[] args) {
        final var server = Server.builder(() -> app(), 8080).build();
        server.start();
    }

    // the javelit app
    public static void app() {
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

## Build and run

### With Maven

1. Build your project:
   ```bash
   ./mvnw clean install
   ```

2. Run the Javelit server:
   ```bash
   ./mvnw compile exec:java -Dexec.mainClass="Main"
   ```
3. Open your browser at http://localhost:8080 to see your app!

4. To stop the server, press `Ctrl+C` in the terminal.


### With Gradle

1. Build your project:
   ```bash
   ./gradlew build
   ```

2. Run the Javelit server:
   ```bash
   ./gradlew run --main-class=Main
   ```

3. Open your browser at [http://localhost:8080](http://localhost:8080) to see your app!

4. To stop the server, press `Ctrl+C` in the terminal.

## Development with hot-reload

### IntelliJ IDEA Setup

1. Open your project in IntelliJ IDEA
2. Run `Main.java` in **Debug mode** (not Run mode)
3. Open your browser at [http://localhost:8080](http://localhost:8080)
4. Edit the `app` method. For example add this code:
   ```java
   Jt.markdown("**OMG THE HOT-RELOAD IS REAL**").use();
   ```
5. When you see the "Code Change" modal in IntelliJ, click it to hot-reload
   <Image src="/images/get-started/intellij_hot_reload.png" clean />
6. Refresh the page in your browser to see the changes!


## What's next?
Read about our [Basic concepts](/get-started/fundamentals/main-concepts) to understand Javelit's dataflow model

