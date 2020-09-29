<template>
  <div id="page-loader" class="loading-page" :class="{ 'show-loader': loading }">
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 20%;
    font-size: 30px;
    transition: opacity 0.5s ease, left 0.5s ease;
  }

  .show-loader {
    opacity: 1;
    left: 0;
  }

  @keyframes moveIn {
    from {left: -100%;}
    to {left: 0;}
  }
</style>
