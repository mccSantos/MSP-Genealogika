import styles from "./styles.module.scss";
import logo from "../../assets/Genealogika_logo.png";
import Button from "react-bootstrap/button";

export function Register() {
  return (
    <div>
      <img src={logo} alt="Genealogika" />
      <div>
        <form className={styles.container}>
          <div className={styles.label}>
            Email
            <br />
            <input type="text" id="email" name="email" />
          </div>
          <br></br>
          <div className={[styles.label, styles.passwordlabel].join(" ")}>
            Password
            <br />
            <input type="password" id="password" name="password" />
          </div>
          <Button
            type="submit"
            variant="success"
            className={styles.buttonsubmit}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
