<template>
  <div>
    <h3 class="title">分类</h3>
    <!-- <van-search placeholder="请输入搜索关键词" input-align="center" /> -->
    <div class="menu">
      <div class="left" ref="left">
        <ul>
          <li
            @click="selectList(index)"
            class="left-list"
            v-for="(item,index) in sortData"
            :key="index"
            :class="{active:currentIndex == index}"
          >
            <img class="img" :src="imgSrc[index]" alt />
            {{item.name}}
          </li>
        </ul>
      </div>
      <div class="right" ref="right">
        <div>
          <div ref="content" v-for="(item,index) in sortData" :key="index">
            <van-divider
              :style="{ color: '#f27638', borderColor: '#f27638', padding: '0 16px' }"
            >{{item.name}}</van-divider>
            <van-row class="content">
              <van-col
                @click="selectContent(value)"
                span="8"
                v-for="(value,i) in item.list"
                :key="i"
              >{{value.name}}</van-col>
            </van-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      imgSrc: [
        require("../assets/images/sort/1.png"),
        require("../assets/images/sort/2.png"),
        require("../assets/images/sort/3.png"),
        require("../assets/images/sort/4.png"),
        require("../assets/images/sort/5.png"),
        require("../assets/images/sort/6.png"),
        require("../assets/images/sort/7.png"),
        require("../assets/images/sort/8.png"),
        require("../assets/images/sort/9.png"),
        require("../assets/images/sort/10.png"),
        require("../assets/images/sort/11.png")
      ],
      sortData: [],
      currentIndex: 0,
      contentHeight: 0
    };
  },
  methods: {
    //左边分类列表进行选择
    selectList(index) {
      //每次进来先把高度清空
      this.contentHeight = 0;
      // console.log(index);
      this.currentIndex = index;
      // console.log(this.$refs.content[index]);
      // console.log(
      //   this.$refs.content[index].offsetHeight,
      //   this.$refs.content.length
      // );
      //高度进行累加
      for (let i = 0; i < index; i++) {
        //16为margin的值
        this.contentHeight += this.$refs.content[i].offsetHeight + 16;
      }
      // console.log(this.contentHeight);
      this.scrollRight.scrollTo(0, -this.contentHeight, 500);
    },
    //进行初始化
    initScroll() {
      if (!this.scrollLeft) {
        this.scrollLeft = new BScroll(this.$refs.left, {
          click: true
        });
      } else {
        this.scrollLeft.refresh();
      }
      if (!this.scrollRight) {
        this.scrollRight = new BScroll(this.$refs.right, {
          click: true, //可以点击
          probeType: 2 //设置探针
        });
        this.scrollRight.on("scroll", this.getHeight);
        this.scrollRight.on("scrollEnd", this.getHeight);
      } else {
        this.scrollRight.refresh();
      }
    },
    //获取高度
    getHeight() {
      let index = 0;
      //当top减去顶部46再减去margin的值16取反大于0，后面的会覆盖前面的index，进行更换
      for (let i = 0; i < this.$refs.content.length; i++) {
        let { top } = this.$refs.content[i].getBoundingClientRect();
        top = Math.ceil(-(top - 46 - 16));
        if (top >= 0) {
          index = i;
        }
      }
      this.currentIndex = index;
    },
    //选择右边内容区
    selectContent(value) {
      // console.log(value);
      this.axios(
        `/dish/byclass?classid=${value.classid}&start=0&num=10&appkey=90f6571199fb444271209711e16cf357`
      ).then(res => {
        // console.log(res);
        this.$router.push({
          name: "List",
          params: { list: res.data.result.result, name: value }
        });
      });
    }
  },
  mounted() {
    this.axios("/dish//recipe_class?appkey=90f6571199fb444271209711e16cf357")
      .then(res => {
        // console.log(res);
        this.sortData = res.data.result.result;
        this.$nextTick(() => {
          this.initScroll();
        });
      })
      .catch(err => {
        // console.log(err);
      });
  },
  beforeDestroy() {
    if (this.scrollLeft) {
      this.scrollLeft.destroy();
      this.scrollLeft = null;
    }

    if (this.scrollRight) {
      this.scrollRight.destroy();
      this.scrollRight = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  color: white;
  height: 46px;
  line-height: 46px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  background-color: #f27638;
}
.menu {
  display: flex;
  //   height: 50vh;
  height: calc(100vh - 46px - 50px);
  .left {
    flex: 0 0 100px;
    height: 100%;
    background-color: #f7f8fa;
    overflow: hidden;
    .left-list {
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 16px;
      &.active {
        background-color: white;
        color: red;
      }
    }
  }
  .img {
    width: 16px;
    height: 16px;
  }
  .right {
    flex: 1;
    // background-color: #f0f0f0;
    height: 100%;
    overflow: hidden;
    .content {
      font-size: 16px;
      .van-col {
        height: 60px;
        line-height: 60px;
        text-align: center;
      }
    }
  }
}
</style>