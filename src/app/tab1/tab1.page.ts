import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, IonModal } from '@ionic/angular';
import { NotificationService } from '../notification.service';
import {  LocalNotifications,LocalNotificationSchema } from '@capacitor/local-notifications';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";
import { Customer } from '../interface/customer.interface';
import { DataService } from '../data.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild(IonModal) modal !: IonModal;
  @ViewChild('name', { static: false }) nameInput!: IonInput;
  chartOptions!: ChartOptions;
  name !: string;
  customer !: string;
  user !: string;
  isToastOpen = false;
  codeValidity = true;
  
  constructor(private router: Router,private dataService:DataService ,private notificationService:NotificationService) {
    this.chartOptions = {
      series: [
        {
          name: "Porcentaje de usuarios",
          data: [31, 40, 28, 51, 42, 109, 100,432,434,234,423,32,334,34,100,0,0,32]
          
        },
      

      ],
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        tickAmount: 3,
        labels: {
          rotate: 0},
        categories: [
          "05:00 AM",
          "06:00 AM",
          "07:00 AM",
          "08:00 AM",
          "09:00 AM",
          "10:00 AM",
          "11:00 AM",
          "12:00 PM",
          "01:00 PM",
          "02:00 PM",
          "03:00 PM",
          "04:00 PM",
          "05:00 PM",
          "06:00 PM",
          "07:00 PM",
          "08:00 PM",
          "09:00 PM",
          "10:00 PM",
    
        ],

      },
      tooltip: {
       
      }
    };
    this.notificationService.Configure();
  }
 

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  cancel() {
    this.codeValidity = true;
    this.modal.dismiss(null, 'cancel');
  }
  confirm() {
    const code=this.nameInput.value+"";
    this.dataService.Sync(code).subscribe(data => { 
      localStorage.setItem('code', code)
      this.modal.dismiss(this.name, 'confirm');
      this.router.navigate(['/welcome'],{ replaceUrl: true });
      this.codeValidity = true;
    },error => this.codeValidity = false);
    //
  }
  onWillDismiss() {
    
  }
  ngOnInit() { 
    this.setCustomer();
    this.setAttendance();
    this.setUser();
   
  }
  openModal(){
    var boton = document.getElementById('open-modal');
    boton?.click();
  }
  setImg(){
    const imgElement = document.querySelector('#logo');
    if(imgElement instanceof HTMLImageElement){
      imgElement.src =  localStorage.getItem("logo")+"";
    }
  
  }
  setCustomer(){
    const customer = localStorage.getItem("customer")
    if(customer){
      const json = JSON.parse(customer);
      this.customer = json.name
      const imgElement = document.querySelector('#logo');
      if(imgElement instanceof HTMLImageElement){
        imgElement.src =  json.url_img;
      }
    }
    
  }
  setUser(){
    const user = localStorage.getItem("user")
    if(user){
      const json = JSON.parse(user);
      this.user = json.name
    }
    
  }
  setAttendance(){
    const attendance = localStorage.getItem("attendance")
    if(attendance){
      const json = JSON.parse(attendance);
      const values = json.slice(4, 22);
      const array = [
        {
          name: "Porcentaje de usuarios",
          data: values
          
        }
      ]
      this.chartOptions.series = array;
    }
  }
SheduleNotify(){

 
}
  }
