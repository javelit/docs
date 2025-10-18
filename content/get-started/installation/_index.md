---
title: Install Jeamlit
slug: /get-started/installation
---

# Install Jeamlit

There are 2 main ways to install and run Jeamlit:
- as a [standalone CLI and app runner](#standalone-cli-and-app-runner)
- [embedded in an existing Java project](#embedded-server)

Read the [details](#details) to get more information about each option.

## Short Version

Jeamlit requires A Java JDK >= `21`.

### Standalone CLI and app runner
1. Install: ([JBang](https://www.jbang.dev/) is highly recommended)
    ```bash
    # recommended: install with jbang
    jbang app install jeamlit@jeamlit
   
    # vanilla
    curl -L -o jeamlit.jar https://repo1.maven.org/maven2/io/jeamlit/jeamlit/${JEAMLIT_VERSION}/jeamlit-${JEAMLIT_VERSION}-all.jar
    ```

2. Validate the installation by running the Hello app:
   ```bash
   # jbang
   jeamlit hello 
   
   # vanilla
   java -jar jeamlit.jar hello
   ```
4. Jump to our [Basic concepts](/get-started/fundamentals/main-concepts).

### Embedded server
1. Add the dependency to your project
   ```xml
   <dependency>
     <groupId>io.jeamlit</groupId>
     <artifactId>jeamlit</artifactId>
     <version>${JEAMLIT_VERSION}</version>
   </dependency>
   ```
2. Launch the server in your project:
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


## Details

<TileContainer layout="list">

<RefCard href="/get-started/installation/standalone" size="half">

<h5>Option 1: Standalone </h5>

Best for getting started, simple apps, education, testing, documentation and demos.  
JBang-style dependency import included.

</RefCard>

<RefCard href="/get-started/installation/embedded-vanilla" size="half">

<h5>Option 2: Embedded in a Maven/Gradle project</h5>

Best for complex apps, existing systems and production systems.

</RefCard>

<RefCard href="/get-started/installation/embedded-spring" size="half">

<h5>Option 3: Embedded in a Spring project</h5>

Best for ... integrating Jeamlit in a Spring project. 

</RefCard>

</TileContainer>
