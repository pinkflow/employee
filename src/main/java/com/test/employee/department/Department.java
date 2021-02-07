package com.test.employee.department;
import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.security.PublicKey;

@Entity
@Table(name="departments",uniqueConstraints = {@UniqueConstraint(columnNames = {"department"})})
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Column(name="department", nullable = false)
    private String department;

    public Department(){

    }

    public Department(String department){
        this.department = department;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}
