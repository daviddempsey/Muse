# Muse 
This instruction list hinges on the fact that you've installed Firebase CLI, Firebase Tools, etc.

## Installation Instructions
From the base Muse directory, cd into the api directory and install packages
```
cd api
npm install
```
If you haven't logged into Firebase, do it:
```
firebase login
```
Then, initialize your Firebase project: 
```
firebase init
```
- choose the Functions option only
- then choose existing Firebase project and choose 'muse-ee76'
- choose JavaScript as the language
- choose 'Y' for ESLint to catch bugs and enforce style
- choose 'Y' for installing dependencies with npm
Then, install express and cors if you haven't
```
npm install express
npm install cors
```
Change directory into functions and install modules
```
cd functions
npm install
```
Then, start try to start the server
```
npm run serve
```
To edit and add your endpoints, open the index.js file in the functions folder!

Note: since we are currently doing local host, you have to be in the functions folder to run

## Any issues? 
message me (Kenny)
