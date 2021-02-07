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
                                    <a className={"nav-link "+this.activeLink('/employees')} onClick={this.employees.bind(this)}>List</a>
                                </li>
                                <li className="nav-item">
                                    <a className={"nav-link "+this.activeLink('/update/new')} onClick={this.update.bind(this)}>Add</a>
                                </li>
                                <li className="nav-item">
                                    <a className={"nav-link "+this.activeLink('/department/add')} onClick={this.department.bind(this)}>Department</a>
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