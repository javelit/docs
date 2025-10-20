---
title: Managing dependencies when deploying your app
slug: /deploy/concepts/dependencies
---

# Managing dependencies when deploying your app

All Javelit apps have at least two dependencies: Java and Javelit.   
Your app may have additional dependencies in the form of Java libraries (JARs) that must be available on the classpath 
to properly execute your program.  
There are two main solutions to run Javelit: as an **embedded server** in an existing app, or as a **standalone server**.
The classpath resolution mechanism depends on the solution.

## Embedded Server
Javelit can be launched as an embedded server in an existing project with the following code:

```java
void startJavelitServer() {
    // the Javelit app class
    class MyApp {
        public static void main(String[] args) {
            Jt.text("Hello World").use();
        }
    }
    
    // prepare a Javelit server
    var server = Server.builder(MyApp.class, 8888).build();
    
    // start the server - this is non-blocking
    server.start();
}
```

*Read the [embedded installation documentation](/get-started/installation/embedded-vanilla) for more on how to install Javelit in a Maven/Gradle project.*


When launched as an embedded server, Javelit uses the current Java runtime classpath.
This typically includes the Javelit JAR itself and any libraries already loaded by the JVM.
Include any dependency you need as you would usually do in your build too, it will be available to the Javelit app.

## Standalone mode
Javelit can be launched as a standalone app server with the following: 

```
javelit run App.java 
```

*Read the [standalone installation documentation](/get-started/installation#standalone-cli-and-app-runner) for more on how to install the Javelit CLI.*

In standalone mode, there are 2 ways to add dependencies to the Javelit app:

1. **Command-line argument**  
    You can explicitly provide additional JAR files or directories via command-line argument. 

    ```bash
    java -jar javelit-${JEAMLIT_VERSION}-all.jar run MyApp.java -cp "/path/to/libs/*:/path/to/classes"
    ```

2. **JBang-style Dependencies**   
   In standalone mode, you can declare dependencies directly in your Java file using JBang-style comments:

    ```java
    ///usr/bin/env jbang "$0" "$@" ; exit $?
    
    //DEPS org.apache.commons:commons-math3:3.6.1
    //DEPS com.fasterxml.jackson.core:jackson-core:2.15.2
    
    import tech.catheu.javelit.core.Jt;
    import org.apache.commons.math3.stat.descriptive.DescriptiveStatistics;
    
    public class MyDataApp {
        public static void main(String[] args) {
            // Your app code here
            Jt.write("Hello, Javelit!").use();
        }
    }
    ```

    Dependencies are automatically downloaded and added to the classpath at runtime.   
    For more information about JBang dependency syntax, see the [JBang dependencies documentation](https://www.jbang.dev/documentation/jbang/latest/dependencies.html).  
    Install the JBang plugin for proper code completion and highlighting in your IDE: [IntelliJ](https://plugins.jetbrains.com/plugin/18257-jbang), [VS Code](https://marketplace.visualstudio.com/items?itemName=jbangdev.jbang-vscode).

The two methods can be combined. 
