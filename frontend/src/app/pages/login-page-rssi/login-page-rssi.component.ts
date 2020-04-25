import { Component, OnInit, INJECTOR } from '@angular/core';
import { AuthRssiService } from 'src/app/auth-rssi.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login-page-rssi',
  templateUrl: './login-page-rssi.component.html',
  styleUrls: ['./login-page-rssi.component.css']
})
export class LoginPageRssiComponent implements OnInit {

  constructor(private authRssiService : AuthRssiService) { }

  ngOnInit(): void {
  }

  onLoginButtonClicked(email : string,password: string){
    this.authRssiService.login(email, password).subscribe((res: HttpResponse<any>) => {
   
      if (res.status === 200) {
        // we have logged in successfully
        console.log("Logged in");
      }
      console.log(res);
      
    },
    (err :HttpErrorResponse) => { if(err.status===400){console.log("Not Logged In"); }}
    );
  }
  
  
  

  }

