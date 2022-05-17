import styles from "./styles.module.scss";
import logo from "../../assets/Genealogika_logo.png";
import Button from "react-bootstrap/button";

export function Login() {
  return (
    <div className={styles.background}>
      <div className={styles.formdiv}>
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
            <div className={styles.buttonGroup}>
              <Button
                style={{ float: "left", paddingLeft: "0px" }}
                type="submit"
                variant="link"
                className={styles.buttonsubmit}
              >
                Forgot your password?
              </Button>

              <Button
                type="submit"
                variant="success"
                className={styles.buttonsubmit}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
