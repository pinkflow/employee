package com.test.employee.department;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
@Validated
public class DepartmentController {

    private final DepartmentRepository departmentRepository;

    @Autowired
    public DepartmentController(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @PostMapping("/department")
    public ResponseEntity<Department> createDepartment(@RequestBody Department department){
        try {
            departmentRepository.save(department);
            return ResponseEntity.ok(department);
        } catch (DataIntegrityViolationException err){
            return ResponseEntity.badRequest().body(department);
        }
    }

    @GetMapping("/department")
    public List<Department> getDepartments(){
        return departmentRepository.findAll();
    }

}
