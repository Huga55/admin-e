import React from "react";
import c from "./User.module.css";
import {NavLink} from "react-router-dom";
import { UserType } from "../../redux/user-reducer";

type PropsType = {
    data: UserType | null
    index: number | null
}

const User: React.FC<PropsType> = (props) => {

    const { data, index } = props;

    return (
        <>
            {index === 0?
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
                </div> : ""}
            <div className={c.user}>
                <div className={c.user__info}>
                    <span className={`${c.user__name} ${c.user__block}`}>
                        {data?.name}
                    </span>
                    <span className={`${c.user__phone} ${c.user__block}`}>
                            {data?.phone}
                    </span>
                    <span className={`${c.user__address} ${c.user__block}`}>
                            {data?.address}
                    </span>
                    <span className={`${c.user__type} ${c.user__block}`}>
                            {data?.type}
                    </span>
                    <span className={`${c["user__name-organization"]} ${c.user__block}`}>
                            {data?.name_organization}
                    </span>
                    <span className={`${c.user__inn} ${c.user__block}`}>
                            {data?.inn}
                    </span>
                    <span className={`${c.user__ogrn} ${c.user__block}`}>
                            {data?.ogrn}
                    </span>
                </div>
                <div className={c.user__manage}>
                    <NavLink to={`/user/${data?.id}`} className={c.user__button + " btn"}>
                        Выбрать
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default User;