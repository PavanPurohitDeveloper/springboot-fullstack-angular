import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  //rest end point URL.. that we are going to invoke
  private apiServerUrl = environment.apiBaseUrl;

  //Inject HttpClient inside a constructor
  constructor(private http: HttpClient) { }

  //Get All employees
  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }

  //add employee
  public addEmployee(emloyee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, emloyee);
  }

  //update employee
  public updateEmployee(emloyee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, emloyee);
  }

  //delete employee
  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }


}
