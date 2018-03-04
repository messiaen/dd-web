<template>
  <div>
    <section v-if="loading && !error">
      <v-progress-linear height="3" color="secondary" v-bind:indeterminate=true></v-progress-linear>
    </section>
    <section v-if="!loading && error && error !== ''">
     <dd-404></dd-404>
    </section>
    <section v-if="!loading && !error">
      <stories-by-day-nav :dates="dates"></stories-by-day-nav>
      <v-container grid-list-lg>
        <story-row v-for="story in stories" :story="story" :key="story.id" isStoryList></story-row>
      </v-container>
      <stories-by-day-nav :dates="dates"></stories-by-day-nav>
    </section>
  </div>
</template>

<script>
  import Dd404 from './Dd404.vue'
  import StoriesByDayNav from './StoriesByDayNav.vue'
  import StoryRow from './StoryRow.vue'
  import { fetchIssueByDate, fetchCurrentIssue } from '../lib/api'
  import { isValidDateString } from '../lib/dateUtil'

  export default {
    components: {
      StoriesByDayNav,
      StoryRow,
      Dd404
    },
    data () {
      return {
        stories: [],
        dates: {},
        loading: true,
        error: ''
      }
    },
    props: {
      date: {
        type: String,
        required: true,
        validator: isValidDateString
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.error = ''
        this.loading = true
        this.stories = []
        this.dates = {}

        console.log(this.date)

        if (this.date !== 'today' && !isValidDateString(this.date)) {
          this.error = 'Invalid date given'
          this.loading = false
          return
        }

        let promise = null
        if (this.date === 'today') {
          console.log('Fetching issue')
          promise = fetchCurrentIssue()
        } else {
          promise = fetchIssueByDate(this.date)
        }

        promise.then((issue) => {
          if (!issue) {
            this.stories = []
            this.dates = {
              prevDate: null,
              nextDate: null,
              currDate: null
            }
            this.loading = false
            this.error = ''
            return
          }
          this.stories = issue.stories
          this.dates = {
            currDate: issue.dateString
          }
          if (issue.prevIssue && issue.prevIssue.dateString) {
            this.dates.prevDate = issue.prevIssue.dateString
          } else {
            this.dates.prevDate = null
          }

          if (issue.nextIssue && issue.nextIssue.dateString) {
            this.dates.nextDate = issue.nextIssue.dateString
          } else {
            this.dates.nextDate = null
          }

          this.loading = false
        }).catch((err) => {
          this.error = err.toString()
          this.loading = false
        })
      }
    },
    watch: {
      '$route': 'fetchData'
    }
  }
</script>