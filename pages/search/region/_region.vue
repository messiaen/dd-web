<template>
  <section>
    <story-list v-if="stories.length > 0" stories="stories"></story-list>
    <empty-issue v-else></empty-issue>
  </section>
</template>

<script>
  import StoryList from '../../../components/StoryList.vue'
  import EmptyIssue from '../../../components/EmptyIssue.vue'

  export default {
    components: {
      StoryList,
      EmptyIssue
    },
    data () {
      return {
        stories: null
      }
    },
    asyncData ({ params, error, payload }) {
    }
  }
</script>