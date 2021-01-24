import React from "react";
import c from "./Page.module.css";
import Input from "../common/Input/Input";
import {FormProvider, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import Posibility from "./Posibility/Posibility";
import Additional from "./Additional/Additional";
import Table from "./Table/Table";
import {sendDataPage} from "../redux/page-reducer";
import {AppStateType} from "../redux/redux-store";

export type DataTableType = {
    title: string
    head: Array<string>
    body: Array<string[]>
}

const Page = () => {
    const { name, titleTop, titleMain, titleDoc } = useSelector((state: AppStateType) => state.page);

    const dispatch = useDispatch();

    const methods = useForm({
        shouldFocusError: false,
    });

    const { handleSubmit, register } = methods;

    const sendForm = (data: any) => {
        const sendData = {
            name: data.name,
            titleTop: data.titleTop,
            titleMain: data.titleMain,
            titleDoc: data.titleDoc,
            table: getTableData(data),
            posibilities: getPosibData(data),
            services: getServiceData(data),
            additional: getAddData(data),
        }
        dispatch(sendDataPage(sendData));
    }

    const getTableData = (data: any) => {
        const rowCount = data.row_count;//first
        const columnCount = data.column_count;//second
        let head = [];
        let body = [];
        for (let i = 0; i < columnCount; i++) {
            head[i] = data["th-" + i];
        }
        for (let i = 0; i < rowCount; i++) {
            body[i] = [""];
            for(let j = 0; j < columnCount; j++) {
                body[i][j] = data["td-" + i + "-" + j];
            }
        }
        return { title: data.table_title, head, body };
    }

    const getPosibData = (data: any) => {
        const posCount = data.posibility_count;
        let posibilities = {
            title: data.posibilityTitle,
            data: [""],
        };
        for(let i = 0; i < posCount; i++) {
            posibilities.data[i] = data["posibility_" + i];
        }

        return posibilities;
    }

    const getServiceData = (data: any) => {
        const serviceCount = data.service_count;
        let services = {
            title: data.serviceTitle,
            data: [""],
        }
        for(let i = 0; i < serviceCount; i++) {
            services.data[i] = data["service_" + i];
        }
        return services;
    }

    const getAddData = (data: any) => {
        const title = data.add_title;
        const blockCount = data.add_block_count;
        const additional = {
            title: title,
            data: [{
                name: "",
                text: [""],
            }],
        }
        for(let i = 0; i < blockCount; i++) {
            const texCount = data["add_text_count_" + i];
            additional.data[i] = {
                name: "",
                text: [],
            }
            additional.data[i].name = data["add_name_" + i];
            for(let j = 0; j < texCount; j++) {
                additional.data[i].text[j] = data["add_text_" + i + "_" + j];
            }
        }
        return additional;
    }

    return (
        <div>
            <div className={c.pages__title + " title"}>
                Изменение типовой страницы
            </div>
            <FormProvider {...methods}>
                <form className={c.pages__form} onSubmit={handleSubmit(sendForm)}>
                    <div className={c.pages__name}>Название, хлебные крошки</div>
                    <Input className={c.pages__input} name="name" type="" placeholder="" error={true} register={register} value={name? name : ""}/>
                    <div className={c.pages__name}>Верхний заголовок h2</div>
                    <Input className={c.pages__input} name="titleTop" type="" placeholder="" error={true} register={register} value={titleTop? titleTop : ""}/>
                    <div className={c.pages__name}>Заголовок h1</div>
                    <Input className={c.pages__input} name="titleMain" type="" placeholder="" error={true} register={register} value={titleMain? titleMain : ""}/>
                    <div className={c.pages__name}>Заголовок документы h3</div>
                    <Input className={c.pages__input} name="titleDoc" type="" placeholder="" error={true} register={register} value={titleDoc? titleDoc : ""}/>
                    <Table />
                    <Posibility type="posibility"/>
                    <Posibility type="service"/>
                    <Additional />
                    <button className={c.pages__button + " btn"}>
                        Сохранить все изменения
                    </button>
                </form>
            </FormProvider>
        </div>
    );
}

export default Page;