import React from "react";
import c from "./Page.module.css";
import Input from "../common/Input/Input";
import {FormProvider, useForm} from "react-hook-form";

const Page = () => {

    const methods = useForm({
        shouldFocusError: false,
    });

    const {handleSubmit, errors, register} = methods;

    const sendForm = (data: any) => {
        console.log(data);
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
                    <Input className={c.pages__input} name="title_top" type="" placeholder="" error={true}/>
                    <div className={c.pages__name}>Заголовок h1</div>
                    <Input className={c.pages__input} name="title_main" type="" placeholder="" error={true}/>
                    <div className={c.pages__name}>Заголовок документы h3</div>
                    <Input className={c.pages__input} name="title_doc" type="" placeholder="" error={true}/>

                    <table className={c.pages__table}>
                        <thead>
                        <tr>
                            <th><input ref={register} className={c.pages__td + " input"} name="th-0" defaultValue={"Вес, кг"} /></th>
                            <th><input ref={register} className={c.pages__td + " input"} name="th-1" defaultValue={"Зона 1"} /></th>
                            <th><input ref={register} className={c.pages__td + " input"} name="th-2" defaultValue={"Зона 2"} /></th>
                            <th><input ref={register} className={c.pages__td + " input"} name="th-3" defaultValue={"Зона 3"} /></th>
                            <th><input ref={register} className={c.pages__td + " input"} name="th-4" defaultValue={"Зона 4"} /></th>
                            <th><input ref={register} className={c.pages__td + " input"} name="th-5" defaultValue={"Зона 5"} /></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-0-0" defaultValue={"0,5"} /></td>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-0-1" defaultValue={"1010"} /></td>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-0-2" defaultValue={"1596"} /></td>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-0-3" defaultValue={"1848"} /></td>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-0-4" defaultValue={"1987"} /></td>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-0-5" defaultValue={"2198"} /></td>
                        </tr>
                        <tr>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-1-0" defaultValue={"0,5"} /></td>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-1-1" defaultValue={"1010"} /></td>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-1-2" defaultValue={"1596"} /></td>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-1-3" defaultValue={"1848"} /></td>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-1-4" defaultValue={"1987"} /></td>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-1-5" defaultValue={"2198"} /></td>
                        </tr>
                        <tr>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-2-0" defaultValue={"0,5"} /></td>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-2-1" defaultValue={"1010"} /></td>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-2-2" defaultValue={"1596"} /></td>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-2-3" defaultValue={"1848"} /></td>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-2-4" defaultValue={"1987"} /></td>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-2-5" defaultValue={"2198"} /></td>
                        </tr>
                        <tr>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-3-0" defaultValue={"0,5"} /></td>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-3-1" defaultValue={"1010"} /></td>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-3-2" defaultValue={"1596"} /></td>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-3-3" defaultValue={"1848"} /></td>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-3-4" defaultValue={"1987"} /></td>
                            <td><input ref={register} className={c.pages__td + " input"} name="td-3-5" defaultValue={"2198"} /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><button className={c.pages__delete + " btn"}>Удалить</button></td>
                            <td><button className={c.pages__delete + " btn"}>Удалить</button></td>
                            <td><button className={c.pages__delete + " btn"}>Удалить</button></td>
                            <td><button className={c.pages__delete + " btn"}>Удалить</button></td>
                            <td><button className={c.pages__delete + " btn"}>Удалить</button></td>
                        </tr>
                        </tbody>
                        <button className={c.pages__add + " btn"}>
                            Добавить
                        </button>
                    </table>

                </form>
            </FormProvider>
        </div>
    );
}

export default Page;