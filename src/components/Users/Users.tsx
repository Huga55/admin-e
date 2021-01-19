import React, {useEffect, useState} from "react";
import c from "./Users.module.css";
import User from "./User/User";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {getUsers, setCurrentPageUserAction} from "../redux/user-reducer";
import {setCurrentPageOrderAction} from "../redux/order-reducer";
import Manage from "../common/Manage/Manage";

type PropsType = any

const Users: React.FC<PropsType> = (props) => {
    const { currentPage, countPages, countNeed, users, countUsers, filters } = useSelector((state: AppStateType) => state.user);

    const [currentPageOfManage, setCurrentPageOfManage] = useState(currentPage);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers({searchFilter: null, name: null, dateCreate: null, currentPage, countNeed}));
    }, [])

    useEffect(() => {
        changeCurrentPage();
    }, [currentPageOfManage])

    const changeCurrentPage = async () => {
        await dispatch(setCurrentPageUserAction(currentPageOfManage));
        await getUsers({searchFilter: filters.searchFilter, name: filters.name, dateCreate: filters.dateCreate, currentPage, countNeed});
    }

    return(
        <div className={c.users}>
            <div className={c.users__title + " title"}>
                Список всех пользователей
            </div>
            <div className={c.users__content}>
                {
                    users? users.map((u, index) => {
                        return <User data={u} index={index}/>
                    }) : ""
                }

            </div>
            <Manage countPages={countPages} currentPage={currentPage}
                    setCurrentPage={(page) => setCurrentPageOfManage(page)}/>
        </div>
    );
}

export default Users;