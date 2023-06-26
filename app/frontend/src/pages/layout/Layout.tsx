import { Outlet, NavLink, Link } from "react-router-dom";

import github from "../../assets/github.svg";
import cfia from "../../assets/CFIA_Banner.png";
import styles from "./Layout.module.css";

const Layout = () => {

    function refreshPage(){
        window.location.reload();
    }

    return (
        <div className={styles.layout}>
            <header className={styles.header} role={"banner"}>
                <div className={styles.headerContainer}>
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
                                        style={{height: 40, marginTop: 10, marginRight: 100}}
                                        />
                                </a>
                            </li>
                            <li>
                                <Link to="/" className={styles.headerTitleContainer} onClick={refreshPage}>
                                    <h3 className={styles.headerTitle}>Louis, CFIA's Virtual Assistant</h3>
                                    <h3 className={styles.headerTitle}>| Louis, l'assistant virtuel de l'ACIA</h3>
                                </Link>
                            </li>
                            <li className={styles.headerRightText}>Alpha Version</li>

                        </ul>
                    </nav>

                </div>
            </header>

            <Outlet />
        </div>
    );
};

export default Layout;
