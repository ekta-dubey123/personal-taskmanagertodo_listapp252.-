
import "./App.css";
import { db, auth } from "./firebase";
import { ref, set, onValue, remove } from "firebase/database";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { LoginForm } from "./MyComponents/login";
import Header from "./MyComponents/header";
import { Todos } from "./MyComponents/Todos";
import { Footer } from "./MyComponents/Footer";
import { AddTodo } from "./MyComponents/AddTodo";
import { About } from "./MyComponents/about";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        loadUserTodos(u.uid);
      } else {
        setUser(null);
        setTodos([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadUserTodos = (uid) => {
    const userTodosRef = ref(db, `users/${uid}/todos`);
    onValue(userTodosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const todosArray = Object.values(data);
        setTodos(todosArray);
      } else {
        setTodos([]);
      }
    });
  };

const onDelete = (todo) => {
  if (!user) return;
  setTodos(todos.filter((e) => e.sno !== todo.sno));
const todoRef = ref(db, `users/${user.uid}/todos/${todo.sno}`);
  remove(todoRef)
    .then(() => {
      console.log("✅ Todo removed from Firebase");
    })
    .catch((error) => {
      console.error("❌ Error deleting from Firebase:", error.message);
      alert("Task might not exist in Firebase or something went wrong.");
    });
};


  const addTodo = (title, desc) => {
    if (!user) return alert("Please login first!");

    let sno = todos.length === 0 ? 0 : todos[todos.length - 1].sno + 1;
    const myTodo = {
      sno,
      title,
      desc,
      done:false,
    };
    setTodos([...todos, myTodo]);

    const todoRef = ref(db, `users/${user.uid}/todos/${sno}`);
    set(todoRef, myTodo)
      .then(() => console.log("Added to Firebase", myTodo))
      .catch((err) => console.error("Firebase error:", err));
  };

  const toggleDone = (todo) => {
    if (!user) return;
    const updatedTodo = { ...todo, done: !todo.done };
    const todoRef = ref(db, `users/${user.uid}/todos/${todo.sno}`);
    set(todoRef, updatedTodo)
      .then(() => console.log("Updated completion status in Firebase"))
      .catch((err) => console.error("Error updating Firebase", err));
    setTodos(todos.map((t) => (t.sno === todo.sno ? updatedTodo : t)));
  };

  const handleLogout = () => {
    signOut(auth).then(() => alert("Logged out"));
  };

  return (
    <div className="App">
      <Router>
        <Header title="My Personal Task Manager" searchBar={false} />
        {!user ? (
          <LoginForm onLogin={(u) => setUser(u)} />
        ) : (
          <div className="my-3 text-center">
            <p>Welcome, {user.email}</p>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddTodo addTodo={addTodo} />
                <Todos
                  todos={todos}
                  onDelete={onDelete}
                  toggleDone={toggleDone}
                />
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;






