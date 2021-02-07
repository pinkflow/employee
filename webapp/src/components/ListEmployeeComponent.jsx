import React, {Component} from 'react';
import EmployeeService from "../EmployeeService/EmployeeService";
import moment from "moment";
import XLSX from 'xlsx'

class ListEmployeeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            employees: [],
        }

        this.initialData = []

        this.sorted = {
            'lastName': true,
            'job': true
        }

        this.updateEmployee = this.updateEmployee.bind(this)
        this.deleteEmployee = this.deleteEmployee.bind(this)
        this.exportSheet = this.exportSheet.bind(this)
    }

    updateEmployee(id) {
        this.props.history.push(`update/${id}`)
    }

    sort(type) {
        const isSorted = this.sorted[type];
        let direction = isSorted ? 1 : -1;

        let data = [...this.state.employees]

        const sorted = data.sort((a, b) => {
            if (a[type].toLowerCase() === b[type].toLowerCase()) {
                return 0;
            }
            return a[type].toLowerCase() > b[type].toLowerCase() ? direction : direction * -1;
        });

        this.sorted[type] = !isSorted
        this.setState({employees: sorted})
    }


    async deleteEmployee(id) {
        await EmployeeService.deleteEmployee(id)
        this.setState({employees: this.state.employees.filter(employee => employee.id !== id)})
    }

    viewEmployee(id) {
        this.props.history.push(`view/${id}`)
    }

    exportSheet() {
        let employees = this.state.employees.map(employee => {
            return {
                lastName: employee.lastName,
                firstName: employee.firstName,
                patronymic: employee.patronymic,
                job: employee.job,
                birthday: employee.birthday,
                phone: employee.phone,
                email: employee.email,
                department: employee.department
            }
        })
        let sheet = XLSX.utils.json_to_sheet([...employees]);
        let workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, sheet, 'Employees')
        XLSX.writeFile(workbook, 'Employees.xlsx');
    }

    async componentDidMount() {
        let res = await EmployeeService.getEmployees()
        this.setState({employees: res.data})
        this.initialData = res.data
    }

    filterLastName = (event) => {
        let data = this.initialData
        const value = event.target.value.toLowerCase();
        const filtered = data.filter(employee => {
            return employee.lastName.toLowerCase().includes(value);
        });
        this.setState({employees: filtered})
    }

    filterFirstName = (event) => {
        let data = this.initialData
        const value = event.target.value.toLowerCase();
        const filtered = data.filter(employee => {
            return employee.firstName.toLowerCase().includes(value);
        });
        this.setState({employees: filtered})
    }

    filterPatronymic = (event) => {
        let data = this.initialData
        const value = event.target.value.toLowerCase();
        const filtered = data.filter(employee => {
            return employee.patronymic.toLowerCase().includes(value);
        });
        this.setState({employees: filtered})
    }


    filterJob = (event) => {
        let data = this.initialData
        const value = event.target.value.toLowerCase();
        const filtered = data.filter(employee => {
            return employee.job.toLowerCase().includes(value);
        });
        this.setState({employees: filtered})
    }

    filterDepartment = (event) => {
        let data = this.initialData
        const value = event.target.value.toLowerCase();
        const filtered = data.filter(employee => {
            return employee.department.toLowerCase().includes(value);
        });
        this.setState({employees: filtered})
    }

    render() {
        return (
            <div className="w-100">
                <h2 className="text-center" onClick={() => this.exportSheet()}>Employees</h2>
                <div className="row mt-3 m-lg-n5">
                    <table className="table table-xl table-striped table-dark table-responsive">
                        <thead className="thead-light">
                        <tr>
                            <th><span role="button" onClick={() => this.sort('lastName')}>Last name</span></th>
                            <th> First name</th>
                            <th> Patronymic</th>
                            <th><span role="button" onClick={() => this.sort('job')}>Job</span></th>
                            <th>Date of birth</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th> Department</th>
                            <th> <button onClick={() => this.exportSheet()}
                                                      className="btn btn-primary">Download excel
                            </button> </th>
                            <th/>
                            <th/>
                        </tr>
                        <tr>
                            <th><input className="form-control" placeholder="Search" onChange={this.filterLastName}/>
                            </th>
                            <th><input className="form-control" placeholder="Search"
                                       onChange={this.filterFirstName}/>
                            </th>
                            <th><input className="form-control" placeholder="Search"
                                       onChange={this.filterPatronymic}/>
                            </th>
                            <th><input className="form-control" placeholder="Search" onChange={this.filterJob}/></th>
                            <th/>
                            <th/>
                            <th/>
                            <th><input className="form-control" placeholder="Search"
                                       onChange={this.filterDepartment}/>
                            </th>
                            <th/>
                            <th/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.employees.map(
                            employee =>
                                <tr key={employee.id}>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.patronymic}</td>
                                    <td>{employee.job}</td>
                                    <td>{employee.birthday !== null ? moment(new Date(employee.birthday)).format("DD/MM/YYYY") : ""}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.department}</td>
                                    <td>
                                        <button onClick={() => this.viewEmployee(employee.id)}
                                                className="btn btn-outline-info">View
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.updateEmployee(employee.id)}
                                                className="btn btn-outline-light">Update
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.deleteEmployee(employee.id)}
                                                className="btn btn-outline-danger">Delete
                                        </button>
                                    </td>
                                </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;