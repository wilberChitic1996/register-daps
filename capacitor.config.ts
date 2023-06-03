import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pollosdelvalle.AVIGestor',
  appName: 'AVIGestor',
  webDir: 'www',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
  bundledWebRuntime: false
};

export default config;
