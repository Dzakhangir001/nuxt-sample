export default {
  methods: {
    calcSinceDate (date) {
      let seconds = Math.floor((new Date() - new Date(date)) / 1000)
      const suffix = ['seconds', 'minutes', 'hours', 'days', 'months', 'years']
      const dividers = [60, 60, 24, 30, 12]
      while (seconds > dividers[0]) {
        seconds = seconds / dividers[0]
        dividers.splice(0, 1)
        suffix.splice(0, 1)
      }
      return seconds.toFixed(0) + ' ' + suffix.splice(0, 1) + ' ago'
    },
    calcTimeDiff (date) {
      const timeNow = new Date().getTime()
      const timeDate = new Date(date).getTime()
      const diff = timeNow - timeDate
      let hours = Math.floor(diff / 3.6e6)
      let minutes = Math.floor((diff % 3.6e6) / 6e4)
      let seconds = Math.floor((diff % 6e4) / 1000)
      hours = hours > 0 ? hours < 10 ? '0' + hours + ':' : hours.toString() + ':' : ''
      minutes = minutes > 0 ? minutes < 10 ? '0' + minutes + ':' : minutes.toString() + ':' : '00:'
      seconds = seconds < 10 ? '0' + seconds : seconds.toString()

      return hours + minutes + seconds
    },
    formatNumberShort (num) {
      const suffix = ['', 'K', 'M', 'B']
      while (num > 999) {
        num = num / 1000
        suffix.splice(0, 1)
      }
      return num.toFixed(1).replace('.0', '') + suffix.splice(0, 1)
    },
    formatNumberWithDots (num) {
      return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
    },
    parseISO8601 (duration) {
      const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
        .slice(1)
        .map(function (x) {
          if (x != null) {
            return x.replace(/\D/, '')
          }
        })
      let hours = match[0]
      let minutes = match[1]
      let seconds = match[2]

      hours = hours ? parseInt(hours) < 10 ? '0' + hours + ':' : hours + ':' : ''
      minutes = minutes ? parseInt(minutes) < 10 ? '0' + minutes + ':' : minutes + ':' : '00:'
      seconds = seconds ? parseInt(seconds) < 10 ? '0' + seconds : seconds : '00'
      return hours + minutes + seconds
    }
  }
}
