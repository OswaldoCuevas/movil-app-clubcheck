import { Component, OnInit } from '@angular/core';
import { Subscription } from '../interface/subscription.interface';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  subscriptions !: Array<any>;
  constructor(private dataService:DataService) {}
  ngOnInit(): void {
  this.setSubscriptions();
  }
  setSubscriptions(){
    const subscriptions_storage = localStorage.getItem("subscriptions")
    if(subscriptions_storage){
      const json = JSON.parse(subscriptions_storage);
      const subscriptions =json.map( (data: Subscription) => 
      {
        data["days_remaining"]=this.diasRestantes(new Date(), new Date(data.ending_date));
        return data
      })
      this.subscriptions =subscriptions;
    }
    
  }
  diasRestantes(fechaInicio: Date, fechaFin: Date): number {
    const fechaInicioMs = fechaInicio.getTime();
  const fechaFinMs = fechaFin.getTime();

  // Calcular la diferencia en milisegundos
  const diferenciaMs = fechaFinMs - fechaInicioMs;

  // Calcular los días restantes
  const diasRestantes = Math.ceil(diferenciaMs / (24 * 60 * 60 * 1000));

  return diasRestantes;
  }
  date(date:any){
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre","Diciembre"];
    const splitDate = date.split("T");
    date = splitDate[0].split("-");
    const year =  date[0];
    const month:number =  date[1];
    const day =  date[2];
   return ""+day+" de "+ months[month-1] + " del " + year;
 }
 handleRefresh(event:any) {

  this.dataService.Sync(localStorage.getItem("code")).subscribe(async data => { 
    const attendance = data.attendance
    const user = data.user
    const subscriptions = data.subscriptions
    const customer = data.customer
    localStorage.setItem('attendance', JSON.stringify(attendance));
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('customer', JSON.stringify(customer));
    const img = customer.url_img == null ? "http://localhost:3000/api/customers/img/logo.png":"http://localhost:3000/api/customers/img/"+customer.url_img; 
    await this.saveImg(img);
    this.setSubscriptions();
    event.target.complete();
 
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
