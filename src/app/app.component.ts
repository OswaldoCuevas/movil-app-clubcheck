import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LocalNotifications } from '@capacitor/local-notifications';
declare var cordova: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private platform: Platform) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Ocultar la barra de navegación superior
      if (this.platform.is('cordova')) {
        cordova.exec(null, null, 'FullScreen', 'show', []);
      }
    });
  }
}
