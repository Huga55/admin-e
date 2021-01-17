import React, {useEffect, useState} from "react";
import c from "./Order.module.css";
import {NavLink, useParams} from "react-router-dom";
import Docs from "./Docs/Docs";
import {getOneOrder, OrderType} from "../../redux/order-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

type PropsType = {
    type: "list" | "info"
    index?: number
    info?: OrderType
}

interface ParamsType {
    id: string
}

const Order: React.FC<PropsType> = (props) => {
    const [infoOrder, setInfoOrder] = useState<null | OrderType | undefined>(null);

    const {type, index, info} = props;

    const {id} = useParams<ParamsType>();

    const none = "отсутствует";

    const isInfo = type === "info";

    const dispatch = useDispatch();
    const infoOfCurrent = useSelector((state: AppStateType) => state.orders.currentOrder);

    useEffect(() => {
        setInfoOrder(info);
        if (!info) {
            dispatch(getOneOrder(Number(id)));
        }
    }, [])

    useEffect(() => {
        if(infoOfCurrent) {
            setInfoOrder(infoOfCurrent);
        }
    }, [infoOfCurrent]);

    useEffect(() => {
        if(info) {
            setInfoOrder(info);
        }
    }, [info])

    return (
        <>
            {isInfo ? <NavLink to="/orders" className={c.order__back + " btn"}>Назад</NavLink> : ""}
            <div className={c.order}>
                <div className={type === "list" ? c.order__top : `${c.order__top} ${c.order__column}`}>
                    <div className={`${c.order__block} ${c["order__dostavista-id"]}`}>
                        Id достависты : {infoOrder && infoOrder.idDostavista? infoOrder.idDostavista : none}
                    </div>
                    <div className={`${c.order__block} ${c.order__cargo}`}>
                        Название : {infoOrder && infoOrder.nameCargo ? infoOrder.nameCargo : none}
                    </div>
                    <div className={`${c.order__block} ${c.order__type}`}>
                        Тип : {infoOrder && infoOrder.type ? infoOrder.type === "docs" ? "документы" : "груз" : none}
                    </div>
                    <div className={`${c.order__block} ${c.order__track}`}>
                        Трек номер : {infoOrder && infoOrder.trackNumber? infoOrder.trackNumber : none}
                    </div>
                    <div className={isInfo? `${c.order__block} ${c.order__create} ${c.order__block_first}` : `${c.order__block} ${c.order__create}`}>
                        Дата создания : {infoOrder && infoOrder.dateCreate ? infoOrder.dateCreate : none}
                    </div>
                </div>
                <div className={type === "list" ? c.order__bottom : `${c.order__bottom} ${c.order__column}`}>
                    <div className={`${c.order__block} ${c.order__from}`}>
                        <div className={c.order__address}>
                            Адрес От: {infoOrder && infoOrder.addressDispatch ? infoOrder.addressDispatch : none}
                        </div>
                        {
                            infoOrder ? infoOrder.from.map((i, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <div className={c.order__name}>
                                            Имя: {i.name}
                                        </div>
                                        <div className={c.order__phone}>
                                            Телефон: {i.phone}
                                        </div>
                                    </React.Fragment>
                                );
                            }) : none
                        }
                    </div>

                    <div className={`${c.order__block} ${c.order__to}`}>
                        <div className={c.order__addressS}>
                            Адрес До: {infoOrder && infoOrder.addressDelivery ? infoOrder.addressDelivery : none}
                        </div>
                        {
                            infoOrder ? infoOrder.to.map((i, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <div className={c.order__name}>
                                            Name: {i.name}
                                        </div>
                                        <div className={c.order__phone}>
                                            Phone: {i.phone}
                                        </div>
                                    </React.Fragment>
                                );
                            }) : none
                        }
                    </div>
                    <div className={`${c.order__block} ${c.order__status}`}>
                        Статус: {infoOrder && infoOrder.status ? infoOrder.status : none}
                    </div>
                    <div className={`${c.order__block} ${c.order__document}`}>
                        Количество документов в заказе: {infoOrder ? infoOrder.docsCount : none}
                    </div>
                </div>
                {
                    type === "list" ?
                        <NavLink to={`/order/` + (infoOrder? infoOrder.id : 0)} className={c.order__link + " btn"}>
                            Выбрать
                        </NavLink>
                        : ""
                }
            </div>
            {
                isInfo? <Docs /> : ""
            }
        </>
    );
}

export default Order;