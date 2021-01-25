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
      apiKey: "",
      authDomain: "vueproject-e9f35.firebaseapp.com",
      projectId: "vueproject-e9f35",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: ""
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
