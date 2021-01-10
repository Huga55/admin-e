import React from "react";
import c from "./Sidebar.module.css";
import logo from "../../assets/img/sidebar/logo.svg";
import {NavLink} from "react-router-dom";

const Sidebar = () => {
    return(
        <div className={c.sidebar}>
            <div className={c.sidebar__logo}>
                <NavLink to="/" className={c["sidebar__logo-link"]}>
                    <img src={logo} alt="" className={c["sidebar__logo-img"]}/>
                </NavLink>
            </div>
            <ul className={c.sidebar__list}>
                <li className={c.sidebar__elem}>
                    <NavLink to="/users" className={c.sidebar__link} activeClassName={c.sidebar__link_active}>
                        Все пользователи
                    </NavLink>
                </li>
                <li className={c.sidebar__elem}>
                    <NavLink to="/orders" className={c.sidebar__link} activeClassName={c.sidebar__link_active}>
                        Все заказы
                    </NavLink>
                </li>
                <li className={c.sidebar__elem}>
                    <NavLink to="/page" className={c.sidebar__link} activeClassName={c.sidebar__link_active}>
                        Типовая страница
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;