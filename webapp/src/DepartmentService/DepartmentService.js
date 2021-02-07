import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/department"

class DepartmentService {

    createDepartment(department) {
        return  axios.post(API_BASE_URL, department)
    }

    getDepartments(){
        return axios.get(API_BASE_URL)
    }

}

export default new DepartmentService()