<template>
  <div
    :id="`bid-${stream.stream_data.id}`"
    class="st-wrapper"
    :style="{ 'background': imgSource }"
  >
    <div class="live-btn-wrapper">
      <div class="live-btn">
        LIVE
      </div>
    </div>

    <div class="st-profile-wrapper">
      <div class="st-profile-desc">
        <div class="st-profile-img">
          <img
            :src="stream.stream_data.user_data.profile_image_url"
            alt=""
          >
        </div>

        <div class="st-profile-title">
          {{ stream.user_name }}
        </div>
        <div class="st-time-wrapper">
          <img src="~assets/clock-ic.svg" class="st-profile-dot">
          <div class="st-profile-time">
            {{ calcTimeDiff(stream.stream_data.started_at) }}
          </div>

          <div class="st-views">
            <div class="st-view-icon">
              <img class="views-img" src="~assets/svgs/eye-ic.svg" alt="views">
              <span class="st-views-number">
                {{ formatNumberWithDots(stream.stream_data.viewer_count) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import common from '~/mixins/common'
export default {
  name: 'BroadcastElement',
  mixins: [common],
  props: {
    stream: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    imgSource () {
      const thumbnailUrl = this.stream.stream_data.thumbnail_url.replace('{width}', '888').replace('{height}', '500') + '?date=' + Date.now()
      return 'url("' + thumbnailUrl + '")'
    }
  }
}
</script>

<style scoped>
  .st-wrapper {
    position: relative;
    width: 100%;
    padding-top: 198%;
    background-position: center!important;
    background-size: auto 100%!important;
    background-repeat: no-repeat!important;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  @media  (min-width:768px) {
    .st-wrapper {
      padding-top: 175.4%;
      border-radius: 3px;
    }
  }

  .st-views {
    display: inline-block;
    min-width: 55px;
    width: auto;
    height: 16px;
    padding-left: 3px;
  }

  @media (max-width:360px) {
    .st-views {
      display: none!important;
    }
  }

  @media  (min-width:768px) and (max-width:1200px) {
    .st-views {
      display: none!important;
    }
  }

  .st-view-icon {
    width: 13px;
    display: inline-block;
    vertical-align: middle;
  }

  @media (min-width:768px) {
    .st-view-icon {
      width: 20px;
    }

    .st-view-icon img {
      width: auto;
      height: 13px;
    }
  }

  .st-views-number {
    font-size: 12px;
    font-family: National;
    font-weight: normal;
    font-feature-settings: "lnum";
    font-variant: lining-nums;
    color: #636161;
  }

  @media (min-width:768px) {
    .st-views-number {
      font-size: 18px;
      line-height: 28px;
      letter-spacing: -0.03em;
      font-feature-settings: 'tnum' on, 'lnum' on;
      color: #979797;
    }
  }

  .st-profile-wrapper {
    display: flex;
    position: absolute;
    background: rgb(26,26,26);
    background: linear-gradient(0deg, rgba(21,21,21,1) 0%, rgba(21,21,21,0.7) 50%, rgba(21,21,21,0) 100%);
    height: 105px;
    left: 0;
    right: 0;
    bottom: -1px;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-bottom: 3px solid #000;
  }

  @media (min-width:768px) {
    .st-profile-wrapper {
      height: unset;
      min-height: 105px;
    }
  }

  .st-profile-img {
    text-align: center;
  }

  .st-profile-img img {
    min-height: 70px;
    max-height: 70px;
    max-width: 90%;
  }

  .st-profile-desc {
    flex: 1;
  }

  .st-profile-title {
    line-height: 1;
    color: #fff;
    text-align: center;
    font-family: National;
    font-size: 18px;
    text-shadow: rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px, rgb(0, 0, 0) -0.832294px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.701566px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.421592px -1.95506px 0px, rgb(0, 0, 0) 0.567324px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.558831px 0px;
    margin-top: -14px;
  }

  @media (min-width:768px) {
    .st-profile-title {
      font-family: BatmanForever;
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      line-height: 28px;
    }
  }

  .st-time-wrapper {
    margin-top: 8px;
    padding-left: 7px;
    padding-right: 7px;
    padding-bottom: 8px;
  }

  @media (min-width:768px) {
    .st-time-wrapper {
      padding-bottom: 3px;
      margin-top: 3px;
    }
  }

  .st-profile-dot {
    display: inline-block;
    width: 11px;
    height: 11px;
    border-radius: 50%;
  }

  @media (min-width:768px) {
    .st-profile-dot {
      width: 15px;
      height: auto;
      vertical-align: middle;
    }
  }

  .st-profile-time {
    color: #fff;
    display: inline-block;
    font-size: 11px;
    line-height: 17px;
  }

  @media (min-width:768px) {
    .st-profile-time {
      font-family: NationalMedium;
      font-weight: 600;
      font-feature-settings: 'tnum' on, 'lnum' on;
      font-size: 18px;
      line-height: 28px;
      vertical-align: middle;
      margin-left:5px;
    }
  }

  .live-btn-wrapper {
    display: inline-block;
    position: absolute;
    right:5px;
    top: 5px;
    width: 35px;
    background-color: #e4012b;
    color: #fff;
    border-radius: 2px;
  }

  @media (min-width:768px) {
    .live-btn-wrapper {
      width: 50px;
      border-radius: 3px;
    }
  }

  .live-btn {
    line-height: 15px;
    text-align: center;
    font-size: 8px;
    font-family: National;
    letter-spacing: 1px;
  }

  @media (min-width:768px) {
    .live-btn {
      font-size: 14px;
      line-height: 22px;
      align-items: center;
      text-align: center;
      letter-spacing: 0.05em;
    }
  }
</style>
