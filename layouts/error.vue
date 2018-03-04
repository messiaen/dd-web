<template>
  <v-app>
    <toolbar></toolbar>
    <v-content>
      <div style="height: 100%; width: 100%; position: absolute; background-color: #dda963">
        <div>
          <h1 class="dd-error-code text-xs-center">{{ error.statusCode }}</h1>
          <p class="dd-error-message text-xs-center">{{ error.message }}</p>
        </div>
      </div>
    </v-content>
  </v-app>
</template>

<script>
  import Toolbar from '../components/Toolbar.vue'

  export default {
    components: {
      Toolbar
    },
    props: ['error']
  }
</script>