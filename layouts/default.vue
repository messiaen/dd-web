<template>
  <v-app>
    <toolbar></toolbar>
    <v-content style="height: 100%" fluid class="ma-0">
      <v-container style="height: 100%" fluid class="pa-0 ma-0">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Toolbar from '../components/Toolbar.vue'

  export default {
    components: {
      Toolbar
    },
    data () {
      return {
        title: 'Daesh Daily'
      }
    }
  }
</script>

