import React, {useEffect} from "react";
import './App.css';
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import {BrowserRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Auth from "./components/Auth/Auth";
import Spinner from "./components/Spinner/Spinner";
import {checkUser} from "./components/redux/app-reducer";

function App() {
    const { isReady, isAjax, isAuth } = useSelector( (state) => state.app);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUser());
    }, [])

    if(!isReady) {
        return <Spinner isWhite={true} />
    }

    if(!isAuth) {
        return <Auth />
    }

    return (
        <div className="App">
            <BrowserRouter>
                {isAjax? <Spinner isWhite={false} /> : ""}
                <Sidebar/>
                <Content/>
            </BrowserRouter>
        </div>
    );
}


export default App;
