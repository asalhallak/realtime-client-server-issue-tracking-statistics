# Realtime Client/Server Issue Tracking Statistics
The objective of this project is to design and implement a Client/Server application that simulates the creation and completion of user-stories and tasks, showing real-time statistics.

## Requirements
#### Node v18
#### Docker

## Technologies Used
React
NestJS
MongoDB
WebSocket

## The flow of this application is as follows:

The client sends the createStory event to the server.
The server uses a pool of 'workers' to process the 'Tasks' of the incoming stories.
The server saves the information about the status of stories on MongoDB.
The client subscribes to the stats event to receive real-time statistics on:
Stories produced per second.
Stories completed per second.
Number of open stories.
Number of completed stories.

## Installation
To run this project, follow these steps:

Run **docker-compose up** to start MongoDB.

Navigate to the server folder and run **npm install**, then **npm run start**.

Navigate to the client folder and run **npm install**, then **npm run start**.



Open http://localhost:3000

The application should now be running.

## Conclusion
This project showcases how WebSocket can be used to create stories and receive real-time statistics from the server.
In a real-world scenario, it may be beneficial to use message brokers to manage the execution of stories.
The installation process outlined above provides a clear and concise way to get the application up and running on your local machine.

