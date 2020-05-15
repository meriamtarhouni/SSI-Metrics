import { Component, OnInit, INJECTOR } from '@angular/core';
import { AuthRssiService } from 'src/app/auth-rssi.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConnectableObservable } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-login-page-rssi',
  templateUrl: './login-page-rssi.component.html',
  styleUrls: ['./login-page-rssi.component.css']
})
export class LoginPageRssiComponent implements OnInit {
 
  rssi_id : string;
  hide = true;
  constructor(private authRssiService : AuthRssiService, private router: Router) { }
 
 
  showNotification(from, align){
    const type = 'danger'
    $.notify({
        icon: "notifications",
        message: "<b>Connexion impossible</b> <br/> Veuillez vérifier vos coordonnées <br/>"

    },{
        type: type,
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">block</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}
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
        this.showNotification('top','right');
      }}
    );
  }
  
  
  

  }

