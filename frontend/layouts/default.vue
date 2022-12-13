<template>
  <v-app>
    <v-app-bar fixed app dense class="main-menu">
      <v-app-bar-title>
        <v-btn to="/">
          Schrödinger's cat
        </v-btn>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
<!--        <v-btn id to="/" v-if="user">
          main
        </v-btn>-->
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-menu rounded="true" open-on-hover offset-y transition="slide-x-transition" bottom right v-if="user?.isAdmin">
          <template v-slot:activator="{ on, attrs }">
            <v-btn id v-bind="attrs" v-on="on">
              Admin
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item to="/admin/users">
              <v-list-item-title>Users list</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn to="/cabinet/settings" v-if="user">{{ user.email }}</v-btn>
        <v-btn to="/user/signup" v-if="!user" id>Регистрация</v-btn>
        <v-btn to="/user/login" v-if="!user" id>{{$t('Login')}}</v-btn>
        <v-btn @click="logout" v-if="user" id>{{$t('Logout')}}</v-btn>
        <v-btn icon @click="switchTheme">
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>
        <LangSwitcher/>
      </v-toolbar-items>

    </v-app-bar>
    <v-main>
      <v-container>
                <nuxt/>
      </v-container>
    </v-main>
    <SnackBar/>
  </v-app>
</template>

<script>
import LangSwitcher from "~/components/LangSwitcher.vue";

export default {
  components: {LangSwitcher},
  computed: {
    user() {
      return this.$store.getters.getLoggedUser
    },
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
    switchTheme() {
      this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark;
    }
  },
  created() {
    //this.$axios.$get('/build-date')        .then(res => this.buildDate = res.ctime)
  },

}
</script>

<style lang="sass">

</style>
