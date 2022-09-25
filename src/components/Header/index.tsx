import styles from "./styles.module.css";
import rocketLogo from "./../../assets/rocket-logo.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={rocketLogo} />
      <div>
        <span className={styles.blue}>to</span>
        <span className={styles.purple}>do</span>
      </div>
    </header>
  );
}
