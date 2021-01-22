import React, {useState} from "react";
import c from "./Page.module.css";
import Input from "../common/Input/Input";
import {FormProvider, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {addRowAction, addColumnAction, deleteRowAction, deleteColumnAction} from "../redux/page-reducer";

export type DataTableType = {
    head: Array<string>
    body: Array<string[]>
}

const Page = () => {

    const { table } = useSelector((state: AppStateType) => state.page);

    const dispatch = useDispatch();

    const methods = useForm({
        shouldFocusError: false,
    });

    const {handleSubmit, errors, register} = methods;

    const sendForm = (data: any) => {
        console.log(data);
    }


    const tableAddRow = () => {
        dispatch(addRowAction());
    }

    const tableAddColumn = () => {
        dispatch(addColumnAction());
    }

    const tableDeleteRow = (index: number) => {
        dispatch(deleteRowAction(index));
    }

    const tableDeleteColumn = (index: number) => {
        dispatch(deleteColumnAction(index));
    }

    return (
        <div>
            <div className={c.pages__title + " title"}>
                Изменение типовой страницы
            </div>
            <FormProvider {...methods}>
                <form className={c.pages__form} onSubmit={handleSubmit(sendForm)}>
                    <div className={c.pages__name}>Название, хлебные крошки</div>
                    <Input className={c.pages__input} name="name" type="" placeholder="" error={true}/>
                    <div className={c.pages__name}>Верхний заголовок h2</div>
                    <Input className={c.pages__input} name="titleTop" type="" placeholder="" error={true}/>
                    <div className={c.pages__name}>Заголовок h1</div>
                    <Input className={c.pages__input} name="titleMain" type="" placeholder="" error={true}/>
                    <div className={c.pages__name}>Заголовок документы h3</div>
                    <Input className={c.pages__input} name="titleDoc" type="" placeholder="" error={true}/>
                    <div className={c.pages__subtitle}>
                        Изменение таблицы
                    </div>
                    <table className={c.pages__table}>
                        <thead>
                        <tr>
                            {
                                table?.head?.map((h, index) => {
                                    return <th><input ref={register} className={c.pages__td + " input"} name={"th-" + index} defaultValue={h} /></th>;
                                })
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            table?.body?.map((row, rowIndex) => {
                                return(
                                    <tr>
                                        {
                                            row.map((td, tdIndex) => {
                                                return <td><input ref={register} className={c.pages__td + " input"} name={"td-" + rowIndex + "-" + tdIndex} defaultValue={td} /></td>;
                                            })
                                        }
                                    </tr>
                                );
                            })
                        }
                        <tr>
                        {
                            table?.head?.map((d, index) => {
                                if(index > 0) {
                                    return <td><button className={c.pages__delete + " btn"} onClick={() => deleteColumnAction(index)}>Удалить</button></td>;
                                }else {
                                    return <td><button className={`${c.pages__delete} ${c.pages__button_green} btn`} onClick={tableAddColumn}>Добавить</button></td>;
                                }

                            })
                        }
                        </tr>
                        </tbody>
                        <div className={c.pages__column}>
                            {
                                table?.body[0].map((arr, index) => {
                                    if (index > 0) {
                                        return (
                                            <button className={`${c.pages__add} ${c.pages__button_green} btn`}
                                                    onClick={() => tableDeleteRow(index)}>
                                                Удалить
                                            </button>
                                        )
                                    } else {
                                        return (
                                            <button className={`${c.pages__add} ${c.pages__button_green} btn`}
                                                    onClick={tableAddRow}>
                                                Добавить
                                            </button>
                                        )
                                    }
                                })
                            }
                        </div>
                    </table>
                </form>
            </FormProvider>
        </div>
    );
}

export default Page;