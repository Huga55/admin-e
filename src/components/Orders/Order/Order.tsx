import React from "react";
import c from "./Order.module.css";

const Order = () => {
    return (
        <div className={c.order}>
            <div className={c.order__top}>
                <div className={`${c.order__block} ${c["order__dostavista-id"]}`}>
                    Dostavista id
                </div>
                <div className={`${c.order__block} ${c.order__cargo}`}>
                    Name cargo
                </div>
                <div className={`${c.order__block} ${c.order__type}`}>
                    Order type
                </div>
            </div>
            <div className={c.order__bottom}>
                <div className={`${c.order__block} ${c.order__from}`}>
                    <div className={c.order__address}>
                        Address
                    </div>
                    <div className={c.order__name}>
                        Name user
                    </div>
                    <div className={c.order__phone}>
                        Name phone
                    </div>
                </div>
                <div className={`${c.order__block} ${c.order__to}`}>
                    <div className={c.order__addressS}>
                        Address
                    </div>
                    <div className={c.order__name}>
                        Name user
                    </div>
                    <div className={c.order__phone}>
                        Name phone
                    </div>
                </div>
                <div className={`${c.order__block} ${c.order__status}`}>
                    Status
                </div>
                <div className={`${c.order__block} ${c.order__document}`}>
                    Count of documents
                </div>
            </div>
        </div>
    );
}

export default Order;