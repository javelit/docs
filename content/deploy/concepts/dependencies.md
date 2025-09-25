---
title: Managing dependencies when deploying your app
slug: /deploy/concepts/dependencies
---

# Managing dependencies when deploying your app

All Jeamlit apps have at least two dependencies: Java and Jeamlit. 
Your app may have additional dependencies in the form of Java libraries (JARs) that must be available on the classpath 
to properly execute your program.

There are two main solutions to run Jeamlit: as an **embedded server** in an existing app, or as a **standalone server**. 

Make sure to look at the **Standalone** mode behavior: even if you plan to use the **embedded server** for production,
you can use the **standalone server** when developing to benefit from the hot-reload feature.

## Embedded Server
Jeamlit can be launched as an embedded server in an existing project with the following code:

```java
void startJeamlitServer() {
    // the Jeamlit app class
    class MyApp {
        public static void main(String[] args) {
            Jt.text("Hello World").use();
        }
    }
    
    // prepare a Jeamlit server
    var server = Server.builder(MyApp.class, 8888).build();
    
    // start the server - this is non-blocking
    server.start();
}
```

When launched as an embedded server, Jeamlit uses the current Java runtime classpath.
This typically includes the Jeamlit JAR itself and any libraries already loaded by the JVM.
Include Jeamlit as a dependency in your project to integrate it with your existing build toolchain:

**Maven (`pom.xml`):**
```xml
<dependency>
    <groupId>io.jeamlit</groupId>
    <artifactId>jeamlit</artifactId>
    <version>${jeamlit.version}</version>
</dependency>
```

**Gradle (`build.gradle`):**
```gradle
implementation 'io.jeamlit:jeamlit:${jeamlit.version}'
```

Find the latest version at: https://central.sonatype.com/artifact/io.jeamlit/jeamlit/overview

## Standalone mode

{/* 

TODO CYRIL MOVE THIS TO INTRO
The standalone mode, based on the fat-JAR (`jeamlit-*-all.jar`), includes all Jeamlit dependencies. It is ideal for:
- Quick experimentation and prototyping
- Single-file applications
- Environments where dependency management is challenging
- Educational purposes and tutorials

You can quickly download and run a Jeamlit app with: 

```bash
# Download the standalone JAR (replace 0.19.0 with latest version)
wget https://repo1.maven.org/maven2/io/jeamlit/jeamlit/0.19.0/jeamlit-0.19.0-all.jar

# Run your app
java -jar jeamlit-0.19.0-all.jar run MyDataApp.java
```

*/}

In standalone mode, Jeamlit automatically detects and resolves dependencies through multiple mechanisms:

### 1. Provided Classpath
You can explicitly provide additional JAR files or directories via command-line arguments. 

```bash
java -jar jeamlit-0.19.0-all.jar run MyApp.java -cp "/path/to/libs/*:/path/to/classes"
```

The classpath provided via command-line arguments is combined with the other classpaths found below.

### 2. Build System Classpath
Jeamlit automatically detects if your app is part of a Maven or Gradle project and includes all dependencies from your build configuration:

- **Maven**: Detects `pom.xml` and uses the runtime classpath
- **Gradle**: Detects `build.gradle` and uses the runtime classpath

This makes it easy to use Jeamlit in an existing project and get access to all classes defined or imported by the project, 
without integrating Jeamlit in the build.

To make it easy to start the Jeamlit server in **maven** (`pom.xml`), add a profile:
```xml
<profiles>
    <profile>
        <id>jeamlit</id>
        <dependencies>
            <dependency>
                <groupId>io.jeamlit</groupId>
                <artifactId>jeamlit</artifactId>
                <version>${jeamlit.version}</version>
            </dependency>
        </dependencies>
        <build>
            <plugins>
                <plugin>
                    <groupId>org.codehaus.mojo</groupId>
                    <artifactId>exec-maven-plugin</artifactId>
                    <version>3.5.1</version>
                    <configuration>
                        <mainClass>tech.catheu.jeamlit.cli.Cli</mainClass>
                        <arguments>
                            <argument>run</argument>
                            <!-- path to your main app file -->
                            <argument>src/main/java/path/to/your/App.java</argument>
                            <!-- other arguments -->
                            <argument>--port</argument>
                            <argument>8090</argument>
                        </arguments>
                    </configuration>
                </plugin>
            </plugins>
        </build>
    </profile>
</profiles>
```

Then run
```bash
mvn exec:java -Pjeamlit
```


### 3. JBang-style Dependencies
In standalone mode with the fat-JAR (`jeamlit-*-all.jar`), 
you can declare dependencies directly in your Java file using JBang-style comments:

```java
///usr/bin/env jbang "$0" "$@" ; exit $?

//DEPS org.apache.commons:commons-math3:3.6.1
//DEPS com.fasterxml.jackson.core:jackson-core:2.15.2

import tech.catheu.jeamlit.core.Jt;
import org.apache.commons.math3.stat.descriptive.DescriptiveStatistics;

public class MyDataApp {
    public static void main(String[] args) {
        // Your app code here
        Jt.write("Hello, Jeamlit!").use();
    }
}
```

Dependencies are automatically downloaded and added to the classpath at runtime.   
For more information about JBang dependency syntax, see the [JBang dependencies documentation](https://www.jbang.dev/documentation/jbang/latest/dependencies.html).  
In IntelliJ, install the Jbang plugin for proper support: https://plugins.jetbrains.com/plugin/18257-jbang.
