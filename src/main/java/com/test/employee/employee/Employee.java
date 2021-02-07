package com.test.employee.employee;


import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Date;

@Entity
@Table(name="employees", uniqueConstraints = {@UniqueConstraint(columnNames = {"last_name", "first_name", "patronymic", "birthday"})})
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @NotEmpty
    @Column(name="last_name", nullable = false)
    private String lastName;

    @NotEmpty
    @Column(name="first_name", nullable = false)
    private String firstName;

    @Column(name="patronymic")
    private String patronymic;

    @Column(name="job")
    private String job;

    @Column(name="birthday")
    private Date birthday;

    @NotEmpty
    @Column(name="phone", nullable = false)
    private String phone;

    @NotEmpty
    @Column(name= "email",nullable = false)
    private String email;

    @Column(name="department")
    private String department;

    @Column(name="photo")
    @Lob
    private byte[] photo;



    public Employee(){

    }

    public Employee(String lastName, String firstName, String patronymic, String post, Date birthday, String phone, String email, String department, byte[] photo) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.patronymic = patronymic;
        this.job = post;
        this.birthday = birthday;
        this.phone = phone;
        this.email = email;
        this.department = department;
        this.photo = photo;
    }
    public Employee(String lastName, String firstName, String patronymic, String post, Date birthday, String phone, String email, String department) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.patronymic = patronymic;
        this.job = post;
        this.birthday = birthday;
        this.phone = phone;
        this.email = email;
        this.department = department;
    }


    public long getId() {
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getPatronymic() {
        return patronymic;
    }

    public void setPatronymic(String patronymic) {
        this.patronymic = patronymic;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String post) {
        this.job = post;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }


}
