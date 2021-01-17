import React, {useEffect} from "react";
import c from "./Auth.module.css";
import Label from "../common/Label/Lable";
import Input from "../common/Input/Input";
import {FormProvider, useForm} from "react-hook-form";
import {getValidateProps} from "../utils/validate/validate";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {setLoginErrorAction} from "../redux/form-reducer";
import {LoginType, loginUser} from "../redux/profile-reducer";
import Spinner from "../Spinner/Spinner";

const Auth = () => {
    const methods = useForm({
        shouldFocusError: false,
    });

    const { register, handleSubmit, errors, setError } = methods;

    const isAjax= useSelector((state: AppStateType) => state.app.isAjax);

    const { loginError } = useSelector((state:AppStateType) => state.forms);
    const dispatch = useDispatch();

    const sendForm = (data: LoginType) => {
        dispatch(loginUser(data));
    }

    useEffect(() => {
        if(loginError) {
            setError("email", {type: "maniual", message: ""});
            setError("password", {type: "maniual", message: loginError});
            dispatch(setLoginErrorAction(null));
        }
    }, [loginError])

    return (

        <div className={c.auth}>
            {isAjax? <Spinner isWhite={false} /> : ""}
            <div className={c.auth__window}>
                <div className={c.auth__title}>
                    Вход в админ панель
                </div>
                <FormProvider {...methods}>
                    <form className={c.auth__form} onSubmit={handleSubmit(sendForm)}>
                        <Label>
                            <Input className={c.auth__input} name="email" type="email" placeholder="email"
                                   error={true} register={register} errorData={errors}
                                   validateProps={getValidateProps({standart: ["required"], custom: []})}/>
                        </Label>
                        <Label>
                            <Input className={c.auth__input} name="password" type="password" placeholder="password"
                                   error={true} register={register} errorData={errors}
                                   validateProps={getValidateProps({standart: ["required"], custom: []})}/>
                        </Label>
                        <button className={c.auth__button + " btn"}>
                            Войти
                        </button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}

export default Auth;