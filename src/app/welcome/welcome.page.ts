import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { DataService } from '../data.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  @ViewChild('code', { static: false }) codeInput!: IonInput;
   foundCode: boolean = true;
   error: boolean = false;
   lengthMax : boolean = false;
  constructor(private router: Router,private dataService:DataService) { 
    
  }

  ngOnInit() {
    this.ValidityCode();
  }

  RegisterCode(event: any){
    const code = event.target.value;
    if(code.length >= 9){
        this.dataService.Sync(code).subscribe(data => { 
        localStorage.setItem('code', code)
        this.Redirect()
      },error => this.error=true);
    }else{
      this.error=false;
    }
  }
  ValidityCode(){
    if(localStorage.getItem("code") == null || localStorage.getItem("code") == "null"){
      this.foundCode = false;
    }else{
      const attendanceData = localStorage.getItem("attendance");
      const parsedAttendanceData = attendanceData ? JSON.parse(attendanceData) : [];
      console.log(parsedAttendanceData);
      this.Redirect()
    }
  }

 Redirect(){
    
    this.dataService.Sync(localStorage.getItem("code")).subscribe(async data => { 
      this.foundCode = true;
      const attendance = data.attendance
      const user = data.user
      const subscriptions = data.subscriptions
      const customer = data.customer
      customer.url_img  = customer.url_img == null ? this.dataService.url+"customers/img/logo.png":this.dataService.url+"customers/img/"+customer.url_img; 
      localStorage.setItem('attendance', JSON.stringify(attendance));
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('customer', JSON.stringify(customer));

       setTimeout(() => {
         this.router.navigate(['/tabs'], { replaceUrl: true });
       }, 1000);
    },error => {
      this.error=true;
      this.router.navigate(['/tabs'], { replaceUrl: true });
    });
    
  }
  async saveImg(url:string){
    await fetch(url)
    .then(response => response.blob())
    .then(async blob => {
      const reader = new FileReader();
      reader.onloadend = function() {
        const base64String = reader.result;
        localStorage.setItem('logo', base64String+"");
        
      };
       reader.readAsDataURL(blob);
    })
    .catch(error => {
      console.error("Error al obtener el archivo:", error);
    });
  }
}
