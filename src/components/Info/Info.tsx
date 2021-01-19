import React, {useEffect} from "react";
import c from "./Info.module.css";
import Orders from "../Orders/Orders";
import {getOneUser, UserType} from "../redux/user-reducer";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import {ParamsType} from "../Orders/Order/Order";
import {AppStateType} from "../redux/redux-store";

const Info = () => {

    const { id } = useParams<ParamsType>();

    const currentUser = useSelector((state: AppStateType) => state.user.currentUser);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneUser(Number(id)));
    }, [])

    const getBack = () => {

    }

    return (
        <div className={c.info}>
            <div className={c.info__title + " title"}>
                Пользователь: Иванов Иван Иванович
            </div>
            <NavLink to="/users" className={c.info__back + " btn"}>
                Назад
            </NavLink>
            <div className={c.info__user}>
                <span className={`${c.info__name} ${c.info__block}`}>
                    Имя: {currentUser?.name}
                </span>
                <span className={`${c.info__phone} ${c.info__block}`}>
                    Телефон: {currentUser?.phone}
                </span>
                <span className={`${c.info__address} ${c.info__block}`}>
                    Адрес: {currentUser?.address}
                </span>
                <span className={`${c.info__type} ${c.info__block}`}>
                    Физ. / Юр. {currentUser?.type}
                </span>
                <span className={`${c["info__name-organization"]} ${c.info__block}`}>
                    Название организации: {currentUser?.name_organization}
                </span>
                <span className={`${c.info__inn} ${c.info__block}`}>
                    ИНН: {currentUser?.inn}
                </span>
                <span className={`${c.info__ogrn} ${c.info__block}`}>
                    ОГРН: {currentUser?.ogrn}
                </span>
            </div>
            <div className={c.info__orders}>
                <Orders />
            </div>
        </div>
    );
}

export default Info;