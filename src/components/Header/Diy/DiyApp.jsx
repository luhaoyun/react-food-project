import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Layout from "./components/Layout";
import { Provider } from "react-redux";
import store from './store'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import FoodPage from './pages/FoodPage'
import classes from "./DiyApp.module.css";


const diyRoot = document.getElementById('diy-root');


const DiyApp = (props) => {

    return ReactDOM.createPortal(

        <div className={classes.Diy}>
            <div className={classes.Close}>
                <FontAwesomeIcon
                    onClick={() => props.onHide()}
                    icon={faXmark} />
            </div>
            <div className={classes.Table}>
                <Provider store={store}>
                    <Router>
                        <Layout>
                            <Routes>
                                <Route path="/" element={< HomePage />} />
                                <Route path="/users" element={<AuthPage />} />
                                <Route path="/foods" element={<FoodPage />} />
                            </Routes>
                        </Layout>
                    </Router>
                </Provider>
            </div>
        </div>
        ,
        diyRoot);

}

export default DiyApp
