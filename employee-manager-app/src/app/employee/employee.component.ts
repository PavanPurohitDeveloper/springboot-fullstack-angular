
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public employees: Employee[] = [];
  public editEmployee!: Employee;
  public deleteEmployee: Employee | null | undefined;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {

    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      }, //In case of error
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  /**
   * Add employee
   */
  public onAddEmployee(addForm: NgForm): void {

    document.getElementById('add-employee-form')?.click();

    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();//to clear the form
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();//to clear the form
      }
    );
  }

  /**
   * update employee
   */
  public onUpdateEmployee(employee: Employee): void {

    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /**
   * Delete employee
   */
  public onDeleteEmployee(employeeId: number): void {

    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees(); //to reload everything
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  /**
   * To open the bootstrap Modal when user click on Add or Edit or Delete open the respective Modal.
   * employee: Employee --> Add an employee or Edit an employee or Delete an employee
   * mode: string --If the mode is Add it opens the Add employee Mode, if the mode is Edit it opens the Edit Modal
   *                If the mode is Delete it opens the Delete modal.
   */
  public onOpenModal(employee: Employee, mode: string): void | null {

    //create this below button
    /**
     * <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>
     *
     */
    const container = document.getElementById('main-container');
    const button = document.createElement('button'); //by default type is submit so we have to change type to button.
    button.type = 'button';
    button.style.display = 'none';

    //set data-toggle="modal"
    button.setAttribute('data-toggle', 'modal');

    //user which button is going to click..
    //data-target="#exampleModal"  - this value is Id of the div class which changes dynamically
    //depedning upon which button they click we set the data-target dynamically with different values.
    //since it is referencing Id we use # symbol
    if (mode == 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode == 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode == 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();

  }

}
