<template>
    <v-app>
        <v-card
            flat
            height="64px"
            tile
        >
            <v-app-bar app dark color="primary">
                <v-app-bar-nav-icon
                    @click="drawer = !drawer"
                    class="hidden-md-and-up"
                ></v-app-bar-nav-icon>
                <v-toolbar-title>
                    <router-link to="/" tag="span" class="pointer">Ad application</router-link>
                </v-toolbar-title>
                <v-spacer></v-spacer>

                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn
                        plain
                        v-for="link in links"
                        :key="link.title"
                        :to="link.url"
                    >
                        <v-icon left>{{link.icon}}</v-icon>
                        {{link.title}}
                    </v-btn>
                  <v-btn
                      v-if="isUserLoggedIn"
                      plain
                      @click="onLogOut"
                  >
                    <v-icon left>exit_to_app</v-icon>
                    LogOut
                  </v-btn>
                </v-toolbar-items>
            </v-app-bar>
        </v-card>
        <v-navigation-drawer
            app
            temporary
            v-model="drawer"
        >
            <v-list>
                <v-list-item
                    v-for="link in links"
                    :key="link.title"
                    :to="link.url"
                >
                    <v-list-item-icon>
                        <v-icon>
                            {{ link.icon }}
                        </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-text="link.title"></v-list-item-title>
                    </v-list-item-content>

                </v-list-item>
                <v-list-item @click="onLogOut" v-if="isUserLoggedIn">
                  <v-list-item-icon>
                    <v-icon>
                      exit_to_app
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title v-text="'LogOut'"></v-list-item-title>
                  </v-list-item-content>

                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main class="pa-0">
            <router-view></router-view>
        </v-main>

        <template v-if="error">
            <v-snackbar
                :multi-line="true"
                :timeout="5000"
                color="error"
                @input="closeError"
                :value="true"
            >
                {{ error }}
                <v-btn
                    dark
                    flat
                    @click="closeError"
                >
                  Close
                </v-btn>
            </v-snackbar>
        </template>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
        }
    },
    computed: {
      error() {
        return this.$store.getters.error
      },
      isUserLoggedIn() {
        return this.$store.getters.isUserLoggedIn
      },
      links() {
        if (this.isUserLoggedIn) {
          return [
            {title: 'Orders', icon: 'bookmark_border', url: '/orders'},
            {title: 'New Ad', icon: 'note_add', url: '/new'},
            {title: 'My Ads', icon: 'list', url: '/list'},
          ]
        } else {
          return [
            {title: 'Login', icon: 'lock', url: '/login'},
            {title: 'Registration', icon: 'face', url: '/registration'},
          ]
        }
      }
    },
    methods: {
      closeError() {
        this.$store.dispatch('clearError')
      },
      onLogOut() {
        this.$store.dispatch('logoutUser')
        this.$router.push('/')
      }
    }
}
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }
</style>