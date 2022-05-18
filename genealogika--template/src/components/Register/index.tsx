import styles from "./styles.module.scss";
import logo from "../../assets/Genealogika_logo.png";
import Button from "react-bootstrap/button";

export function Register() {
  return (
    <div className={styles.background}>
      <div className={styles.formdiv}>
        <img src={logo} alt="Genealogika" />
        <div>
          <form className={styles.container}>
            <div className={styles.label}>
              Name
              <br />
              <input type="text" id="name" name="name" />
            </div>
            <br />
            <div className={[styles.label, styles.passwordlabel].join(" ")}>
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
            <br></br>
            <div className={[styles.label, styles.passwordlabel].join(" ")}>
              Password Confirmation
              <br />
              <input
                type="password"
                id="passwordConfirmation"
                name="password"
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
