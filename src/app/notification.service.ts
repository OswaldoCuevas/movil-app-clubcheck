import { Injectable, OnInit } from '@angular/core';
import { LocalNotificationSchema, LocalNotifications } from '@capacitor/local-notifications';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnInit {
  constructor(private dataService:DataService){

  }
  ngOnInit() {}
  Configure() {
    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      this.dataService.AddToken(token.value).subscribe(data => console.log(data));

    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
       
      },
    );
  }
}


