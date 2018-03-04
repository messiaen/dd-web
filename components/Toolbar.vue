<template>
  <v-toolbar color="secondary" fixed app dark>
    <a href="/" class="dd-site-title-font dd-toolbar-link">
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </a>
  </v-toolbar>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Daesh Daily'
      }
    }
  }
</script>

<style scoped>
  a.dd-toolbar-link:visited {
    color: white
  }
  a.dd-toolbarlink:active {
    text-decoration: none;
  }

  a.dd-toolbar-link:link {
    text-decoration: none;
  }

  a.dd-toolbar-link:visited {
    text-decoration: none;
  }

  a.dd-toolbar-link:hover {
    text-decoration: none;
  }
</style>
