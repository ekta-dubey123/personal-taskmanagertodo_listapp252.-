import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          alert("Logged in");
          onLogin(userCredential.user);
        })
        .catch((error) => alert(error.message));
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          alert("Signup successful");
          onLogin(userCredential.user);
        })
        .catch((error) => alert(error.message));
    }
  };

  return (
    <div className="container my-3">
      <h3>{isLoginMode ? "Login" : "Signup"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="form-control my-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control my-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          {isLoginMode ? "Login" : "Signup"}
        </button>
        <p className="my-2">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="btn btn-link"
            onClick={() => setIsLoginMode(!isLoginMode)}
          >
            {isLoginMode ? "Signup here" : "Login here"}
          </button>
        </p>
      </form>
    </div>
  );
};
