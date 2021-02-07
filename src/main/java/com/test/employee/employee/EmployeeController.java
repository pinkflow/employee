package com.test.employee.employee;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.test.employee.exception.DataNotFoundException;
import com.test.employee.exception.DuplicateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
@Validated
public class EmployeeController {

    private final EmployeeRepository employeeRepository;


    @Autowired
    EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @PostMapping(value = "/employees", consumes = {"multipart/form-data"})
    public ResponseEntity<Employee> createEmployee(@RequestPart("employee") String employee, @RequestParam("photo") MultipartFile file) {
        try {
            Gson g = new Gson();
            JsonObject jsonObject =  JsonParser.parseString(employee).getAsJsonObject();
            Employee employeeToSave = g.fromJson(jsonObject, Employee.class);
            employeeToSave.setPhoto(file.getBytes());
            employeeRepository.save(employeeToSave);
            return ResponseEntity.ok(employeeToSave);
        } catch (DataIntegrityViolationException | IOException err) {
            throw new DuplicateException("Duplicate error");
        }
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("No employee with such id:" + id));
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee updatedEmployee) {
        Employee employee = employeeRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("No employee with such id:" + id));

        employee.setLastName(updatedEmployee.getLastName());
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setPatronymic(updatedEmployee.getPatronymic());
        employee.setJob(updatedEmployee.getJob());
        employee.setBirthday(updatedEmployee.getBirthday());
        employee.setEmail(updatedEmployee.getEmail());
        employee.setPhone(updatedEmployee.getPhone());

        employee = employeeRepository.save(employee);

        return ResponseEntity.ok(employee);
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("No employee with such id:" + id));
        employeeRepository.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
