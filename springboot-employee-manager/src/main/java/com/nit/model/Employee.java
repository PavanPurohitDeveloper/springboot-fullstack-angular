package com.nit.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.io.Serializable;

/**
 * Serializable - means helps transform this java class into different types of streams, because this class is
 * going to save in database. and its going to sent to frontend as JSON.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "employee")
public class Employee implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false) //we can never be updated in database.
    private Long id;

    private String empName;
    private String email;
    private String jobTitle;
    private String phoneNo;
    private String imageUrl;

    @Column(nullable = false, updatable = false)  //we can never be updated in database.
    private String employeeCode;


}
