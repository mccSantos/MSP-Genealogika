import { useState } from "react";
import logo from "./assets/Screenshot_1.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

export function App() {
  return (
    <Router>
      <div className={styles.container}>
        <main className={styles.contentWrapper}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
