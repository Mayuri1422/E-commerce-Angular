import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/home/services/user/user-service.service';
import { loginToken, loginUser } from 'src/app/home/types/user.type';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  userLoginForm: FormGroup;
  alertMessage: string = '';
  alertType: number = 0;//0-success,1-warning,2-error

  constructor(private fb: FormBuilder, private userService: UserService,private location:Location) { }

  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required,],
    }
    );
  }

  get email(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('password');
  }

  onSubmit(): void {
    this.userService.login(this.email?.value, this.password?.value,).subscribe(
      {
        next: (result: loginToken) => {
          result.user.email=this.email?.value
          this.userService.activateToken(result);
          this.alertType = 0;
          this.alertMessage = 'Login Succesful.';
          setTimeout(()=>{
            this.location.back();
          })
        },
        error: (error) => {
          this.alertMessage = error.error.message;
          this.alertType = 2;
        }
      },
    );
  }
}
