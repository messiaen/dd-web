<template>
  <issue :issue="issue" :nextIssue="nextIssue" :prevIssue="prevIssue"></issue>
</template>

<script>
  import Issue from '../../../../components/Issue.vue'
  import { getIssueByDate } from '../../../../lib/api'

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
    async asyncData ({ params, error, payload }) {
      if (payload) {
        return payload
      }
      let dateString = [params.year, params.month, params.day].join('-')
      let dataPayload = getIssueByDate(dateString)
      if (dataPayload) {
        return dataPayload
      }
      error({statusCode: 404, message: 'Could not find issue'})
    }
  }
</script>
