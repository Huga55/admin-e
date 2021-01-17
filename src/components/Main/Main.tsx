import React, {useState} from "react";
import c from "./Main.module.css";
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import Input from "../common/Input/Input";
import {FormProvider, useForm} from "react-hook-form";
import {getValidateProps} from "../utils/validate/validate";
import Label from "../common/Label/Lable";

const Main = () => {
    const [isChange, setIsChange] = useState(true);

    const {id, name, email, position} = useSelector((state: AppStateType) => state.profile);

    const methods = useForm({
        shouldFocusError: false,
    });

    const {register, handleSubmit, errors} = methods;

    const sendForm = (data: any) => {

    }

    return (
        <div className={c.main}>
            <div className={c.main__title + " title"}>
                Информация о пользователе админ панели
            </div>
            <button className={c.main__button + " btn"} onClick={() => setIsChange(!isChange)}>
                {isChange ? "Закончить изменения" : "Изменить данные"}
            </button>
            {!isChange ?
                <>
                    <div className={`${c.main__name} ${c.main__block}`}>
                        Имя: {name}
                    </div>
                    <div className={`${c.main__email} ${c.main__block}`}>
                        Email: {email}
                    </div>
                    <div className={`${c.main__position} ${c.main__block}`}>
                        Должность: {position === "admin" ? "Администратор" : "Менеджер"}
                    </div>
                </>
                :
                <FormProvider {...methods}>
                    <form className={c.main__form} onSubmit={handleSubmit(sendForm)}>
                        <Label className={c.main__label}>
                            <Input className={c.main__input} name="name" type="" placeholder="Имя" error={true}
                                   register={register} errorData={errors}
                                   validateProps={getValidateProps({standart: ["required"], custom: []})}/>
                        </Label>
                        <Label className={c.main__label}>
                            <Input className={c.main__input} name="password" type="" placeholder="Новый пароль" error={true}
                                   register={register} errorData={errors}
                                   validateProps={getValidateProps({standart: ["required"], custom: []})}/>
                        </Label>
                        <Label className={c.main__label}>
                            <Input className={c.main__input} name="password" type="" placeholder="Повторите пароль"
                                   error={true}
                                   register={register} errorData={errors}
                                   validateProps={getValidateProps({standart: ["required"], custom: []})}/>
                        </Label>
                        <button className={c.main__accept + " btn"}>
                            Применить изменения
                        </button>
                    </form>
                </FormProvider>
            }
        </div>
    );
}

export default Main;