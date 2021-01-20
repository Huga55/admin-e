import React, {useEffect, useState} from "react";
import c from "./Users.module.css";
import User from "./User/User";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {
    getUsers,
    setCurrentPageUserAction,
    setDateCreateFilterUserAction, setNameFilterUserAction,
    setSearchFilterUserAction
} from "../redux/user-reducer";
import {setCurrentPageOrderAction} from "../redux/order-reducer";
import Manage from "../common/Manage/Manage";

type PropsType = any

const Users: React.FC<PropsType> = (props) => {
    const [nameFilter, setNameFilter] = useState<null | "asc" | "desc">(null);
    const [dateCreateFilter, setDateCreateFilter] = useState<null | "asc" | "desc">(null);
    const [searchFilter, setSearchFilter] = useState(null);

    const { currentPage, countPages, countNeed, users, countUsers, filters } = useSelector((state: AppStateType) => state.user);

    const [currentPageOfManage, setCurrentPageOfManage] = useState(currentPage);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers({searchFilter: null, name: null, dateCreate: null, currentPage, countNeed}));
    }, [])

    useEffect(() => {
        changeCurrentPage();
    }, [currentPageOfManage])

    useEffect(() => {
        changeFilter();
    }, [nameFilter, dateCreateFilter, searchFilter]);

    const changeFilter = async () => {
        await dispatch(setNameFilterUserAction(nameFilter));
        await dispatch(setDateCreateFilterUserAction(dateCreateFilter));
        await dispatch(setSearchFilterUserAction(searchFilter));
        await changeCurrentPage();
    }

    const changeCurrentPage = async () => {
        await dispatch(setCurrentPageUserAction(currentPageOfManage));
        await dispatch(getUsers({searchFilter: filters.searchFilter, name: filters.name, dateCreate: filters.dateCreate, currentPage, countNeed}));
    }

    const changeNameFilter = () => {
        if(!nameFilter || nameFilter === "desc") {
            setNameFilter("asc");
        }else {
            setNameFilter("desc");
        }
    }

    const changeDateCreateFilter = () => {
        if(!dateCreateFilter || dateCreateFilter === "desc") {
            setDateCreateFilter("asc");
        }else {
            setDateCreateFilter("desc");
        }
    }

    return(
        <div className={c.users}>
            <div className={c.users__title + " title"}>
                Список всех пользователей
            </div>
            <div className={c.users__count}>
                Найдено пользователей: {countUsers}
            </div>
            <div className={c.users__filters}>
                <div className={c.users__minititle}>Сортировка</div>
                <div className={c.users__list}>
                    <div className={c.users__name} onClick={changeNameFilter}>
                        По имени
                    </div>
                    <div className={c.users__create} onClick={changeDateCreateFilter}>
                        По дате регистрации
                    </div>
                </div>
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