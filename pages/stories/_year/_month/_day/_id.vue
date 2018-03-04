<template>
  <div>
    <section>
      <v-container grid-list-lg>
        <story-row :story="story"></story-row>
      </v-container>
    </section>
  </div>
</template>

<script>
  import StoryRow from '../../../../../components/StoryRow.vue'
  import { getStoryById } from '../../../../../lib/api'

  export default {
    components: {
      StoryRow
    },
    data () {
      return {
        story: null
      }
    },
    asyncData ({ params, error, payload }) {
      if (payload) {
        return payload
      }
      let dataPayload = getStoryById(params.id)
      if (dataPayload) {
        return dataPayload
      }
      error({statusCode: 404, message: 'No such story'})
    }
  }
</script>
