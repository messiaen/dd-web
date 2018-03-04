const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const utcSuffix = 'T00:00:00Z'

const dateString = (d, longForm) => {
  let date = new Date(d + utcSuffix)
  let weekday = weekdays[date.getUTCDay()]
  let month = months[date.getUTCMonth()]
  let dayOfMonth = date.getUTCDate()
  let year = date.getUTCFullYear()

  let dateString = weekday + ', ' + month + ' ' + dayOfMonth
  if (longForm) {
    dateString += ', ' + year
  }
  return dateString
}

export const shortDateString = (date) => {
  return dateString(date, false)
}

export const longDateString = (date) => {
  return dateString(date, true)
}

export const isValidDateString = (value) => {
  if (value === 'today') {
    return true
  }
  if (!value) {
    return false
  }
  if (!value.match(/\d{4}-\d{2}-\d{2}/)) {
    return false
  }
  if (!Date.parse(value + utcSuffix)) {
    return false
  }
  return true
}
