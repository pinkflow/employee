import React, {Component} from 'react';
import EmployeeService from "../EmployeeService/EmployeeService";
import moment from "moment";
import DepartmentService from "../DepartmentService/DepartmentService";


class CreateEmployeeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            lastName: '',
            firstName: '',
            patronymic: '',
            job: '',
            birthday: '',
            phone: '',
            email: '',
            department: '',
            photo: '',
            departmentList: []
        }

        this.isValid = {
            lastName: true,
            firstName: true,
            patronymic: true,
            job: true,
            birthday: true,
            phone: true,
            email: true
        }

        this.isSuccesful = true

        this.changeLastName = this.changeLastName.bind(this)
        this.changeFirstName = this.changeFirstName.bind(this)
        this.changePatronymic = this.changePatronymic.bind(this)
        this.changeJob = this.changeJob.bind(this)
        this.changeBirthday = this.changeBirthday.bind(this)
        this.changePhone = this.changePhone.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changeDepartment = this.changeDepartment.bind(this)
        this.changePhoto = this.changePhoto.bind(this)

        this.saveEmployee = this.saveEmployee.bind(this)

    }

    async componentDidMount() {
        let depResp = await DepartmentService.getDepartments()
        let depList = depResp.data
        this.setState({departmentList: depList})
        this.setState({department: depList[0].department})
        if (this.state.id !== 'new') {
            try {
                let employeeResp = await EmployeeService.getEmployeeById(this.state.id)
                let employee = employeeResp.data
                this.setState({
                    lastName: employee.lastName || "",
                    firstName: employee.firstName || "",
                    patronymic: employee.patronymic || "",
                    job: employee.job || "",
                    birthday: moment(employee.birthday).format("DD/MM/YYYY") || "",
                    phone: employee.phone || "",
                    email: employee.email || "",
                    department: employee.department
                })
            } catch (err) {
            }
        }
    }

    saveEmployee = async (e) => {
        e.preventDefault();
        let employee = {
            lastName: this.state.lastName,
            firstName: this.state.firstName,
            patronymic: this.state.patronymic,
            job: this.state.job,
            birthday: moment(this.state.birthday, "DD/MM/YYYY"),
            phone: this.state.phone,
            email: this.state.email,
            department: this.state.department,
            photo: this.state.photo
        }
        if (Object.keys(this.isValid).every(field => {
            return this.isValid[field]
        })) {
            try {
                if (this.state.id === 'new') {
                    await EmployeeService.createEmployee(employee)
                    this.props.history.push('/employees')
                } else {
                    await EmployeeService.updateEmployee(employee, this.state.id)
                    this.props.history.push('/employees')
                }
            } catch (err) {
                this.isSuccesful = false
                this.forceUpdate()
            }
        }
    }

    cancel() {
        this.props.history.push('/employees')
    }

    getLabel() {
        if (this.state.id === "new") {
            return "Add employee"
        } else {
            return "Update employee"
        }
    }

    validate(field, regexp) {
        return regexp.test(field)
    }


    changeLastName = (event) => {
        let field = event.target.value
        this.setState({lastName: field})
        if (!this.validate(field, /^([А-Я][а-яё]{1,23}|[A-Z][a-z]{1,23})$/)) {
            this.isValid.lastName = false
            document.getElementById('lastName').classList.add("bg-danger")
        } else {
            this.isValid.lastName = true
            document.getElementById('lastName').classList.remove("bg-danger")
        }
    }

    changeFirstName = (event) => {
        let field = event.target.value
        this.setState({firstName: field})
        if (!this.validate(field, /^([А-Я][а-яё]{1,23}|[A-Z][a-z]{1,23})$/)) {
            this.isValid.firstName = false
            document.getElementById('firstName').classList.add("bg-danger")
        } else {
            this.isValid.firstName = true
            document.getElementById('firstName').classList.remove("bg-danger")
        }
    }


    changePatronymic = (event) => {
        let field = event.target.value
        this.setState({patronymic: field})
        if (!this.validate(field, /^(|[А-Я][а-яё]{1,23}|[A-Z][a-z]{1,23})$/)) {
            this.isValid.patronymic = false
            document.getElementById('patronymic').classList.add("bg-danger")
        } else {
            this.isValid.patronymic = true
            document.getElementById('patronymic').classList.remove("bg-danger")
        }
    }


    changeJob = (event) => {
        let field = event.target.value
        this.setState({job: field})
        if (!this.validate(field, /^[а-яА-ЯёЁa-zA-Z0-9]+$/)) {
            this.isValid.job = false
            document.getElementById('job').classList.add("bg-danger")
        } else {
            this.isValid.job = true
            document.getElementById('job').classList.remove("bg-danger")
        }
    }


    changeBirthday = (event) => {
        let field = event.target.value
        this.setState({birthday: field})
        if (!this.validate(field, /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/)){
            if (field !=="") {
                this.isValid.birthday = false
                document.getElementById('birthday').classList.add("bg-danger")
            } else{
                this.isValid.birthday = true
                document.getElementById('birthday').classList.remove("bg-danger")
            }
        } else {
            this.isValid.birthday = true
            document.getElementById('birthday').classList.remove("bg-danger")
        }
    }


    changePhone = (event) => {
        let field = event.target.value
        this.setState({phone: field})
        if (!this.validate(field, /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/)){
            this.isValid.phone = false
            document.getElementById('phone').classList.add("bg-danger")
        } else {
            this.isValid.phone = true
            document.getElementById('phone').classList.remove("bg-danger")
        }
    }

    changeEmail = (event) => {
        let field = event.target.value
        this.setState({email: field})
        if (!this.validate(field, /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            this.isValid.email = false
            document.getElementById('email').classList.add("bg-danger")
        } else {
            this.isValid.email = true
            document.getElementById('email').classList.remove("bg-danger")
        }
    }

    changePhoto = (event) => {
        event.preventDefault();
        this.setState({
            photo: event.target.files[0]
        });
    }


    changeDepartment = (event) => {
        this.setState({department: event.target.value})
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row mt-3 mb-3">
                        <div className="card col-md-6 offset-md-3 offset-md-3 bg-light">
                            <h3 className="text-center mt-3">{this.getLabel()}</h3>
                            {!this.isSuccesful ? <h4 className="text-center text-danger mt-3">Invalid data(maybe this employee already exists)</h4> : ""}
                            <div className="card-body">
                                <form encType="multipart/form-data">
                                    <div className="form-group">
                                        <label>Last name<span className="text-danger">*</span>:</label>
                                        <input id="lastName" placeholder="Last name" name="lastName"
                                               className="form-control"
                                               value={this.state.lastName} onChange={this.changeLastName}/>
                                    </div>
                                    <div className="form-group">
                                        <label>First name<span className="text-danger">*</span>:</label>
                                        <input id="firstName" placeholder="First name" name="firstName"
                                               className="form-control"
                                               value={this.state.firstName} onChange={this.changeFirstName}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Patronymic:</label>
                                        <input id="patronymic" placeholder="Patronymic" name="patronymic"
                                               className="form-control"
                                               value={this.state.patronymic} onChange={this.changePatronymic}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Job:</label>
                                        <input id="job" placeholder="Job" name="job" className="form-control"
                                               value={this.state.job} onChange={this.changeJob}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Date of birth:</label>
                                        <input id="birthday" placeholder="DD/MM/YYYY" name="birthday"
                                               className="form-control"
                                               value={this.state.birthday} onChange={this.changeBirthday}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone number<span className="text-danger">*</span>:</label>
                                        <input id="phone" placeholder="Phone number" name="phone"
                                               className="form-control"
                                               value={this.state.phone} onChange={this.changePhone}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email<span className="text-danger">*</span>:</label>
                                        <input id="email" placeholder="Email" name="email" className="form-control"
                                               value={this.state.email} onChange={this.changeEmail}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Department:</label>
                                        <select className="form-control" value={this.state.department} onChange ={this.changeDepartment}>
                                            {this.state.departmentList.map(department =>
                                                <option key={department.id}>{department.department}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input type="file" accept="image/png, image/jpeg" className="form-control-file" name="file" onChange={this.changePhoto}/>
                                    </div>
                                    <button className="btn btn-dark" onClick={this.saveEmployee}>Save</button>
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

export default CreateEmployeeComponent;