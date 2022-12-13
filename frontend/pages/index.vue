<template>
  <div class="index-logo">
    <img src="/schroedinger-cat.svg"/>
  </div>
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

<style lang="sass">
.index-logo
  //border: 1px solid red
  background: black
  width: 100%
  display: flex
  align-items: center
  justify-content: center
</style>
