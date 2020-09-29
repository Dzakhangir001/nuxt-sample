<template>
  <video :width="width" :height="height" controls>
    <source :src="source" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</template>

<script>
export default {
  name: 'VideoPlayer',
  props: {
    height: {
      type: Number,
      default: 300
    },
    width: {
      type: Number,
      default: 500
    },
    source: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
