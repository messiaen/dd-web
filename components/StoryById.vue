<template>
  <div>
    <section v-if="loading && !error">
      <v-progress-linear height="3" color="secondary" v-bind:indeterminate=true></v-progress-linear>
    </section>
    <section v-if="!loading && error && error !== ''">
      <dd-404></dd-404>
    </section>
    <section v-if="!loading && !error">
      <v-container grid-list-lg>
        <story-row :story="story"></story-row>
      </v-container>
    </section>
  </div>
</template>

<script>
  import StoryRow from './StoryRow.vue'
  import { fetchStoryById } from '../lib/api'

  export default {
    components: {
      StoryRow
    },
    data () {
      return {
        loading: true,
        error: '',
        story: {},
        date: ''
      }
    },
    asyncData ({ params }) {
      return fetchStoryById(params.storyId).then((story) => {
        if (!story) {
          return {
            story: {},
            loading: false,
            error: ''
          }
        }

        let date = ''
        if (this.story.issue && this.story.issue.dateString) {
          date = this.story.issue.dateString
        }
        return {
          story: story,
          date: date,
          loading: false,
          error: ''
        }
      }).catch((err) => {
        return {
          error: err.toString(),
          loading: false
        }
      })
    },
    created () {
      this.fetchData()
    },
    methods: {
    },
    watch: {
      '$route': 'fetchData'
    }
  }
</script>