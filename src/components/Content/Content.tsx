import React from "react";
import c from "./Content.module.css";
import { Route } from "react-router-dom";
import Users from "../Users/Users";

const Content = () => {
    return(
        <div className={c.content}>
            <div className={c.content__container}>
                <Route path="/users" render={() => <Users />}/>
                <Route path="/orders" render={() => <div>Orders</div>}/>
                <Route path="/page" render={() => <div>Page</div>}/>
            </div>
        </div>
    );
}

export default Content;