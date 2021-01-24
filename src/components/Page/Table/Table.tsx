import React, {useEffect, useState} from "react";
import c from "./Table.module.css";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {DataTableType} from "../Page";
import {useFormContext} from "react-hook-form";

const Table = () => {
    const [table, setTable] = useState<null | DataTableType>(null);

    const { register } = useFormContext();

    const tableData = useSelector((state: AppStateType) => state.page.table);

    useEffect(() => {
        setTable(tableData);
    }, [tableData]);

    const addRow = () => {
        setTable(table? {
            title: table.title,
            head: [...table.head, ""],
            body: table.body.map((arr) => [...arr, ""]),
        } : null);
    }

    const deleteRow = (rowIndex: number) => {
        setTable(table? {
            title: table.title,
            head: table.head,
            body: table.body.filter((row, index) => index !== rowIndex),
        } : null);
    }

    const addColumn = () => {
        setTable(table? {
            title: table.title,
            head: table.head,
            body: [...table.body, Array.from(table.head, (row) => "")],
        } : null);
    }

    const deleteColumn = (columnIndex: number) => {
        setTable(table? {
            title: table.title,
            head: table.head.filter((h, index) => index !== columnIndex),
            body: table.body.map((arr, index) => arr.filter((str, strIndex) => strIndex !== (arr.length - 1) )),
        } : null);
    }

    const moveUp = (rowIndex: number) => {
        setTable(table? {
            title: table.title,
            head: table.head,
            body: table.body.map((arr, index) => {
                if(index === rowIndex) {
                    return table.body[rowIndex - 1];
                }
                if(index === rowIndex - 1) {
                    return table.body[rowIndex];
                }
                return arr;
            } ),
        } : null);
    }

    const moveDown = (rowIndex: number) => {
        setTable(table? {
            title: table.title,
            head: table.head,
            body: table.body.map((arr, index) => {
                if(index === rowIndex) {
                    return table.body[rowIndex + 1];
                }
                if(index === rowIndex + 1) {
                    return table.body[rowIndex];
                }
                return arr;
            } ),
        } : null);
    }

    const moveRight = (columnIndex: number) => {
        setTable(table? {
            title: table.title,
            head: table.head.map((h, index) => {
                if(columnIndex === index) {
                    return table.head[columnIndex + 1];
                }
                if(index === columnIndex + 1) {
                    return table.head[columnIndex];
                }
                return h;
            }),
            body: table.body.map((arr, index) => {
                return arr.map((str, strIndex) => {
                    if(columnIndex === strIndex) {
                        return arr[strIndex + 1];
                    }
                    if(strIndex === columnIndex + 1) {
                        return arr[columnIndex];
                    }
                    return str;
                })
            } ),
        } : null);
    }

    const moveLeft = (columnIndex: number) => {
        setTable(table? {
            title: table.title,
            head: table.head.map((h, index) => {
                if(columnIndex === index) {
                    return table.head[columnIndex - 1];
                }
                if(index === columnIndex - 1) {
                    return table.head[columnIndex];
                }
                return h;
            }),
            body: table.body.map((arr, index) => {
                return arr.map((str, strIndex) => {
                    if(columnIndex === strIndex) {
                        return arr[strIndex - 1];
                    }
                    if(strIndex === columnIndex - 1) {
                        return arr[columnIndex];
                    }
                    return str;
                })
                return arr;
            } ),
        } : null);
    }

    const changeInput = (indexBlock: number, isTitle: boolean, isSubtitle: boolean, e: any, indexTd = 0,) => {
        const value = e.currentTarget.value;
        setTable(table? {
            title: isTitle? value : table.title,
            head: isSubtitle? table.head.map((h, index) => index === indexBlock? value : h) : table.head,
            body: isTitle || isSubtitle? table.body : table.body.map((arr, arrIndex) => {
                if(arrIndex === indexBlock) {
                    return arr.map((str, strIndex) => strIndex === indexTd? value : str);
                }
                return arr;
            }),
        } : null);
    }

    return(
        <div className={c.table}>
            <div className={c.table__title}>
                Изменение таблицы
            </div>
            <div className={c.table__subtitle}>
                <input name="table_title" ref={register} value={table?.title} className={c.table__input + " input"}
                       onChange={(e) => changeInput(0, true, false, e)}/>
            </div>
            <table className={c.table__table}>
                <thead>
                <tr>
                    {
                        table?.head?.map((h, index) => {
                            return <th key={index}><input ref={register} className={c.table__td + " input"} name={"th-" + index} value={h}
                                            onChange={(e) => changeInput(index, false, true, e)}/>
                                <input type="hidden" ref={register} name="column_count" value={table?.head.length}/></th>;
                        })
                    }
                    <td className={`${c.table__add} btn`}
                            onClick={addRow}>
                        Добавить
                    </td>
                </tr>
                </thead>
                <tbody>
                {
                    table?.body?.map((row, rowIndex) => {
                        return(
                            <tr key={rowIndex}>
                                {
                                    row.map((td, tdIndex) => {
                                        return <td key={tdIndex}><input ref={register} className={c.table__td + " input"} name={"td-" + rowIndex + "-" + tdIndex} value={td}
                                                                    onChange={(e) => changeInput(rowIndex, false, false, e, tdIndex)}/><input
                                            type="hidden" ref={register} name="row_count" value={table?.body.length}/></td>;
                                    })
                                }
                                <td className={c.table__right}>
                                    <span className={`${c.table__delete} btn`}
                                            onClick={(e) => deleteRow(rowIndex)}>
                                        Удалить
                                    </span>
                                    <div className={c.table__move}>
                                        {
                                            rowIndex > 0 ?
                                                <div className={`${c.table__up} ${c.table__direction}`}
                                                     onClick={() => moveUp(rowIndex)}>
                                                    &uarr;
                                                </div> : ""
                                        }
                                        {
                                            rowIndex < table.body.length - 1 ?
                                                <div className={`${c.table__down} ${c.table__direction}`}
                                                     onClick={() => moveDown(rowIndex)}>
                                                    &darr;
                                                </div> : ""
                                        }
                                    </div>
                                </td>
                            </tr>
                        );
                    })
                }
                <tr>
                    {
                        table?.head?.map((d, index) => {
                            if(index > 0) {
                                return (
                                    <td key={index}>
                                        <span className={c.table__delete + " btn"} onClick={(e) => deleteColumn(index)}>Удалить</span>
                                        <div className={c.table__bot}>
                                            {
                                                index > 1 ?
                                                    <div className={`${c.table__up} ${c.table__direction}`}
                                                         onClick={() => moveLeft(index)}>
                                                        &#8592;
                                                    </div> : ""
                                            }
                                            {
                                                index < table.head.length - 1?
                                                    <div className={`${c.table__down} ${c.table__direction}`}
                                                         onClick={() => moveRight(index)}>
                                                        &#8594;
                                                    </div> : ""
                                            }
                                        </div>
                                    </td>
                                );
                            }else {
                                return (
                                    <td key={index} className={c.table__irregular}>
                                        <span className={`${c.table__add} btn`} onClick={addColumn}>Добавить</span>
                                    </td>
                                );
                            }

                        })
                    }
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Table;