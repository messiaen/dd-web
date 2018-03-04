<template>
  <v-layout row wrap>
    <v-flex xs12 md2 lg2 xl2>
      <p class="text-xs-left dd-region-list">
        {{ regionListString }}
      </p>
      <hr class="dd-region-list-underline">
      <p v-if="!isStoryList" class="text-xs-left dd-side-date-string">
        {{ storyDateString }}
      </p>
    </v-flex>
    <v-flex xs12 sm12 md10 lg10 xl8>
      <story-card :story="story" :isStoryList="isStoryList"></story-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { shortDateString } from '../lib/dateUtil'

  import StoryCard from './StoryCard.vue'

  // import regions from '../assets/regions.json'

  export default {
    components: {
      StoryCard
    },
    props: {
      story: Object,
      isStoryList: Boolean
    },
    computed: {
      regionListString () {
        if (this.story.region) {
          return this.story.region
        } else {
          return ''
        }
      },
      storyDateString () {
        return shortDateString(this.story.date)
      }
    }
  }
</script>
