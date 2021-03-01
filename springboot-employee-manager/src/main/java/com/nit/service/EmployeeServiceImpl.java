package com.nit.service;

import com.nit.exception.UserNotFoundException;
import com.nit.model.Employee;
import com.nit.repository.EmployeeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class EmployeeServiceImpl implements EmployeeService{

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Employee addEmployee(Employee employee) {
        log.info("Saving Employee..{}", employee.toString());
        employee.setEmployeeCode(UUID.randomUUID().toString());
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> findAllEmployees() {
        log.info("Retriving All the Employees from Employee table..");
        return employeeRepository.findAll();
    }

    @Override
    public Employee updateEmployee(Employee employee) {
        log.info("Updating the Employee..{}", employee.toString());
        return employeeRepository.save(employee);
    }

    @Override
    public void deleteEmployee(Long id) {
        log.info("Deleting the Employee for Employee Id..{}", id );
        employeeRepository.deleteById(id);
    }

    @Override
    public Employee findEmployeeById(Long id) {
        log.info("Get the Employee details By Employee Id..{}", id );
        //If employee is not found then it throw an exception.
        return employeeRepository.findEmployeeById(id)
                .orElseThrow( () -> new UserNotFoundException("User by id "+ id + " was not found"));
    }


}
