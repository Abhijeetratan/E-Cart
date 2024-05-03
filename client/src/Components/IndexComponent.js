import React from "react";
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom'
import Aboutus from "./aboutus";
import Contactus from "./contactus";
import Signup from "./SignupComponent";
import MainCompo from "./MainCompo";

export default class IndexComponent extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="nav nav-pills">
                    <Router>
                        <div className="nav-item">
                            <NavLink to = "/aboutus" className='nav-link'>Aboutus</NavLink>
                        </div>
                        <div className="nav-item">
                            <NavLink to = "/contactus" className='nav-link'>Contactus</NavLink>
                        </div>
                        <div className="nav-item">
                            <NavLink to = "/signup" className='nav-link'>Signup</NavLink>
                        </div>
                        <div className="nav-item">
                            <NavLink to = "/login" className='nav-link'>Login</NavLink>
                        </div>
                        <br/><br/>
                        <Routes>
                            <Route path="/aboutus" element={<Aboutus/>}></Route>
                            <Route path="/contactus" element={<Contactus/>}></Route>
                            <Route path="/signup" element={<Signup/>}></Route>
                            <Route path="/login" element={<MainCompo/>}></Route>
                        </Routes>
                    </Router>
                </div>
            </React.Fragment>
        )
    }
}