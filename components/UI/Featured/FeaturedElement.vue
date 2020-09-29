<template>
  <div class="featured-slide-container">
    <div class="featured-slide">
      <div class="featured-video-wrapper">
        <img
          :id="`fid-${source.id}`"
          v-lazy="source.thumbnail"
          class="featured-video-img img h-100 w-100"
          alt="Youtube placeholder"
        >

        <div v-if="source.duration" class="duration-wrapper">
          <span>
            {{ parseISO8601(source.duration) }}
          </span>
        </div>
      </div>

      <div class="featured-video-info">
        <div class="featured-desc-logo">
          <div class="featured-desc-logo-container">
            <img :src="source.avatar" alt="video yt logo">
          </div>
        </div>

        <div class="featured-video-desc">
          <div class="featured-desc-title-wrapper">
            <h3 class="featured-desc-title">
              {{ source.title }}
            </h3>
          </div>

          <p class="featured-video-author">
            <span v-if="source.source === 'youtube_video'"><img src="~assets/svgs/Youtube.svg" alt="Youtube icon"></span>
            <span v-if="source.source === 'twitch_clip'"><img src="~assets/svgs/twitch-logo.svg" alt="Youtube icon"></span>
            <span class="author-by">by</span>
            <span class="author-name">
              {{ source.name }}
            </span>
          </p>

          <div class="featured-video-meta">
            <div v-if="source.created_at" class="ft-meta-div ft-meta-since">
              {{ calcSinceDate(source.created_at) }}
            </div>
            <div v-if="source.views" class="ft-meta-div ft-meta-views">
              <img src="~assets/svgs/eye-ic.svg" class="ft-eye-icon"><div class="ft-views">
                {{ formatNumberShort(source.views) }}
              </div>
            </div>
            <div v-if="source.likes" class="ft-meta-div ft-meta-likes">
              <img src="~assets/heart-icon.png" class="ft-heart-icon"><div class="ft-likes">
                {{ formatNumberWithDots(source.likes) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import common from '~/mixins/common'
import videoComponent from '~/mixins/videoComponent'
export default {
  name: 'FeaturedElement',
  mixins: [common, videoComponent]
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

  .featured-slide {
    width: 100%;
    position: relative;
  }

  @media (min-width:768px) {
    .featured-slide {
      padding-bottom: 4px;
    }
  }

  .featured-video-thumb {
    width: 100%;
    height: auto;
  }

  .featured-video-info {
    display: flex;
    background-color: #191d20;
    padding: 10px 10px 11px 10px;
    border-bottom: 2px solid #252627;
    border-radius: 3px;
  }

  @media (min-width:768px) {
    .featured-video-info {
      background-color: #1d1d1d;
      border-bottom-color: #000;
      padding-bottom: 15px;
    }
  }

  .featured-desc-logo {
    display: inline-block;
  }

  .featured-desc-logo-container {
    width: 81px;
    padding-right: 10px;
    position: relative;
  }

  .featured-desc-title {
    font-size: 14px;
    line-height: 1.35;
    color: #fff;
    font-weight: normal;
  }

  @media (min-width:768px) {
    .featured-desc-title {
      padding-top: 2px;
      font-size: 24px;
      font-weight: normal;
      font-family: National;
      line-height: 27px;
    }
  }

  .featured-desc-title-wrapper {
    height: 35px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  @media (min-width:768px) {
    .featured-desc-title-wrapper {
      height: 55px;
    }
  }

  .featured-video-desc {
    display: inline-block;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width:768px) {
    .featured-video-desc {
      padding-top: 6px;
    }
  }

  .featured-desc-text {
    color: #F2F2F2;
  }

  .featured-desc-logo img {
    width: 100%;
  }

  .featured-video-meta {
    margin-top: 3px;
    min-width: 180px;
  }

  @media (min-width:768px) {
    .featured-video-meta {
      margin-top: 9px;
    }
  }

  .featured-video-author {
    margin: 0;
    margin-top: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1;
  }

  @media (min-width:768px) {
    .featured-video-author {
      margin-top: 6px;
    }
  }

  .featured-video-author img {
    width: 13px;
  }

  @media (min-width:768px) {
    .featured-video-author img {
      width: 20px;
    }
  }

  .featured-video-wrapper {
    position: relative;
    width: 100%;
    padding-top: 56%;
    position: relative;
    overflow: hidden;
  }

  .youtube-src .featured-video-img,
  .featured-video-img {
    position: absolute;
    top: -16%;
    left: 0;
    height: auto!important;
    width: 100%!important;
  }

  .twitch-src .featured-video-img {
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

  @media (min-width:768px) {
    .author-by {
      font-family: NationalLight;
      font-style: normal;
      font-weight: 700;
      line-height: 27px;
      letter-spacing: 0.01em;
      mix-blend-mode: normal;
      font-size: 21px;
      color: #828282;
    }
  }

  .author-name {
    color: #e4002b;
    font-size: 14px;
    font-family: NationalSemiBold;
  }

  @media (min-width:768px) {
    .author-name {
      font-size: 21px;
      font-family: BatmanForever;
      text-transform: uppercase;
      margin-left: 6px;
    }
  }

  .ft-meta-div {
    display: inline-block;
    color: #b3b2b2;
    font-size: 12px;
    font-family: National;
    line-height: 1.5;
    letter-spacing: 0;
    font-feature-settings: "lnum";
    font-variant: lining-nums;
  }

  @media (min-width:768px) {
    .ft-meta-div {
      font-size: 17px;
    }
  }

  .ft-meta-views {
    color: #8f8f8f;
    margin-right: 5px;
    font-weight: 600;
  }

  @media (min-width:768px) {
    .ft-meta-views {
      vertical-align: sub;
    }
  }

  @media  (min-width:768px) and (max-width:899px) {
    .ft-meta-views {
      display: none;
    }
  }

  .ft-meta-likes {
    color: #8f8f8f;
  }

  @media (max-width:360px) {
    .ft-meta-likes {
      display: none!important;
    }
  }

  @media (min-width:768px) {
    .ft-meta-likes {
      vertical-align: sub;
    }
  }

  @media (min-width:768px) and (max-width:1100px) {
    .ft-meta-likes {
      display: none;
    }
  }

  .ft-eye-icon {
    display: inline-block;
    height: 9px;
    width: auto;
    margin-right: 5px;
    vertical-align: baseline;
  }

  @media (min-width: 768px) {
    .ft-eye-icon {
      height: 12px;
    }
  }

  .ft-heart-icon {
    display: inline-block;
    height: 10px;
    width: auto;
    margin-right: 5px;
    padding-top: 2px;
    vertical-align: baseline;
  }

  @media (min-width: 768px) {
    .ft-heart-icon {
      height: 13px;
    }
  }

  .ft-meta-since {
    font-family: NationalLight;
    color: #fff;
    margin-right: 5px;
    vertical-align: middle;
    font-feature-settings: 'tnum' on, 'lnum'
  }

  @media (min-width: 768px) {
    .ft-meta-since {
      text-shadow: rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px, rgb(0, 0, 0) -0.832294px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.701566px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.421592px -1.95506px 0px, rgb(0, 0, 0) 0.567324px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.558831px 0px;
    }
  }

  .ft-views {
    display: inline-block;
    letter-spacing: 0;
    color: #636161;
  }

  @media (min-width: 768px) {
    .ft-views {
      font-family: NationalBook;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 27px;
      letter-spacing: -0.03em;
      font-feature-settings: 'tnum' on, 'lnum' on;
      color: #979797;
    }
  }

  .ft-likes {
    display: inline-block;
    color: #636161;
  }

  @media (min-width: 768px) {
    .ft-likes {
      font-family: NationalBook;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 27px;
      letter-spacing: -0.03em;
      font-feature-settings: 'tnum' on, 'lnum' on;
      color: #979797;
    }
  }

  .duration-wrapper {
    position: absolute;
    right: 8px;
    bottom: 8px;
    min-width: 35px;
    color: #e2e2e2;
    background-color: #000;
    font-size: 12px;
    font-family: NationalMedium;
    border-radius: 3px;
    text-align: center;
    padding: 0 6px;
    font-feature-settings: "lnum";
    font-variant: lining-nums;
  }

  @media (min-width: 768px) {
    .duration-wrapper {
      font-size: 18px;
      border-radius: 4px;
      right: 10px;
      bottom: 11px;
    }
  }
</style>
