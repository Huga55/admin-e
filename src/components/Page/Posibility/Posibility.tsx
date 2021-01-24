import React, {useEffect, useState} from "react";
import c from "./Posibility.module.css";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {useFormContext} from "react-hook-form";

export type PosibilityType = {
    title: string
    data: Array<string>
}

type PropsType = {
    type: "posibility" | "service"
}

const Posibility: React.FC<PropsType> = (props) => {
    const [posibState, setPosibState] = useState<null | PosibilityType>(null);
    const [isOpen, setIsOpen] = useState(false);

    const { type } = props;

    const posibilities = useSelector((state: AppStateType) => state.page.posibilities);

    const { register } = useFormContext();

    useEffect(() => {
        setPosibState(posibilities);
    }, [posibilities]);

    const addPosib = () => {
        setPosibState( posibState? {
            title: posibState.title,
            data: [...posibState?.data, ""],
        } : null);
    }

    const deletePosib = (index: number) => {
        setPosibState( posibState? {
            title: posibState.title,
            data: posibState.data.filter((p, indexPosib) => indexPosib !== index ),
        } : null);
    }

    const moveUp = (index: number) => {
        setPosibState( posibState? {
            title: posibState.title,
            data: posibState.data.map((p, indexPosib) => {
                if(indexPosib === index) {
                    return posibState.data[index  - 1];
                }
                if(indexPosib === index - 1) {
                    return posibState.data[index];
                }
                return p;
            } ),
        } : null);
    }

    const moveDown = (index: number) => {
        setPosibState( posibState? {
            title: posibState.title,
            data: posibState.data.map((p, indexPosib) => {
                if(indexPosib === index) {
                    return posibState.data[index  + 1];
                }
                if(indexPosib === index + 1) {
                    return posibState.data[index];
                }
                return p;
            } ),
        } : null);
    }

    const changeInput = (index: number, isTitle: boolean, e: any) => {
        setPosibState(posibState? {
            title: isTitle? e.currentTarget.value : posibState.title,
            data: isTitle? posibState.data : posibState.data.map((p, indexPosib) => indexPosib === index? e.currentTarget.value : p),
        } : null);
    }

    return(
        <div className={c.posibility}>
            <div className={c.posibility__title} onClick={() => setIsOpen(!isOpen)}>
                Редактирование блока {type === "posibility"? "возможности" : "сервисы"} {isOpen? "(свернуть)" : "(развернуть)"}
            </div>
            <div className={isOpen? c.posibility__content : c.posibility__none}>
            <div className={c.posibility__subtitle}>
                Заголовок
            </div>
            <div className={c.posibility__box}>
                <input type="text" className={c.posibility__input + " input"} name={type === "posibility"? "posibilityTitle" : "serviceTitle"} defaultValue={posibState?.title}
                        onChange={(e) => changeInput(0, true, e)} ref={register}/>
            </div>
            {
                posibState?.data.map((p, index) => {
                    return (
                        <div className={c.posibility__block} key={index}>
                            <input type="hidden" name={type === "posibility"? "posibility_count" : "service_count"} value={posibState?.data.length} ref={register}/>
                            <div className={c.posibility__number}>
                                {index + 1}.
                            </div>
                            <input type="text" name={type === "posibility"? "posibility_" + index : "service_" + index} className={c.posibility__input + " input"} value={p}
                                    onChange={(e) => changeInput(index, false, e)} ref={register}/>
                            {
                                posibState.data.length > 1?
                                    <span className={c.posibility__delete + " btn"} onClick={() => deletePosib(index)}>
                                        Удалить
                                    </span> : ""
                            }
                            <div className={c.posibility__move}>
                                {
                                    index > 0?
                                    <div className={`${c.posibility__up} ${c.posibility__direction}`} onClick={() => moveUp(index)}>
                                        &uarr;
                                    </div> : ""
                                }
                                {
                                    index < posibState.data.length - 1?
                                        <div className={`${c.posibility__down} ${c.posibility__direction}`} onClick={() => moveDown(index)}>
                                            &darr;
                                        </div> : ""
                                }
                            </div>
                        </div>
                    );
                })
            }
            <span className={c.posibility__add + " btn"} onClick={addPosib}>
                Добавить
            </span>
            </div>
        </div>
    );
}

export default Posibility;