import React, {useState} from "react";
import c from "./Docs.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import Label from "../../../common/Label/Lable";
import Input from "../../../common/Input/Input";
import {FormProvider, useForm} from "react-hook-form";
import Radios from "../../../common/Radios/Radios";
import {deleteFile, getOneOrder, sendFile} from "../../../redux/order-reducer";
import {getValidateProps} from "../../../utils/validate/validate";
import {useParams} from "react-router-dom";
import {ParamsType} from "../Order";

type PropsType = {
    orderId: number
};

export type SendFileDataType = {
    file: any
    doc_type: string
    doc_name: string
}

const Docs: React.FC<PropsType> = (props) => {
    const [fileInfo, setFileInfo] = useState(null);
    const docs = useSelector((state: AppStateType) => state.orders.currentDocs);

    const { orderId } = props;

    const {id} = useParams<ParamsType>();

    const dispatch = useDispatch();

    const methods = useForm({
        shouldFocusError: false
    });

    const { handleSubmit, register, errors, setValue } = methods;

    const deleteDoc = async (docId: number) => {
        await dispatch(deleteFile(docId));
        await dispatch(getOneOrder(Number(id)));
    }

    const sendForm = async (data: SendFileDataType) => {
        console.log(data);
        const sendData = {
            doc_name: data.doc_name,
            doc_type: data.doc_type,
            file: data.file[0],
        }
        await dispatch(sendFile(sendData, orderId));
        await dispatch(getOneOrder(Number(id)));
        await setFileInfo(null);
        await setValue("file", null);
    }

    const changeInput = (e: any) => {
        const name = e.currentTarget.files[0].name;
        setFileInfo(name);
    }

    const cancelForm = (e: any) => {
        e.preventDefault();
        setFileInfo(null);
        setValue("file", null);
    }

    return(
        <div className={c.docs}>
            <div className={c.docs__subtitle + " title"}>Документы</div>
            {
                docs && docs.length?
                    <div className={c.docs__window}>
                        <div className={c.docs__top}>
                            <div className={`${c.docs__head} ${c.docs__index}`}>
                                №
                            </div>
                            <div className={`${c.docs__head} ${c.docs__name}`}>
                                Название
                            </div>
                            <div className={`${c.docs__head} ${c.docs__type}`}>
                                Тип
                            </div>
                            <div className={`${c.docs__head} ${c.docs__link}`}>

                            </div>
                            <div className={`${c.docs__head} ${c.docs__delete}`}>

                            </div>
                        </div>
                        <div className={c.docs__main}>
                            {
                                docs.map( (d, index) => {
                                    return(
                                        <div key={index} className={c.docs__row}>
                                            <div className={`${c.docs__td} ${c.docs__index}`}>
                                                {index + 1}
                                            </div>
                                            <div className={`${c.docs__td} ${c.docs__name}`}>
                                                {d.name}
                                            </div>
                                            <div className={`${c.docs__td} ${c.docs__type}`}>
                                                {d.doc_type}
                                            </div>
                                            <div className={`${c.docs__td} ${c.docs__link}`}>
                                                <a className={c.docs__download} href={d.path} target="_blank" download={true}>Скачать</a>
                                            </div>
                                            <div className={`${c.docs__td} ${c.docs__delete}`} onClick={() => deleteDoc(d.id)}>
                                                Удалить
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    : "Документов нет"
            }

                <FormProvider {...methods}>
                    <form className={c.docs__form} onSubmit={handleSubmit(sendForm)}>
                        <input type="file" name="file" id="download-doc" className={c.docs_none}
                               onChange={(e) => changeInput(e)} ref={register}/>
                        {!fileInfo?
                            <>
                                <div className={c.docs__title}>
                                    Загрузить файлы
                                </div>
                                <Label>
                                    <label htmlFor="download-doc" className={c.docs__label}>
                                        Загрузить новый файл
                                    </label>
                                </Label>
                            </>
                            :
                            <>
                                <div className={c["docs__file-name"]}>
                                    Загружаемый файл: {fileInfo}
                                </div>
                                <Input className={c.docs__input} name="doc_name" type=""
                                       placeholder="Название документа"
                                       error={true} register={register}
                                       validateProps={getValidateProps({standart: ["required"], custom: []})}/>
                                <Radios className={c.docs__radio} name="doc_type" inputs={[
                                    {value: "Бухгалтерский", html: "Бухгалтерский", afterId: "buh", beforeId: "doc", register},
                                    {value: "Иной", html: "Иной", afterId: "other", beforeId: "doc", register}
                                ]}/>
                                <button className={c.docs__button + " btn"}>
                                    Сохранить
                                </button>
                                <button className={c.docs__button + " btn"} onClick={(e) => cancelForm(e)}>
                                    Отменить
                                </button>
                            </>
                        }
                    </form>
                </FormProvider>
        </div>
    );
}

export default Docs;