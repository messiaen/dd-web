<template>
  <v-layout row wrap fill-height fluid class="elevation-4 mt-3 white">
    <v-flex xs12 sm2 md2 class="text-xs-left dd-header-date-string">
      <v-btn class="dd-header-btn-date-string" :href="prevDateLink" v-if="hasPrev" color="secondary" dark>
        <v-icon dark>arrow_back</v-icon>{{ prevDateString }}
      </v-btn>
    </v-flex>
    <v-flex xs12 sm8 md8 class="text-xs-center dd-header-date-string">
      {{ currDateString }}
    </v-flex>
    <v-flex xs12 sm2 md2 class="text-xs-right dd-header-date-string">
      <v-btn class="dd-header-btn-date-string" :href="nextDateLink" v-if="hasNext" color="secondary" dark>
        {{ nextDateString }}<v-icon dark>arrow_forward</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  import { shortDateString, longDateString } from '../lib/dateUtil'

  export default {
    props: {
      issue: {
        type: Object,
        required: true
      },
      nextIssue: {
        type: Object,
        required: false
      },
      prevIssue: {
        type: Object,
        required: false
      }
    },
    computed: {
      currDate () {
        if (this.issue) {
          return this.issue.date
        }
        return null
      },
      prevDate () {
        if (this.hasPrev) {
          return this.prevIssue.date
        }
        return null
      },
      nextDate () {
        if (this.hasNext) {
          return this.nextIssue.date
        }
        return null
      },
      hasPrev () {
        return this.prevIssue !== null
      },
      hasNext () {
        return this.nextIssue !== null
      },
      prevDateString () {
        if (this.hasPrev) {
          return shortDateString(this.prevDate)
        }
        return ''
      },
      nextDateString () {
        if (this.hasNext) {
          return shortDateString(this.nextDate)
        }
        return ''
      },
      currDateString () {
        if (this.issue) {
          return longDateString(this.currDate)
        }
        return ''
      },
      prevDateLink () {
        if (this.hasPrev) {
          return this.prevIssue.route
        }
        return '/404'
      },
      nextDateLink () {
        if (this.hasNext) {
          return this.nextIssue.route
        }
        return '/404'
      }
    }
  }
</script>
