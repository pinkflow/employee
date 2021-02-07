import React from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import UpdateEmployeeComponent from "./components/UpdateEmployeeComponent";
import ViewEmployeeComponent from "./components/ViewEmployeeComponent";
import UpdateDepartmentComponent from "./components/UpdateDepartmentComponent";

function App() {
    return (
        <div>
            <Router>
                <div className="d-flex flex-column justify-content-start height100">
                <Route Path="/" component={HeaderComponent}/>
                <div>
                    <div className="container mt-5">
                        <Switch>
                            <Route path="/" exact component={ListEmployeeComponent}/>
                            <Route path="/employees" exact component={ListEmployeeComponent}/>
                            <Route path="/update/:id" component={UpdateEmployeeComponent}/>
                            <Route path="/department/add" component={UpdateDepartmentComponent}/>
                            <Route path="/view/:id" component={ViewEmployeeComponent}/>
                        </Switch>
                    </div>
                </div>
                </div>
                <Route Path="/" component={FooterComponent}/>
            </Router>
        </div>
    );
}

export default App;
