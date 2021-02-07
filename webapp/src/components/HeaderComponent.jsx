import React, {Component} from 'react';


class HeaderComponent extends Component {

    activeLink = (href) =>{
        if(href === this.props.location.pathname){
            return "active"
        } else {
            return ""
        }
    }

    employees() {
        this.props.history.push('/employees')
    }
    update() {
        this.props.history.push('/update/new')
    }

    department() {
        this.props.history.push('/department/add')
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="/">Employees</a>
                        <div>
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <span className={"nav-link cursor-pointer "+this.activeLink('/employees')} onClick={this.employees.bind(this)}>List</span>
                                </li>
                                <li className="nav-item">
                                    <span className={"nav-link cursor-pointer "+this.activeLink('/update/new')} onClick={this.update.bind(this)}>Add</span>
                                </li>
                                <li className="nav-item">
                                    <span className={"nav-link cursor-pointer "+this.activeLink('/department/add')} onClick={this.department.bind(this)}>Department</span>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;