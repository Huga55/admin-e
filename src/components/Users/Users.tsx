import React from "react";
import c from "./Users.module.css";
import User from "./User/User";

type PropsType = any

const Users: React.FC<PropsType> = (props) => {
    return(
        <div className={c.users}>
            <div className={c.users__title + " title"}>
                Список всех пользователей
            </div>
            <div className={c.users__content}>
                <User />
            </div>
        </div>
    );
}

export default Users;