import { Outlet, NavLink, Link } from "react-router-dom";

import github from "../../assets/github.svg";
import cfia from "../../assets/sigcol_1653520512539_fra.png";
import styles from "./Layout.module.css";

const Layout = () => {
    return (
        <div className={styles.layout}>
            <header className={styles.header} role={"banner"}>
                <div className={styles.headerContainer}>
                    <Link to="/" className={styles.headerTitleContainer}>
                        <h3 className={styles.headerTitle}>Louis, l'assistant virtuel de l'ACIA</h3>
                    </Link>
                    <nav>
                        <ul className={styles.headerNavList}>
                            {/* <li>
                                <NavLink to="/" className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}>
                                    Chat
                                </NavLink>
                            </li>
                            <li className={styles.headerNavLeftMargin}>
                                <NavLink to="/qa" className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}>
                                    Ask a question
                                </NavLink>
                            </li> */}
                            <li className={styles.headerNavLeftMargin}>
                                <a href="https://inspection.canada.ca/" target={"_blank"} title="ACIA | CFIA">
                                    <img
                                        src={cfia}
                                        alt="CFIA logo"
                                        aria-label="Link to CFIA | Lien à l'ACIA"
                                        className={styles.githubLogo}
                                    />
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <h4 className={styles.headerRightText}>Louis, CFIA's Virtual Assistant</h4>
                </div>
            </header>

            <Outlet />
        </div>
    );
};

export default Layout;
