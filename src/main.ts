import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import Maska from 'maska';
import { i18n } from './i18n';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArrvFUK-VqEHsRQwNXu2M8j-MFYfcuUH4",
  authDomain: "pbpc-pediatric.firebaseapp.com",
  projectId: "pbpc-pediatric",
  storageBucket: "pbpc-pediatric.appspot.com",
  messagingSenderId: "439077048887",
  appId: "1:439077048887:web:9a164ef338a4d79e2325b2",
  measurementId: "G-L6Z62HZW3R"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);


const app = createApp(App);
app.use(router);
app.use(PerfectScrollbar);
app.use(VueTablerIcons);
app.use(Maska);
app.use(VueApexCharts);
app.use(i18n);
app.use(vuetify).mount('#app');
