import styles from "../../styles/Baby.module.css";
import {Footer as Base} from "rsuite";

export default function Footer() {
  return (
    <Base>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <img src="/savan-baby-w.svg" alt="Savan Baby W Logo" className={styles.logo} />
      </a>
    </Base>
  )
}