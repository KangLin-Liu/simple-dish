<template>
  <div>
    <div class="search-box" :style="bgImage">
      <van-search v-model="value" class="search" @input="keyword" placeholder="请输入搜索关键词" />
      <div class="list" v-if="isSearch">
        <!-- <div v-for="(item,index) in searchResult" :key="index"> -->
        <!-- {{item.name}} -->
        <van-cell
          class="detail"
          @click="select(item)"
          :title="item.name"
          v-for="(item,index) in searchResult"
          :key="index"
        />
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      isSearch: false,
      searchResult: [],
      bgImage: {
        backgroundImage:
          "url(" + require("../assets/images/search/bg.jpg") + ")"
      }
    };
  },
  methods: {
    keyword() {
      if (this.value) {
        this.isSearch = true;
        this.axios(
          `/dish/search?keyword=${this.value}&num=10&appkey=90f6571199fb444271209711e16cf357`
        ).then(res => {
          // console.log(res);
          this.searchResult = res.data.result.result.list;
        });
      } else {
        this.isSearch = false;
        this.searchResult = [];
      }
    },
    select(item) {
      // console.log(item);
      this.$router.push({ name: "Detail", params: item });
    }
    // watch: {
    //   $route(to, from) {
    //     if (to.name == "Search") {
    //       this.value = "";
    //       this.isSearch = false;
    //       this.searchResult = [];
    //     }
    //   }
    // }
  },
  watch: {
    $route(to, from) {
      if (to.name == "Search") {
        this.value = "";
        this.isSearch = false;
        this.searchResult = [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.search-box {
  width: 100vw;
  height: 100vh;
  background-size: contain;
  // opacity: 0.5;
  position: relative;
  .search {
    opacity: 0.9;
    position: absolute;
    top: 40%;
    width: 315px;
    left: 30px;
    border-radius: 20px;
  }
  .list {
    position: absolute;
    top: calc(40% + 53px);
    left: calc(30px + 16px);
    font-size: 16px;
    max-height: 200px;
    width: 283px;
    overflow: auto;
    .detail {
      background-color: rgba(255, 255, 255, 0.7);
    }
  }
}
</style>