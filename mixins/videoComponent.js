export default {
  props: {
    source: {
      thumbnail: {
        type: String,
        required: true
      },
      avatar: {
        type: String,
        required: false
      },
      title: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      views: {
        type: String,
        required: false
      },
      likes: {
        type: String,
        required: false
      },
      created_at: {
        type: String,
        required: false
      },
      source: {
        type: String,
        required: false
      },
      duration: {
        type: String,
        required: false
      }
    }
  }
}
