import React from "react";
import c from "./User.module.css";
import {NavLink} from "react-router-dom";

type PropsType = any /*{
    name: string
    phone: string
    address: string
    type: string
    nameOrganization: string
    inn: string
    ogrn: string
}*/

const User: React.FC<PropsType> = (props) => {

    const id = 1;

    return (
        <>
            <div className={c.user__head}>
                <span className={`${c.user__name} ${c.user__block}`}>
                    Имя
                </span>
                <span className={`${c.user__phone} ${c.user__block}`}>
                    Телефон
                </span>
                <span className={`${c.user__address} ${c.user__block}`}>
                    Адрес
                </span>
                <span className={`${c.user__type} ${c.user__block}`}>
                    Физ. / Юр.
                </span>
                <span className={`${c["user__name-organization"]} ${c.user__block}`}>
                    Название организации
                </span>
                <span className={`${c.user__inn} ${c.user__block}`}>
                    ИНН
                </span>
                <span className={`${c.user__ogrn} ${c.user__block}`}>
                    ОГРН
                </span>
            </div>
            <div className={c.user}>
                <div className={c.user__info}>
                <span className={`${c.user__name} ${c.user__block}`}>
                    Name
                </span>
                    <span className={`${c.user__phone} ${c.user__block}`}>
                    8-952-684-56-99
                </span>
                    <span className={`${c.user__address} ${c.user__block}`}>
                    Addres Addres Addres Addres Addres Addres
                </span>
                    <span className={`${c.user__type} ${c.user__block}`}>
                    Физ. / Юр.
                </span>
                    <span className={`${c["user__name-organization"]} ${c.user__block}`}>
                    Name Organization
                </span>
                    <span className={`${c.user__inn} ${c.user__block}`}>
                    Inn
                </span>
                    <span className={`${c.user__ogrn} ${c.user__block}`}>
                    OGRN
                </span>
                </div>
                <div className={c.user__manage}>
                    <NavLink to={`/user/${id}`} className={c.user__button + " btn"}>
                        Выбрать этого пользователя
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default User;