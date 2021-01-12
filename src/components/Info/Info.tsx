import React from "react";
import c from "./Info.module.css";

const Info = () => {
    return (
        <div className={c.info}>
            <div className={c.info__title + " title"}>
                Пользователь: Иванов Иван Иванович
            </div>
            <button className={c.info__back + " btn"}>
                Назад
            </button>
            <div className={c.info__user}>
                <span className={`${c.info__name} ${c.info__block}`}>
                    Name
                </span>
                <span className={`${c.info__phone} ${c.info__block}`}>
                    8-952-684-56-99
                </span>
                <span className={`${c.info__address} ${c.info__block}`}>
                    Addres Addres Addres Addres Addres Addres
                </span>
                <span className={`${c.info__type} ${c.info__block}`}>
                    Физ. / Юр.
                </span>
                <span className={`${c["info__name-organization"]} ${c.info__block}`}>
                    Name Organization
                </span>
                <span className={`${c.info__inn} ${c.info__block}`}>
                    Inn
                </span>
                <span className={`${c.info__ogrn} ${c.info__block}`}>
                    OGRN
                </span>
            </div>
        </div>
    );
}

export default Info;