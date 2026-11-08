import type { ReactNode } from "react";
import { Link, NavLink, type LinkProps } from "react-router";
import styles from "./Navbar.module.css";

interface Props extends LinkProps {
  children: ReactNode;
}

export default function Navbar() {
  return (
    <div className={styles.center}>
      <nav className={styles.Navbar}>
        <Link to="/" className={styles.siteTitle}>
          ugdeveli.com
        </Link>
        <ul className={styles.navList}>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/contact">Contact</NavItem>
        </ul>
      </nav>
    </div>
  );
}

function NavItem({ to, children, ...props }: Props) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }: { isActive: boolean }) =>
          `${styles.navLink} ${isActive ? styles.active : ""}`
        }
        {...props}
      >
        {children}
      </NavLink>
    </li>
  );
}
