import { Component, OnInit, INJECTOR } from '@angular/core';
import { AuthRssiService } from 'src/app/auth-rssi.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConnectableObservable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { WarningComponent } from '../warning/warning.component';
declare var $: any;
@Component({
  selector: 'app-login-page-rssi',
  templateUrl: './login-page-rssi.component.html',
  styleUrls: ['./login-page-rssi.component.css']
})
export class LoginPageRssiComponent implements OnInit {
 
  rssi_id : string;
  hide = true;
  constructor(private authRssiService : AuthRssiService, private router: Router,public dialog: MatDialog) { }
 

  ngOnInit(): void {
  }

  onLoginButtonClicked(email : string,password: string){
    this.authRssiService.login(email, password).subscribe((res: HttpResponse<any>) => {
   
      if (res.status === 200) {
        // we have logged in successfully
        // console.log("Logged in");
        this.rssi_id =res.body._id;
        this.router.navigate(['/edit-rssi',this.rssi_id]);
		
		//console.log(localStorage.getItem('rssi-id'));
		//console.log(localStorage.getItem('x-access-token'));
		//console.log(localStorage.getItem('x-refresh-token'));
      }
      
    },
    (err :HttpErrorResponse) => { if(err.status===400){console.log("Not Logged In"); 
      
        const dialogRef = this.dialog.open(WarningComponent,{
          height: '300px',
          width: '500px',
        });

      }}
    );
  }
  
  
  

  }

