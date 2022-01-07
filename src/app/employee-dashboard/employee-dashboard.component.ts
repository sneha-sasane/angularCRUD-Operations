import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.module';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
 

  formValue !: FormGroup;
  employeeModelObj: EmployeeModel= new EmployeeModel();
  employeeData ! :any;
  showAdd!: boolean;
  showUpdate!:boolean;
  constructor(private formBuilder:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
            firstName: [''],
            email: [''],
            dob: [''],
            avatar: [''],
            Country: ['']
    })
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd= true;
    this.showUpdate= false;
  }

postEmployeeDetails(){
this.employeeModelObj.firstName=this.formValue.value.firstName;
this.employeeModelObj.email=this.formValue.value.email;
this.employeeModelObj.dob=this.formValue.value.dob;
this.employeeModelObj. avatar=this.formValue.value. avatar;
this.employeeModelObj.Country=this.formValue.value.Country;


this.api.postEmployee(this.employeeModelObj)
.subscribe(res=>{
  console.log(res);
  alert("Employee Added Successfully")
  let ref= document.getElementById('cancel')
  ref?.click();
  this.formValue.reset();
  this.getAllEmployee();
},
err=>{
  alert("something went wrong")
})
}

// get
getAllEmployee(){
  this.api.getEmployee().subscribe(res=>
    {
      this.employeeData = res;
    })
 
}

// delete
deleteEmployee(row: any){
  this.api. deleteEmployee(row.id)
  .subscribe(res=>{
  alert("Employee Deleted");
  this.getAllEmployee();
  })
}


onEdit(row: any){
  this.showAdd= false;
  this.showUpdate= true;
  this.employeeModelObj.id=row.id;
  this.formValue.controls['firstName'].setValue(row.firstName);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['dob'].setValue(row.dob);
  this.formValue.controls['avatar'].setValue(row. avatar);
  this.formValue.controls['Country'].setValue(row.Country);
}
updateEmployeeDetails(){
  this.employeeModelObj.firstName=this.formValue.value.firstName;
this.employeeModelObj.email=this.formValue.value.email;
this.employeeModelObj.dob=this.formValue.value.dob;
this.employeeModelObj.avatar=this.formValue.value.avatar;
this.employeeModelObj.Country=this.formValue.value.Country ;



this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
.subscribe(res=>{
  alert("updated success");
  let ref= document.getElementById('cancel')
  ref?.click();
  this.formValue.reset();
  this.getAllEmployee();
})

}
}


