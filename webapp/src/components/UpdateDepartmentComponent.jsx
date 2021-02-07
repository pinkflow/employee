import React, {Component} from 'react';
import DepartmentService from "../DepartmentService/DepartmentService";

class UpdateDepartmentComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            department: ''
        }

        this.isSuccesful = true

        this.changeDepartment = this.changeDepartment.bind(this)

        this.saveDepartment = this.saveDepartment.bind(this)
    }

    changeDepartment = (event) => {
        let field = event.target.value
        this.setState({department: field})
    }

    saveDepartment = async (e) =>{
        e.preventDefault()
        let department = {
            department: this.state.department
        }
        try {
            await DepartmentService.createDepartment(department)
            this.props.history.push('/employees')
        } catch(err){
            this.isSuccesful = false
            this.forceUpdate()
        }
    }

    cancel() {
        this.props.history.push('/employees')
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3 bg-light">
                            <h3 className="text-center mt-3">Add department</h3>
                            {!this.isSuccesful ? <h4 className="text-center text-danger mt-3">Invalid data(may be this department already exists)</h4> : ""}
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Department<span className="text-danger">*</span>:</label>
                                        <input id="lastName" placeholder="Department" name="lastName"
                                               className="form-control"
                                               value={this.state.lastName} onChange={this.changeDepartment}/>
                                    </div>
                                    <button className="btn btn-dark" onClick={this.saveDepartment}>Save</button>
                                    <button className="btn btn-light" onClick={this.cancel.bind(this)}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateDepartmentComponent;