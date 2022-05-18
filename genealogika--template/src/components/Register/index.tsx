import styles from "./styles.module.scss";
import logo from "../../assets/Genealogika_logo.png";
import Button from "react-bootstrap/button";
import { api } from "../../services/api";
import { useState, FormEvent } from "react";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  async function handleRegister(event: FormEvent) {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return;
    }
    if (password !== passwordConfirmation) {
      alert("Passwords don't match");
    }

    await api.post("register", { name, email, password });
  }

  return (
    <div className={styles.background}>
      <div className={styles.formdiv}>
        <img src={logo} alt="Genealogika" />
        <div>
          <form
            action="http://localhost:3000/"
            onSubmit={handleRegister}
            className={styles.container}
          >
            <div className={styles.label}>
              Name
              <br />
              <input
                type="text"
                id="name"
                name="name"
                onChange={(event) => setName(event.target.value)}
                value={name}
              />
            </div>
            <br />
            <div className={[styles.label, styles.passwordlabel].join(" ")}>
              Email
              <br />
              <input
                type="text"
                id="email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
            </div>
            <br></br>
            <div className={[styles.label, styles.passwordlabel].join(" ")}>
              Password
              <br />
              <input
                type="password"
                id="password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />
            </div>
            <br></br>
            <div className={[styles.label, styles.passwordlabel].join(" ")}>
              Password Confirmation
              <br />
              <input
                type="password"
                id="passwordConfirmation"
                name="password"
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
                value={passwordConfirmation}
              />
            </div>
            <div className={styles.buttonGroup}>
              <Button
                type="submit"
                variant="success"
                className={styles.buttonsubmit}
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
