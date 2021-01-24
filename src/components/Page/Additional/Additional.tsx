import React, {useEffect, useState} from "react";
import c from "./Additional.module.css";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {useFormContext} from "react-hook-form";

export type AdditionalType = {
    title: string
    data: Array<{
            name: string
            text: Array<string>
        }>
}

const Additional = () => {
    const [additionalState, setAdditionalState] = useState<null | AdditionalType>(null);
    const [isOpen, setIsOpen] = useState(false);

    const additional = useSelector((state: AppStateType) => state.page.additional);

    const { register } = useFormContext();

    useEffect(() => {
        setAdditionalState(additional);
    }, [additional])

    const addBlock = () => {
        setAdditionalState(additionalState? {
            title: additionalState.title,
            data: [...additionalState.data, {name: "", text: [""]} ],
        } : null);
    }

    const deleteBlock = (index: number) => {
        setAdditionalState(additionalState? {
            title: additionalState.title,
            data: additionalState.data.filter((b, indexBlock) => indexBlock !== index),
        } : null);
    }

    const deleteText = (indexBlock: number, indexText: number) => {
        setAdditionalState(additionalState? {
            title: additionalState.title,
            data: additionalState.data.map((b, indexB) => {
                if(indexB === indexBlock) {
                    b.text = b.text.filter((t, indexT) => indexT !== indexText);
                }
                return b;
            } ),
        } : null);
    }

    const addText = (indexBlock: number) => {
        setAdditionalState(additionalState? {
            title: additionalState.title,
            data: additionalState.data.map((b, indexB) => {
                if(indexB === indexBlock) {
                    b.text = [...b.text, ""];
                }
                return b;
            } ),
        } : null);
    }

    const moveUp = (indexBlock: number) => {
        setAdditionalState(additionalState? {
            title: additionalState.title,
            data: additionalState.data.map((b, indexB) => {
                if(indexB === indexBlock) {
                    return additionalState.data[indexBlock - 1]
                }
                if(indexB === indexBlock - 1) {
                    return additionalState.data[indexBlock]
                }
                return b;
            } ),
        } : null);
    }

    const moveDown = (indexBlock: number) => {
        setAdditionalState(additionalState? {
            title: additionalState.title,
            data: additionalState.data.map((b, indexB) => {
                if(indexB === indexBlock) {
                    return additionalState.data[indexBlock + 1]
                }
                if(indexB === indexBlock + 1) {
                    return additionalState.data[indexBlock]
                }
                return b;
            } ),
        } : null);
    }

    const changeInput = (isTitle: boolean, isName: boolean, e: any, indexArr = 0, indexStr = 0) => {
        const value = e.currentTarget.value;
        setAdditionalState(additionalState? {
            title: isTitle? value : additionalState.title,
            data: isTitle? additionalState.data : additionalState.data.map((d, index) => {
                if(index === indexArr) {
                    return {
                        name: isName? value : d.name,
                        text: !isName? d.text.map((text, index) => index === indexStr? value : text) : d.text,
                    }
                }
                return d;
            }),
        } : null);
    }

    return(
        <div className={c.additional}>
            <div className={c.additional__title} onClick={() => setIsOpen(!isOpen)}>
                Редактирование блока дополнительные услуги {isOpen? "(свернуть)" : "(развернуть)"}
            </div>
            <div className={isOpen? c.additional__content : c.additional__none}>
            <div className={c.additional__subtitle}>
                Заголовок
            </div>
            <div className={c.additional__box}>
                <input type="text" name="add_title" ref={register} value={additionalState?.title} className={c.additional__input + " input"}
                            onChange={(e) => changeInput(true, false, e)}/>
            </div>
            {
                additionalState?.data.map((block, indexBlock) => {
                    return(
                        <div className={c.additional__block} key={indexBlock}>
                            <input type="hidden" ref={register} name="add_block_count" value={additionalState?.data.length}/>
                            <div className={c.additional__minititle}>
                                Блок {indexBlock + 1}
                                {additionalState?.data.length > 1?<span className={c.additional__delete + " btn"} onClick={() => deleteBlock(indexBlock)}>Удалить</span> : ""}
                                <div className={c.additional__move}>
                                    {
                                        indexBlock > 0?
                                            <div className={`${c.additional__up} ${c.additional__direction}`} onClick={() => moveUp(indexBlock)}>
                                                &uarr;
                                            </div> : ""
                                    }
                                    {
                                        indexBlock < additionalState.data.length - 1?
                                            <div className={`${c.additional__down} ${c.additional__direction}`} onClick={() => moveDown(indexBlock)}>
                                                &darr;
                                            </div> : ""
                                    }
                                </div>
                            </div>
                            <div className={c.additional__name}>
                                <input type="text" name={"add_name_" + indexBlock} className={c.additional__input + " input"} value={block.name}
                                            onChange={(e) => changeInput(false, true, e, indexBlock)} ref={register}/>
                            </div>
                            {
                                block.text.map((text, indexText) => {
                                    return(
                                        <div className={c.additional__text} key={indexText}>
                                            <textarea name={"add_text_" + indexBlock + "_" + indexText} ref={register} className={c.additional__input + " input"} value={text}
                                                      onChange={(e) => changeInput(false, false, e, indexBlock, indexText)}/>
                                            <input type="hidden" ref={register} name={"add_text_count_" + indexBlock} value={block.text.length}/>
                                            <span className={c.additional__delete + " btn"} onClick={() => deleteText(indexBlock, indexText)}>Удалить</span>
                                        </div>
                                    );
                                })
                            }
                            <span className={c.additional__add + " btn"} onClick={() => addText(indexBlock)}>
                                Добавить абзац
                            </span>
                        </div>
                    );
                })
            }
            <span className={c.additional__add + " btn"} onClick={addBlock}>
                Добавить блок
            </span>
                </div>
        </div>
    );
}

export default Additional;