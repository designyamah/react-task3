import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import UserForm from "./components/UserForm";
import Navbar from "./components/Navbar";
import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:id" element={<UserDetail />} />
              <Route path="/add-user" element={<UserForm />} />
              <Route path="/edit-user/:id" element={<UserForm />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
