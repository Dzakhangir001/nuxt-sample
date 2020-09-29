<template>
  <div>
    <div
      class="tr-slide-container"
      :class="{ 'youtube-src': source.source === 'youtube_video', 'twitch-src': source.source === 'twitch_clip' }"
      @click="playVideo({elId: `tid-${source.id}`, video: source})"
    >
      <div class="tr-slide">
        <div class="tr-video-wrapper">
          <img
            :id="`tid-${source.id}`"
            v-lazy="source.thumbnail"
            class="tr-video-img img w-100"
            alt="Youtube placeholder"
          >

          <div v-if="source.duration" class="duration-wrapper">
            <span>
              {{ parseISO8601(source.duration) }}
            </span>
          </div>
        </div>

        <div class="tr-video-info">
          <div class="tr-desc-logo">
            <div class="tr-desc-logo-container">
              <img :src="source.avatar" alt="video yt logo">
            </div>
          </div>

          <div class="tr-video-desc">
            <div class="tr-desc-title-wrapper">
              <h3 class="tr-desc-title">
                {{ source.title }}
              </h3>
            </div>

            <p class="tr-video-author">
              <span v-if="source.source === 'youtube_video'"><img src="~assets/svgs/Youtube.svg" alt="Youtube icon"></span>
              <span v-if="source.source === 'twitch_clip'"><img src="~assets/svgs/twitch-logo.svg" alt="Twitch icon"></span>
              <span class="author-by">by</span>
              <span class="author-name">
                {{ source.name }}
              </span>
            </p>

            <div class="tr-video-meta">
              <div v-if="source.created_at" class="tr-meta-div tr-meta-since">
                {{ calcSinceDate(source.created_at) }}
              </div>

              <div class="video-stats-wrapper">
                <div v-if="source.views" class="tr-meta-div tr-meta-views">
                  <img src="~assets/svgs/eye-ic.svg" class="tr-eye-icon"><div class="tr-views">
                    {{ formatNumberShort(source.views) }}
                  </div>
                </div>
                <div v-if="source.likes" class="tr-meta-div tr-meta-likes">
                  <img src="~assets/heart-icon.png" class="tr-heart-icon"><div class="tr-likes">
                    {{ formatNumberWithDots(source.likes) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <products-container v-if="index === 4" :products="products" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import common from '~/mixins/common'
import videoComponent from '~/mixins/videoComponent'
export default {
  name: 'TrendingElement',
  mixins: [common, videoComponent],
  props: {
    index: {
      type: Number,
      required: true
    },
    products: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapActions({
      playVideo: 'videoPlayer/playVideo'
    })
  }
}
</script>

<style scoped>

  body {
    font-family: Arial, sans-serif;
  }

  .youtube-video {
    width: 100%;
  }

  .youtube-video iframe{
    width: 100%;
  }

  .tr-slide {
    width: 100%;
    position: relative;
  }

  .tr-slide-container {
    padding-top: 20px;
  }

  .tr-slide-container[iterate="0"]{
    padding-top: 0;
  }

  .tr-video-info {
    display: flex;
    background-color: #1A1A1A;
    padding: 10px 10px 9px 10px;
    border-bottom: 2px solid #252627;
  }

  .tr-desc-logo {
    display: inline-block;
  }

  .tr-desc-logo-container {
    width: 81px;
    padding-right: 10px;
    position: relative;
  }

  .tr-desc-title {
    font-size: 14px;
    line-height: 1.38;
    color: #e2e2e2;
  }

  .tr-desc-title-wrapper {
    height: 35px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .tr-video-desc {
    width: 100%;
    display: inline-block;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 1px;
  }

  .tr-desc-logo img {
    width: 100%;
  }

  .tr-video-meta {
    margin-top: 1px;
  }

  .tr-video-author {
    margin: 0;
    margin-top: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1;
  }

  .tr-video-author img {
    width: 13px;
  }

  .tr-video-wrapper {
    position: relative;
    width: 100%;
    padding-top: 56.67%;
    position: relative;
    overflow: hidden;
  }

  .tr-video-img,
  .youtube-src .tr-video-img {
    position: absolute;
    top: -16%;
    left: 0;
    height: auto!important;
    width: 100%!important;
  }

  .twitch-src .tr-video-img {
    position: absolute;
    top: 0;
    left: 0;
    height: auto!important;
    width: 100%!important;
  }

  .author-by {
    color: #636161;
    font-size: 14px;
    font-family: NationalLight;
    font-weight: 600;
    margin-left: 8px;
  }

  .author-name {
    color: #e4002b;
    font-size: 14px;
    font-family: NationalSemiBold;
    margin-left: 2px;
  }

  .tr-meta-div {
    display: inline-block;
    color: #b3b2b2;
    font-size: 12px;
    font-family: National;
    line-height: 1.5;
    letter-spacing: 0;
    font-feature-settings: "lnum";
    font-variant: lining-nums;
  }

  .tr-meta-views {
    color: #828282;
    margin-right: 5px;
  }

  .tr-meta-likes {
    color: #8f8f8f;
  }

  .video-stats-wrapper {
    float: right;
  }

  .tr-eye-icon {
    display: inline-block;
    height: 9px;
    width: auto;
    margin-right: 5px;
    vertical-align: baseline;
  }

  .tr-heart-icon {
    display: inline-block;
    height: 10px;
    width: auto;
    margin-right: 5px;
    padding-top: 2px;
    vertical-align: baseline;
  }

  .tr-meta-since {
    margin-right: 5px;
    vertical-align: middle;
  }

  .tr-views {
    display: inline-block;
    letter-spacing: 0;
    color: #636161;
  }

  .tr-likes {
    display: inline-block;
    color: #636161;
  }

  .duration-wrapper {
    position: absolute;
    right: 8px;
    bottom: 8px;
    min-width: 35px;
    color: #e2e2e2;
    background-color: #000;
    font-size: 11px;
    font-family: NationalMedium;
    border-radius: 3px;
    text-align: center;
    padding: 1px 6px;
    font-feature-settings: "lnum";
    font-variant: lining-nums;
    letter-spacing: 1px;
    font-weight: normal;
  }
</style>
