import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/employees"

class EmployeeService {

    async getEmployees() {
       return axios.get(API_BASE_URL).catch(err => console.log(err))
    }

    async createEmployee(employee){
        try {
            let formData = new FormData();
            let employeeToPost = {
                lastName: employee.lastName,
                firstName: employee.firstName,
                patronymic: employee.patronymic,
                job: employee.job,
                birthday: employee.birthday == null ? "": employee.birthday,
                phone: employee.phone,
                email: employee.email,
                department: employee.department
            }
            formData.append("employee", JSON.stringify(employeeToPost))
            formData.append("photo", employee.photo)
            await axios.post(API_BASE_URL, formData, {
                headers: {
                    'Content-Type': 'undefined'
                }
            })
        } catch (err){
            throw Error("Can't save employee");
        }
    }

    getEmployeeById(employeeId){
        return axios.get(API_BASE_URL + "/" + employeeId).catch(err => {
            if(err.response.status === 404){
                throw new Error(`Employee not found`)
            }
        })
    }

    async updateEmployee(employee, employeeId){
        let res = await axios.put(API_BASE_URL + "/" + employeeId, employee).catch(err => err)
        console.log(res)
    }

    deleteEmployee(emloyeeId){
        return axios.delete(API_BASE_URL + "/" + emloyeeId)
    }

}

export default new EmployeeService()