<template>
  <v-card>
    <v-card-title>{{$t('Let me know')}}</v-card-title>
    <v-card-text>

    </v-card-text>
  </v-card>
</template>

<script>


export default {
  auth: false,
  computed: {
    user() {
      return this.$store.getters.getLoggedUser
    }
  },
  data() {
    return {
      form: {},
      list: [],
      departments: []
    }
  },

  methods: {

  },
  created() {
    if(this.$store.getters.getLoggedUser)
      this.$router.push(this.$store.getters.getLoginRedirect)
  }

}
</script>
