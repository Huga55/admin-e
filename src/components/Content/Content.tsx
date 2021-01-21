import React from "react";
import c from "./Content.module.css";
import { Route } from "react-router-dom";
import Users from "../Users/Users";
import Info from "../Info/Info";
import Orders from "../Orders/Orders";
import Order from "../Orders/Order/Order";
import Main from "../Main/Main";
import Page from "../Page/Page";

const Content = () => {
    return(
        <div className={c.content}>
            <div className={c.content__container}>
                <Route exact path="/" render={() => <Main />} />
                <Route path="/users" render={() => <Users />}/>
                <Route path="/orders" render={() => <Orders userId={null}/>}/>
                <Route path="/user/:id" render={() => <Info />} />
                <Route path="/order/:id" render={() => <Order type="info" />} />
                <Route path="/page" render={() => <Page />} />
            </div>
        </div>
    );
}

export default Content;