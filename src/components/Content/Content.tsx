import React from "react";
import c from "./Content.module.css";
import { Route } from "react-router-dom";
import Users from "../Users/Users";
import Info from "../Info/Info";
import Orders from "../Orders/Orders";

const Content = () => {
    return(
        <div className={c.content}>
            <div className={c.content__container}>
                <Route path="/users" render={() => <Users />}/>
                <Route path="/orders" render={() => <Orders />}/>
                <Route path="/page" render={() => <div>Page</div>}/>
                <Route path="/user/1" render={() => <Info />} />
            </div>
        </div>
    );
}

export default Content;