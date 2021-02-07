import React, {Component} from 'react';
import EmployeeService from "../EmployeeService/EmployeeService";

class ViewEmployeeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }

        this.isFetched = true
    }

    async componentDidMount() {
        try {
            let res = await EmployeeService.getEmployeeById(this.state.id)
            res.data.photo = 'data:image/jpeg;base64,'+ res.data.photo
            this.setState({employee: res.data})
            this.forceUpdate()
        } catch (er){
            this.isFetched = false
            this.forceUpdate()
        }
    }

    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">Employee card</h3>
                    {this.isFetched ? <img className="card-img-top rounded" src={this.state.employee.photo} alt="Employee"/>:
                        (<div className="text-center">
                            <div className="ml-1 text-center center-top text-danger"><h4> Employee doesn't exist</h4></div>
                        </div>)}
                    <div className="card-body">
                        <div className="row">
                            <label>
                                Last name:
                            </label>
                            <div className="ml-1">{this.state.employee.lastName}</div>
                        </div>
                        <div className="row">
                            <label>
                                First name:
                            </label>
                            <div className="ml-1">{this.state.employee.firstName}</div>
                        </div>
                        <div className="row">
                            <label>
                                Patronymic:
                            </label>
                            <div className="ml-1">{this.state.employee.patronymic}</div>
                        </div>
                        <div className="row">
                            <label>
                                Job:
                            </label>
                            <div>{this.state.employee.job}</div>
                        </div>
                        <div className="row">
                            <label>
                                Date of birth:
                            </label>
                            <div className="ml-1">{this.state.employee.birthday}</div>
                        </div>
                        <div className="row">
                            <label>
                                Phone number:
                            </label>
                            <div className="ml-1">{this.state.employee.phone}</div>
                        </div>
                        <div className="row">
                            <label>
                                Email:
                            </label>
                            <div className="ml-1">{this.state.employee.email}</div>
                        </div>
                        <div className="row">
                            <label>
                                Phone number:
                            </label>
                            <div className="ml-1">{this.state.employee.department}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewEmployeeComponent;