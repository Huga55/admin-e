import React, {useEffect, useState} from "react";
import c from "./Orders.module.css";
import Order from "./Order/Order";
import {getOrders, setCurrentPageOrderAction} from "../redux/order-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import Manage from "../common/Manage/Manage";

const Orders = () => {
    const { currentPage, countPages, countNeed, orders, countOrders } = useSelector((state: AppStateType) => state.orders);
    const [currentPageOfManage, setCurrentPageOfManage] = useState(currentPage);

    const dispatch = useDispatch();

    useEffect(() => {
        getOrdersWithFilters();
    }, [])

    useEffect(() => {
        changeCurrentPage();
    }, [currentPageOfManage])

    const changeCurrentPage = async () => {
        await dispatch(setCurrentPageOrderAction(currentPageOfManage));
        await getOrdersWithFilters();
    }

    const getOrdersWithFilters = (searchFilter = null, name = null, dateCreate = null) => {
        dispatch(getOrders({searchFilter, name, dateCreate, currentPage: currentPageOfManage, countNeed}));
    }

    return(
        <div className={c.orders}>
            <div className={c.orders__title + " title"}>
                Все заказы
            </div>
            <div className={c.orders__count}>
                Количество заказов: {countOrders}
            </div>
            {
                orders? orders.map((o, index) => {
                    return <Order type="list" info={o} index={index}/>
                }) : ""
            }
            <Manage countPages={countPages} currentPage={currentPage}
                    setCurrentPage={(page) => setCurrentPageOfManage(page)}/>
        </div>
    );
}

export default Orders;