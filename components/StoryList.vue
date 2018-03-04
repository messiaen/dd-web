<template>
  <v-container v-if="stories.length > 0" grid-list-lg>
    <story-row v-for="story in stories" :story="story" :key="story.id" isStoryList></story-row>
  </v-container>
</template>

<script>
  import StoryRow from './StoryRow.vue'

  export default {
    components: {
      StoryRow
    },
    props: {
      stories: {
        type: Array,
        required: true
      }
    }
  }
</script>
