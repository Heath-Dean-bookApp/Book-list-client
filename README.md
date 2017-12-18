# Tims book application

**Author**: Heath and Dean
**Version**: 1.10.2

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for a Code Fellows 301 class. (i.e. What's your problem domain?) --> a basic app that holds books from a offsite DB which we are getting from our own API. We also get books from the Google books API.

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? --> you need to create a DB called books on SQL. once that is done start psql, then nodemon, and then do live-server to Launch the front end. you will also need the google books API to make the calls to google.

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->
we are using FS, postgress, nodemon, handlebars, Jquery, express, and superAgent.  

## Change Log
<!-- Use this are to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with GET and POST routes for the book resource.

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->

12-17-2017 4:39pm - application is working with our own API and can get books from the google API. However, the detail view of the google books is not working but we are getting the data back from it. we need to work on the code to get things fully working.
