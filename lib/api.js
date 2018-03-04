/**
 * Created by eigenmoose on 11/11/17.
 */

const contextUtils = require('./contentUtils')

const readRawIssues = () => {
  const context = require.context('~/content/issues', false, /\.json$/)
  return context.keys().map(key => context(key))
}

const readAllIssues = () => {
  return contextUtils.toIndices(readRawIssues())
}

const { issueIndex, storyIndex } = readAllIssues()

const getCurrentIssue = () => {
  return issueIndex['current']
}

const getIssueByDate = (date) => {
  if (issueIndex[date]) {
    return issueIndex[date]
  }
  return null
}

const getStoryById = (id) => {
  if (storyIndex[id]) {
    return storyIndex[id]
  }
  return null
}

/*
const fetchIssueByDate = (dateString) => {
  return apollo.query({
    query: gql`{
      allIssues(filter: {AND: [{dateString: "${dateString}"}, {isPublished: true}]}) {
        prevIssue {
          dateString
        }
        nextIssue {
          dateString
        }
        dateString
        stories(orderBy: weight_ASC) {
          id
          storyRegion
          tags
          content
          issue {
            dateString
          }
          storyImages {
            caption
            paragraphNumber
            image {
              url
            }
          }
        }
      }
    }`
  }).then(({data}) => {
    console.log(data)
    if (data.allIssues.length > 0) {
      return data.allIssues[0]
    } else {
      return null
    }
  })
}

const fetchCurrentIssue = () => {
  console.log('!!!')
  return apollo.query({
    query: gql`{
      allIssues(orderBy: dateString_DESC, filter: {AND: [{isPublished: true}]}, first: 1) {
        prevIssue {
          dateString
        }
        nextIssue {
          dateString
        }
        dateString
        stories(orderBy: weight_ASC) {
          issue {
            dateString
          }
          id
          storyRegion
          content
          tags
          storyImages {
            caption
            paragraphNumber
            image {
              url
            }
          }
        }
      }
    }`
  }).then(({data}) => {
    console.log(JSON.stringify(data))
    if (data.allIssues.length > 0) {
      return data.allIssues[0]
    } else {
      return null
    }
  })
}

const fetchStoryById = (storyId) => {
  return apollo.query({
    query: gql`{
      Story(id: "${storyId}") {
        issue {
          dateString
        }
        id
        storyRegion
        content
        tags
        storyImages {
          caption
          paragraphNumber
          image {
            url
          }
        }
      }
    }`
  }).then(({data}) => {
    return data.Story
  })
}
*/

module.exports = {
  getCurrentIssue,
  getIssueByDate,
  getStoryById
}
