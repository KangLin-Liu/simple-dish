<template>
  <div class="home">
    <van-row class="top">
      <van-col span="12">
        <van-image :src="logoSrc" />简餐
      </van-col>
    </van-row>
    <div class="loop">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in loopImages" :key="index">
          <img class="auto-img img" :src="image.src" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="good-dish">
      <div class="good-title">精品好菜</div>
      <van-row>
        <van-col
          @click="select(item)"
          class="item"
          span="12"
          v-for="(item,index) in goodList"
          :key="index"
        >
          <div>
            <img :src="item.pic" alt />
          </div>
          <div class="name">{{item.name}}</div>
          <div class="tag">{{item.tag}}</div>
        </van-col>
      </van-row>
    </div>
    <div class="good-dish">
      <div class="good-title">猜你喜欢</div>
      <van-row>
        <van-col
          @click="select(item)"
          class="item"
          span="12"
          v-for="(item,index) in likeList"
          :key="index"
        >
          <div>
            <img :src="item.pic" alt />
          </div>
          <div class="name">{{item.name}}</div>
          <div class="tag">{{item.tag}}</div>
        </van-col>
      </van-row>
    </div>
    <van-divider :style="{ color: '#f27638', borderColor: '#f27638', padding: '0 16px' }">我是有底线的</van-divider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoSrc: require("../assets/images/main/logo.png"),
      loopImages: [
        { src: require("../assets/images/main/loop/loop1.jpg") },
        { src: require("../assets/images/main/loop/loop2.jpg") },
        { src: require("../assets/images/main/loop/loop3.jpg") },
        { src: require("../assets/images/main/loop/loop4.jpg") }
      ],
      goodList: [],
      likeList: []
    };
  },
  methods: {
    select(item) {
      console.log(item);
      this.$router.push({ name: "Detail", params: item });
    }
  },
  mounted() {
    for (let i = 1; i < 7; i++) {
      this.axios(
        `/dish/detail?id=${i}&appkey=90f6571199fb444271209711e16cf357`
      ).then(res => {
        this.goodList.push(res.data.result.result);
      });
    }
    for (let i = 10; i < 14; i++) {
      this.axios(
        `/dish/detail?id=${i}&appkey=90f6571199fb444271209711e16cf357`
      ).then(res => {
        this.likeList.push(res.data.result.result);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  .top {
    height: 46px;
    line-height: 46px;
    text-align: center;
    color: #f27638;
    font-size: 24px;
    .van-image {
      vertical-align: middle;
      height: 32px;
      width: 32px;
    }
  }
  .loop {
    .img {
      height: 210px;
    }
  }
  .good-dish {
    line-height: 1.5;
    .good-title {
      margin: 10px 0 10px 20px;
      font-size: 24px;
      font-weight: bold;
      color: #f27638;
    }
    .item {
      padding: 0 10px;
      margin-bottom: 10px;
      img {
        width: 150px;
        border-radius: 20px;
        display: block;
        margin: 0 auto;
      }
      .name {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
      }
      .tag {
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #666666;
      }
    }
  }
}
</style>