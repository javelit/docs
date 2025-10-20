---
title: Understanding Javelit's client-server architecture
slug: /develop/concepts/architecture/architecture
---

# Understanding Javelit's client-server architecture

Javelit apps have a client-server structure. The Java backend of your app is the server. The frontend you view 
through a browser is the client. When you develop an app locally, your computer runs both the server and the client. 
If someone views your app across a local or global network, the server and client run on different machines. If you 
intend to share or deploy your app, it's important to understand this client-server structure to avoid common pitfalls.

## Java backend (server)

When you execute the command `javelit run YourApp.java` your computer uses Java to start up a Javelit server. 
This server is the brains of your app and performs the computations for all users who view your app. Whether users view 
your app across a local network or the internet, the Javelit server runs on the one machine where the app was 
initialized with `javelit run`. The machine running your Javelit server is also called a host.

## Browser frontend (client)

When someone views your app through a browser, their device is a Javelit client. When you view your app from the same computer where you are running or developing your app, then server and client are coincidentally running on the same machine. However, when users view your app across a local network or the internet, the client runs on a different machine from the server.

## Server-client impact on app design

Keep in mind the following considerations when building your Javelit app:

- The computer running or hosting your Javelit app is responsible for providing the compute and storage necessary to run your app for all users and must be sized appropriately to handle concurrent users.
- Your app will not have access to a user's files, directories, or OS. Your app can only work with specific files a user has uploaded to your app through a widget like `Jt.fileUploader`.
- If your app communicates with any peripheral devices (like cameras), you must use Javelit commands or custom components that will access those devices _through the user's browser_ and correctly communicate between the client (frontend) and server (backend).
- If your app opens or uses any program or process outside of Java, they will run on the server. For example, you may want to use `webrowser` to open a browser for the user, but this will not work as expected when viewing your app over a network; it will open a browser on the Javelit server, unseen by the user.
- If you use load balancing or replication in your deployment, some Javelit features won't work without session affinity or stickiness. For more information, continue reading.

## WebSockets and session management

While most Javelit app developers don’t need to interact directly with WebSockets, understanding their role is important 
for advanced deployments, custom components, or managing connections at scale.

Javelit’s server is built on the Undertow web server and uses WebSockets to maintain a persistent, two-way communication 
channel between the client and server. This persistent connection allows the server to push real-time updates to the 
client and maintain session context for each user. Each browser tab or window creates its own WebSocket connection, 
resulting in a separate session within your app.

In large-scale or production deployments, load balancing and server replication are common. However, the way Javelit 
handles sessions and local (server) files requires special consideration in these environments. When a client requests 
media (such as an image or audio file) via HTTP, the HTTP request might be routed to a different 
server than the one handling the user’s WebSocket connection and session information. If the media file isn’t available 
on all replicas, you may encounter errors {/*like `MediaFileStorageError: Bad filename`*/}.

### Session affinity or stickiness

In general, you can do one of the following to resolve or reduce this limitation:

- **Enable session affinity (also known as stickiness) in your proxy. This ensures that all requests from a user’s session are handled by the same server instance.**
- Convert media to a Base64 encoded data URI before passing it to a Javelit command. This passes the media data through the WebSocket instead of using Javelit's media storage which is accessed through HTTP requests.
- Save dynamically generated files to a stable location outside of your server replicas (e.g. S3 storage), and pass the external URLs to Javelit commands. This avoids Javelit's media storage. 

Enabling session affinity is a general solution which resolves the limitation for both media files and uploaded files. For configuration details, consult your deployment platform’s documentation.

Using Base64 encoded data URIs or external file storage can straightforwardly resolve the limitation for media files, but are not complete solutions to resolve the limitation for file uploads.

<Note>
For a distributed, Redis-backed, Javelit cluster, please reach out to <a href="mailto:cdecatheu@hey.com">enterprise support</a>.  
A distributed Javelit cluster is not affected by the issues above.
</Note>
