import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'AppClubCheck',
  webDir: 'www',
  server: {
    androidScheme: 'http'
  },plugins: {
    LocalNotifications: {
      iconColor: "#488AFF"
    },
    CapacitorHttp: {
      enabled: true,
    }
  }

  
};

export default config;
