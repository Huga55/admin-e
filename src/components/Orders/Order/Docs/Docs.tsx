import React from "react";
import c from "./Docs.module.css";

type PropsType = any;

const Docs: React.FC<PropsType> = (props) => {
    return(
        <div className={c.docs}>
            Docs
        </div>
    );
}

export default Docs;