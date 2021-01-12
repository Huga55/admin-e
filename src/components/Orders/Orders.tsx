import React from "react";
import c from "./Orders.module.css";
import Order from "./Order/Order";

const Orders = () => {
    return(
        <div className={c.orders}>
            <Order />
        </div>
    );
}

export default Orders;