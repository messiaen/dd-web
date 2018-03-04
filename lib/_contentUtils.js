const crypto = require('crypto')

const issueLinkPrefix = 'issues'
const storyLinkPrefix = 'stories'

const issueLink = (issue) => {
  if (!issue) {
    return null
  }
  let date = issue.date
  let dateParts = date.split('-')
  return ['', issueLinkPrefix, ...dateParts].join('/')
}

const storyId = (story) => {
  let hash = crypto.createHash('sha1')
  hash.update(story.body)
  return story.date + '-' + hash.digest('hex')
}

const storyLink = (story) => {
  if (!story || !story.date) {
    return null
  }
  let date = story.date
  let dateParts = date.split('-')
  return ['', storyLinkPrefix, ...dateParts, story.id].join('/')
}

const toIndices = (issues) => {
  let allIssues = []
  for (let i = 0; i < issues.length; ++i) {
    let obj = issues[i]
    obj['route'] = issueLink(obj)
    for (let j = 0; j < obj.stories.length; ++j) {
      let story = obj['stories'][j]
      obj['stories'][j]['date'] = obj.date
      obj['stories'][j]['id'] = storyId(story)
      obj['stories'][j]['route'] = storyLink(story)
    }
    console.log('Adding issue: ' + JSON.stringify(obj, ' ', 2))
    allIssues.push(obj)
  }

  allIssues.sort(function (a, b) {
    if (a.date < b.date) {
      return -1
    }
    if (a.date > b.date) {
      return 1
    }
    return 0
  })
  allIssues.splice(0, 0, null)
  allIssues.push(null)

  let issueIndex = {}
  for (let i = 1; i < allIssues.length - 1; ++i) {
    let issue = allIssues[i]
    let prevIssue = allIssues[i - 1]
    let prevIssueEntry = null
    if (prevIssue) {
      prevIssueEntry = {
        date: prevIssue.date,
        route: prevIssue.route
      }
    }
    let nextIssue = allIssues[i + 1]
    let nextIssueEntry = null
    if (nextIssue) {
      nextIssueEntry = {
        date: nextIssue.date,
        route: nextIssue.route
      }
    }
    let entry = {
      prevIssue: prevIssueEntry,
      issue,
      nextIssue: nextIssueEntry
    }
    if (i === allIssues.length - 2) {
      issueIndex['current'] = entry
    }
    issueIndex[issue.date] = entry
  }

  let storyIndex = {}
  for (let i = 1; i < allIssues.length - 1; ++i) {
    for (let j = 0; j < allIssues[i].stories.length; ++j) {
      let story = allIssues[i].stories[j]
      storyIndex[story.id] = {
        story
      }
    }
  }
  return {
    issueIndex,
    storyIndex
  }
}

module.exports = {
  toIndices
}
