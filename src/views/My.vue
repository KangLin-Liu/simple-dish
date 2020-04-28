<template>
  <div>
    <van-empty image="search" v-if="!$store.state.loginFlag">
      <van-button @click="goLogin" round type="danger" class="bottom-button">请登录后查看</van-button>
    </van-empty>
    <div v-else>
      <div class="top">
        <van-image :src="logoSrc" />简餐用户
        <span>{{$store.state.phone}}</span>
        <div>我的收藏菜谱<span>{{listArr.length}}</span></div>
      </div>
      <div class="list" @click="select(item)" v-for="(item,index) in listArr" :key="index">
        <div>
          <img :src="item.pic" alt />
        </div>
        <van-tag mark type="warning">{{index+1}}</van-tag>
        <div class="content">
          <h3>{{item.name}}</h3>
          <p>食用人数：{{item.peoplenum}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoSrc: require("../assets/images/main/logo.png"),
      idArr: [],
      listArr: []
    };
  },
  methods: {
    goLogin() {
      this.$router.push({ name: "Login" });
    },
    select(item) {
      console.log(item);
      this.axios(
        `/dish/detail?id=${item.id}&appkey=90f6571199fb444271209711e16cf357`
      ).then(res => {
        console.log(res);
        this.$router.push({ name: "Detail", params: item });
      });
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "My" && this.$store.state.loginFlag) {
        this.listArr = [];
        this.idArr = this.$store.state.collectArr;
        this.idArr.forEach(v => {
          this.axios(
            `/dish/detail?id=${v}&appkey=90f6571199fb444271209711e16cf357`
          ).then(res => {
            console.log(res.data.result.result);
            this.listArr.push(res.data.result.result);
          });
        });
      }
    }
  },
  created() {
    this.idArr = this.$store.state.collectArr;
  },
  mounted() {
    this.idArr.forEach(v => {
      this.axios(
        `/dish/detail?id=${v}&appkey=90f6571199fb444271209711e16cf357`
      ).then(res => {
        console.log(res.data.result.result);
        this.listArr.push(res.data.result.result);
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.top {
  text-align: center;
  font-size: 16px;
  height: 46px;
  line-height: 46px;
  margin-bottom: 60px;
  .van-image {
    vertical-align: middle;
    margin-right: 6px;
    width: 32px;
  }
  span {
    font-weight: bold;
    color: #f27638;
  }
}
.list {
  display: flex;
  height: 100px;
  margin: 20px;
  border: 3px solid #ccc;
  border-radius: 10px;
  box-shadow: 10px 10px 10px #ccc;
  position: relative;
  img {
    width: 80px;
    border-radius: 50%;
    margin: 10px;
  }
  .content {
    font-size: 16px;
    margin-top: 30px;
  }
  .van-tag {
    width: 16px;
    position: absolute;
    left: 10px;
  }
}
</style>