<template>
    <v-card>
        <v-card-text>
            <div v-html="compiledMarkdown" class="dd-article-content"></div>
            <div style="clear: both;"></div>
        </v-card-text>
        <v-card-text>
            <div class="text-lg-left">
                <v-chip color="green darken-4" label text-color="white" v-for="tag in story.tags" :key="tag">
                    <div class="title">{{ tag }}</div>
                </v-chip>
            </div>
        </v-card-text>
        <v-card-actions v-if="isStoryList">
            <v-spacer></v-spacer>
            <v-btn color="green darken-4" flat :href="storyRef">More</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  import marked from 'marked'
  import cheerio from 'cheerio'
  // import { storyLink } from '../lib/api'

  export default {
    props: {
      story: Object,
      isStoryList: Boolean
    },
    methods: {
      /*
      imgHtmlString (storyImage) {
        if (storyImage && storyImage.caption && storyImage.image && storyImage.image.url) {
          // let s = '<figure>'
          // s += `<img src="${storyImage.image.url}" alt="${storyImage.caption}">`
          // s += `<figcaption>${storyImage.caption}</figcaption>`
          // s += '</figure>'
          // return s
          return `
            <div class="dd-article-figure">
              <img src="${storyImage.image.url}" alt="${storyImage.caption}"><br>
              ${storyImage.caption}
            </div>
          `
        }
        return null
      }
      */
    },
    computed: {
      compiledMarkdown () {
        let $ = cheerio.load('<div id="tmp-compile-root"></div>')
        let inner = marked(this.story.body, {sanitize: true})

        $('#tmp-compile-root').append(inner)
        // const numParagraphs = $('p').length
        // const emptyStory = numParagraphs < 1
        // const lastPara = numParagraphs - 1
        /*
        for (let i = 0; i < this.story.storyImages.length; ++i) {
          let currImage = this.story.storyImages[i]
          if (emptyStory) {
            console.log('Empty Story')
            let imgHtml = this.imgHtmlString(currImage)
            if (imgHtml) {
              $('#tmp-compile-root').append(imgHtml)
            }
          } else {
            console.log('Prepending to para')
            let imgHtml = this.imgHtmlString(currImage)
            if (imgHtml) {
              let paraNum = -1
              if (currImage && currImage.paragraphNumber) {
                paraNum = Math.min(currImage.paragraphNumber - 1, lastPara)
              }
              console.log('para ' + paraNum)
              $('p').eq(paraNum).before(imgHtml)
            }
          }
        }
        */
        // $('p').eq(this.storyImage.paragraph - 1).prepend('<img src="' + this.storyImage.url + '">')
        return $('#tmp-compile-root').html()
      },
      storyRef () {
        return this.story.route
      }
    }
  }
</script>
