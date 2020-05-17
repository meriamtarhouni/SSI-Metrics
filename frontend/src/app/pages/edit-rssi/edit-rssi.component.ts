import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthRssiService } from 'src/app/auth-rssi.service';
import { FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-rssi',
  templateUrl: './edit-rssi.component.html',
  styleUrls: ['./edit-rssi.component.css']
})
export class EditRssiComponent implements OnInit {
 
  constructor(private route: ActivatedRoute, private rssiService: AuthRssiService, private router: Router) { }
 
  rssiId: string;
  rssi : any;

  hide = true;


  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.rssiId = params.rssiId;
        console.log(params.rssiId);
      }
    )

    this.rssi=this.rssiService.getRssiById(this.rssiId).subscribe((rssi: any) => {
      this.rssi=rssi[0];
      console.log(this.rssi);      
    })
   
  }
  onEditButtonClicked(nom : string,  raison: string,adresse : string,org : string,email : string,motivation:string){
    this.rssiService.updateRssi(this.rssiId,nom,raison,adresse,org,email,motivation).subscribe((res: HttpResponse<any>) => {
     
      console.log(res);
      
    });
  }
  onDeleteButtonClicked(){
    this.rssiService.deleteRssi(this.rssiId).subscribe((res: HttpResponse<any>) => {
     
      console.log(res);
      this.router.navigate(['/signup-rssi']);
    });

  }



}
