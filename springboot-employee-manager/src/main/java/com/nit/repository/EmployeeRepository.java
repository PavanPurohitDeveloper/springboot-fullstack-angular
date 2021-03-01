package com.nit.repository;

import com.nit.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    //This is query method in spring
    //void deleteEmployeeById(Long id);

    //query method in spring
    Optional<Employee> findEmployeeById(Long id);
}
