
# Firebase Personal Task Manager App — Submission

### 👤 User-Specific Tasks List (React + Firebase)
A simple user-authenticated Todo List Web App built using React and Firebase (Auth + Realtime Database). Each user's tasks are securely stored and updated in real-time. The app also features a beautiful pink-themed responsive UI, checkbox-based completion tracking, and smooth login/logout functionality.

###  Features:
1. Login/Signup (using Firebase Auth)
2. Add, delete, mark done 
3. Todos saved in Firebase Realtime Database
4. Every user has their own todos
5. Works on mobile and laptop (responsive)
6.User Signup & Login (via Firebase Auth)
7.Realtime Database Integration
8.Add / Delete Todos (from UI and Firebase)
9.Mark tasks as Completed (checkbox)
10.Responsive Design for mobile and desktop
11.Styled with soft pink gradients and shadows
12.Secure Firebase rules

### Tech Stack
Frontend: React, HTML, CSS, JavaScript
Backend: Firebase (Realtime Database + Auth)
Deployment-ready: Can be hosted on Firebase

### Project Structure
src/
│
├── App.js                # Main application logic
├── firebase.js           # Firebase config and initialization
│
├── MyComponents/
│   ├── Header.js         # Navigation bar
│   ├── Footer.js         # Footer
│   ├── Todos.js          # Renders all todos
│   ├── TodoItem.js       # Renders individual todo item (with checkbox)
│   ├── AddTodo.js        # Form to add todos
│   └── About.js          # About page
│   └── login.js          # Login form component
│
├── App.css               # All global styles and responsiveness
└── index.js              # ReactDOM entry point


### Firebase Setup Guide
1.Go to Firebase Console
2.Create a new project → Enable Authentication (Email/Password)
3.Enable Realtime Database
4.Copy your Firebase config from Project → Project Settings → SDK setup
5.Paste it into firebase.js
6.import { initializeApp } from "firebase/app";
  import { getDatabase } from "firebase/database";
  import { getAuth } from "firebase/auth";

  const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  databaseURL: "YOUR_DB_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
  };
  const app = initializeApp(firebaseConfig);
  export const db = getDatabase(app);
  export const auth = getAuth(app);

### Installation
npm install
npm start

### Core Functionalities
1.Retrieve All Tasks	onValue(ref)	On login, fetch all tasks under user's UID
2.Create New Task	set(ref)	Add task to users/UID/todos/ with isCompleted: false
3.Update Task Status	set(ref)	Toggle isCompleted on checkbox change
4.Responsive Design
5.Fully mobile compatible
6.Media queries added for widths < 400px
7.Uses flex, centered containers, button scaling, shadowed boxes

### 📦 How to Run This Project
1.Install Dependencies 
   `npm install`

2.Configure Firebase
   - Go to `firebase.js` and add your Firebase credentials.

3.Start the App  
   `npm start`  
   App will run at `http://localhost:3000`


### Author
This project was created as part of an E-Cell task for selection. I'm a beginner in web development and this is my first full project using React + Firebase!


### Future Improvements
1.Enable deletion of todos from Firebase
2.Add timestamp to tasks
3.Add user profile section
4.Use Firestore for more flexibility

###  License

This project is open-source and free to use under the MIT License.










### already provided on downloading :

Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
