# Package-Parser
Express/React package parser. Reads, parses and displays data in HTML environment.

Pre-assignment for Reaktor's Summer Junior Developer position.

## Introduction
Application consists of front- and backend.

Front is powered by React, and it communicated with backend API with POST and GET requests.
POST is used to choose file that is sent to the client and GET request fetches the data which is then being rendered by React.</br>

Backend uses Node.js/Express. It contains GET and POST as earlier declared. 
GET path: Runs function that takes file path as variable, reads the file and parses it using RegExr. Returns array that is being turned into JSON object, when sent to client.</br>
POST path: Uses multer to upload data to ./public directory and changes file path variable to that file. 

## Setup

### Requirements:
  1) Node.js
  2) Git
  </br>
  
### Steps:
  1) git clone https://github.com/akkilp/Package-Parser.git
  2) cd .../Package-Parser/backend
  3) npm run init-install (Script for installing dependencies for front- & backend)
  4) npm run dev (concurrently starts server & client side)

## Folder Structure
<pre>
Package-Parser
|
|--backend
|  |-- public      --> Entry point for launching the server
|  |-- server   --> Routes that API can be communicated with ( GET(READ), POST(CREATE), PATCH(UPDATE), PATCH(UPDATE/RESET) )
|  |-- tools --> Functionality for manipulating the data  
|
|--client --> Created with create-react-app, 
|  |--public
|  |--src
|     |--index.cs --> Non-specific component CSS
|     |--App.js   --> Entry point for frontend
|     |--components
|        |--depends-component      --> Depends-component and css
|        |--desc-component         --> Description-component and css
|        |--package-component      --> Right side of the page, includes depends, description and reverse dependencies components
|        |--package-list-component --> Left side of the page that shows list of packages
|        |--revdep-component       --> Reverse depends-component and css
|        |--upload-component       --> Upload component, that is used to upload files
</pre>

## To improve in the future:
1) Refactor code in backend: routes in one file, functions in another
2) Refactor code in frontend: clearer if -functions when rendering components, more readable find -method usage
3) Learn typescript
4) Improve CSS documentation, make it more structured (learn Bootstrap/MaterialDesign)
5) Learn React hooks instead of component classes
