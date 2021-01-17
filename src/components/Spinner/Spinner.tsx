import React from "react";
import c from "./Spinner.module.css";

type PropsType = {
    isWhite: boolean
}

const Spinner: React.FC<PropsType> = (props) => {
    const { isWhite } = props;

    return(
        <div className={isWhite? `${c.spinner} ${c.spinner_white}` : c.spinner}>
            <span className={c.spinner__load} />
        </div>
    );
}

export default Spinner;