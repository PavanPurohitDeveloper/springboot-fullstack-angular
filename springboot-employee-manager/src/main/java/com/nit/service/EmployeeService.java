package com.nit.service;

import com.nit.model.Employee;

import java.util.List;

public interface EmployeeService {

    //creating a new employee
    Employee addEmployee(Employee employee);

    //Get List of all employees
    List<Employee> findAllEmployees();

    //Update the Employee
    Employee updateEmployee(Employee employee);

    //Delete the Employee
    void deleteEmployee(Long id);

    //Find Employee by Id
    Employee findEmployeeById(Long id);


}
