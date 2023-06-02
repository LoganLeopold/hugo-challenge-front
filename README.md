# Create React App

This base of this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) for context.

A git clone of this repo > cd into the project folder > and an npm install should do it for running locally. BUT, an environment variable is needed. Setup below.

## Environment

When I was being audacious at the outset of this project and thinking I'd have time to set it up, I did instantiate an .env file establishing the local dev API. Steps to set this up:

1. Create a .env file in the root of the project.

2. Drop REACT_APP_LOCAL_API_BASE_URL='http://127.0.0.1:3001' into the file and save it. This is where the backend runs locally by default.

3. You need to run npm start again to use the variable.

## Available Scripts 

### `npm start`

Still the main script I used - only ran this locally. 

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.