<template>
  <v-layout row wrap fill-height fluid class="elevation-4 mt-3">
    <v-flex xs2 class="text-xs-left dd-header-date-string">
      <v-btn :to="prevDateLink" v-if="hasPrev" color="secondary" dark>
        <v-icon dark>arrow_back</v-icon>{{ prevDateString }}
      </v-btn>
    </v-flex>
    <v-flex xs8 class="text-xs-center dd-header-date-string">
      {{ currDateString }}
    </v-flex>
    <v-flex xs2 class="text-xs-right dd-header-date-string">
      <v-btn :to="nextDateLink" v-if="hasNext" color="secondary" dark>
        {{ nextDateString }}<v-icon dark>arrow_forward</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  import { shortDateString, longDateString } from '../lib/dateUtil'

  export default {
    props: {
      dates: Object
    },
    computed: {
      currDate () {
        return this.dates.currDate
      },
      prevDate () {
        return this.dates.prevDate
      },
      nextDate () {
        return this.dates.nextDate
      },
      hasPrev () {
        return this.prevDate !== null
      },
      hasNext () {
        return this.nextDate !== null
      },
      prevDateString () {
        return shortDateString(this.prevDate)
      },
      nextDateString () {
        return shortDateString(this.nextDate)
      },
      currDateString () {
        return longDateString(this.currDate)
      },
      prevDateLink () {
        return this.dateLink(this.prevDate)
      },
      nextDateLink () {
        return this.dateLink(this.nextDate)
      }
    },
    methods: {
      dateLink (d) {
        if (d === null) {
          return '#'
        }
        return '/stories/byDate/' + d
      }
    }
  }
</script>
