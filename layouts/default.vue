<template>
  <div>
    <faze-header />
    <video-play-global />
    <Nuxt id="main-wrapper" />
    <faze-footer />
  </div>
</template>

<script>
export d efault {
  name: 'DefaultLayout'
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

html,
body {
  height: 100%;
}
body{
  background-color: #000;
  min-height: 100vh;
  min-height: -webkit-fill-available;
}

html {
  height: -webkit-fill-available;
}

body.menuOpen {
  overflow: hidden;
}

#main-wrapper {
  min-height: 80vh;
}

.nopadding-strict {
  padding: 0 !important;
  margin: 0 !important;
}
.nopadding {
  padding: 0;
  margin: 0;
}
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>
<script>
</script>
