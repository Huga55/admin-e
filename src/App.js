import React from "react";
import './App.css';
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <>
                <BrowserRouter>
                    <Sidebar/>
                    <Content/>
                </BrowserRouter>
            </>
        </div>
    );
}

export default App;
