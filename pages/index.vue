<template>
  <div class="ma-0 pa-0">
    <v-layout row wrap>
      <v-flex xs12>
        <div class="dd-header-background ma-0 pa-0" >
          <v-container fill-height fluid class="ma-0">
            <v-layout fill-height>
              <v-flex xs12>
                <div class="elevation-6" style="background-color: rgba(256, 256, 256, 0.45); padding: 4px;">
                  <v-layout fill-height row wrap>
                    <v-flex xs12 md4 align-end>
                      <div style="padding-right: 20px" class="text-xs-center text-md-right">
                        <img style="max-height: 100%" src="~/assets/large_icon.png" alt="dd-palm">
                      </div>
                    </v-flex>
                    <v-flex xs12 md8 class="text-xs-center text-md-left">
                      <h1 class="dd-site-title-font dd-site-logo-title">Daesh Daily</h1>
                      <h3 class="dd-site-title-font dd-site-tag-line">An Update on the War on ISIS</h3>
                      <span>
                        <v-btn color="green darken-4" href="/about" dark>Learn More</v-btn>
                        <v-btn color="green darken-4" href="/reports" dark>Reports</v-btn>
                        <v-btn color="green darken-4" href="/why-isis-exists" dark>Why ISIS exists</v-btn>
                      </span>
                    </v-flex>
                  </v-layout>
                </div>
                <div class="elevation-6" style="background-color: rgba(256, 256, 256, 0.45); padding: 4px; margin-top: 10px;">
                  <v-layout>
                    <v-flex xs12 class="ma-5">
                      <h4 class="dd-site-title-font dd-site-tag-line-2 text-xs-center">Regional news compiled from Arabic sources</h4>
                      <div align="center">
                        <span>
                          <v-btn color="green darken-4" href="/stories/iraq" dark>Iraq</v-btn>
                          <v-btn color="green darken-4" href="/stories/syria" dark>Syria</v-btn>
                          <v-btn color="green darken-4" href="/stories/other" dark>Other Countries</v-btn>
                        </span>
                      </div>
                    </v-flex>
                  </v-layout>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-flex>
    </v-layout>
    <issue :issue="issue" :nextIssue="nextIssue" :prevIssue="prevIssue"></issue>
  </div>
</template>

<script>
  import Issue from '../components/Issue.vue'
  import { getCurrentIssue } from '../lib/api'

  export default {
    components: {
      Issue
    },
    data () {
      return {
        issue: null,
        nextIssue: null,
        prevIssue: null
      }
    },
    asyncData ({ error, payload }) {
      if (payload) {
        return payload
      }
      let dataPayload = getCurrentIssue()
      if (dataPayload) {
        return dataPayload
      }
      error({statusCode: 404, message: 'Could not find current issue'})
    }
  }
</script>

<style>
  div.dd-header-background {
    background-image: url('~/assets/4.euphratesriver1.jpg');
    background-size: cover;
    padding: 0;
    margin: 0;
    width: 100%;
  }
</style>
