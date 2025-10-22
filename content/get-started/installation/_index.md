---
title: Install Javelit
slug: /get-started/installation
---

# Install Javelit

There are 2 main ways to install and run Javelit:
- as a [standalone CLI and app runner](#standalone-cli-and-app-runner)
- [embedded in an existing Java project](#embedded-server)

Read the [details](#details) to get more information about each option.

## Short Version

Javelit requires A Java JDK >= `21`.

### Standalone CLI and app runner
1. Install: ([JBang](https://www.jbang.dev/) is highly recommended)
    ```bash
    # recommended: install with jbang
    jbang app install javelit@javelit
   
    # vanilla
    curl -L -o javelit.jar https://repo1.maven.org/maven2/io/javelit/javelit/${JEAMLIT_VERSION}/javelit-${JEAMLIT_VERSION}-all.jar
    ```

2. Validate the installation by running the Hello app:
   ```bash
   # jbang
   javelit hello 
   
   # vanilla
   java -jar javelit.jar hello
   ```
4. Jump to our [Basic concepts](/get-started/fundamentals/main-concepts).

### Embedded server
1. Add the dependency to your project
   ```xml
   <dependency>
     <groupId>io.javelit</groupId>
     <artifactId>javelit</artifactId>
     <version>${JEAMLIT_VERSION}</version>
   </dependency>
   ```
2. Launch the server in your project:
   ```java
   // the javelit app
   void app() {
      Jt.text("Hello World").use();
   }
   
   void startJavelitServer() {
     // prepare a Javelit server
     var server = Server.builder(() -> app(), 8888).build();
    
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

Best for ... integrating Javelit in a Spring project. 

</RefCard>

</TileContainer>
