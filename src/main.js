import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'
import BuyModal from "@/components/Shared/BuyModal";
import router from './router'

Vue.config.productionTip = false
Vue.component('app-buy-modal', BuyModal)


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    const firebaseConfig = {
      apiKey: "AIzaSyAHcE16VK0QxlZJhS_BksRyYJkUhVWPHlc",
      authDomain: "vueproject-e9f35.firebaseapp.com",
      projectId: "vueproject-e9f35",
      storageBucket: "vueproject-e9f35.appspot.com",
      messagingSenderId: "376900721334",
      appId: "1:376900721334:web:2686ee8d29b69788e06417",
      measurementId: "G-L0PTGYNPKX"
    };

    firebase.initializeApp(firebaseConfig)

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
