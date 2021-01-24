import React, {useEffect, useState} from "react";
import c from "./Orders.module.css";
import Order from "./Order/Order";
import {getOrders, setCurrentPageOrderAction} from "../redux/order-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import Manage from "../common/Manage/Manage";

type PropsType = {
    userId: number | null
}

const Orders: React.FC<PropsType> = (props) => {
    const [userIdState, setUserIdState] = useState(null);
    const [toNeedRefresh, setToNeedRefresh] = useState(false);
    const { currentPage, countPages, countNeed, orders, countOrders } = useSelector((state: AppStateType) => state.orders);
    const [currentPageOfManage, setCurrentPageOfManage] = useState(currentPage);

    const { userId } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        getOrdersWithFilters();
    }, [])

    useEffect(() => {
        changeCurrentPage();
    }, [currentPageOfManage])

    useEffect(() => {
        if(userId) {
            changeCurrentPage();
        }
    }, [userId])

    useEffect(() => {
        if(toNeedRefresh) {
            getOrdersWithFilters();
            setToNeedRefresh(false);
        }
    }, [toNeedRefresh])

    const changeCurrentPage = async () => {
        await dispatch(setCurrentPageOrderAction(currentPageOfManage));
        await getOrdersWithFilters();
    }

    const getOrdersWithFilters = (searchFilter = null, name = null, dateCreate = null) => {
        dispatch(getOrders({searchFilter, name, dateCreate, currentPage: currentPageOfManage, countNeed, userId}));
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
                    return <Order type="list" info={o} index={index} setToNeedRefresh={setToNeedRefresh}/>
                }) : ""
            }
            <Manage countPages={countPages} currentPage={currentPage}
                    setCurrentPage={(page) => setCurrentPageOfManage(page)}/>
        </div>
    );
}

export default Orders;