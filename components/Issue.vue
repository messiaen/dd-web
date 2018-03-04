<template>
  <div>
    <section>
      <issue-nav :issue="issue" :nextIssue="nextIssue" :prevIssue="prevIssue"></issue-nav>
      <story-list v-if="stories.length > 0" :stories="stories"></story-list>
      <empty-issue v-else></empty-issue>
      <issue-nav :issue="issue" :nextIssue="nextIssue" :prevIssue="prevIssue"></issue-nav>
    </section>
  </div>
</template>

<script>
  import StoryList from './StoryList.vue'
  import IssueNav from './IssueNav.vue'
  import EmptyIssue from './EmptyIssue.vue'

  export default {
    components: {
      StoryList,
      IssueNav,
      EmptyIssue
    },
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
      stories () {
        if (this.issue && this.issue.stories) {
          console.log(this.issue.stories.length)
          console.log(this.issue.stories[0].date)
          return this.issue.stories
        }
        return []
      }
    }
  }
</script>
