import React from 'react';

export const About = () => {
  return (
    <div className="about-container">
      <h2>About this Personal TaskManager App</h2>
      <p>
        This is a simple Personal TaskManager App built with <strong>React</strong> and <strong>Firebase</strong>.
        It helps you stay to organized!
      </p>

      <h4>Features:</h4>
      <ul>
        <li>Add and delete tasks</li>
        <li>Mark tasks as complete/incomplete</li>
        <li>Firebase Authentication</li>
        <li>User-specific tasks</li>
        <li>Responsive on all devices</li>
      </ul>

      <h4>Tech Used:</h4>
      <ul>
        <li>React.js</li>
        <li>Firebase Authentication & Realtime Database</li>
      </ul>

      <p className="footer">Made by Ekta Dubey </p>
    </div>
  );
};
