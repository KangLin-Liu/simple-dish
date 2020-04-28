<template>
  <div>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
    <div class="margin-bottom"></div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/main/home">首页</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/main/sort">分类</van-tabbar-item>
      <van-tabbar-item icon="search" to="/main/search">搜索</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/main/my">我的收藏</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style lang="scss" scoped>
.margin-bottom {
  margin-bottom: 50px;
}
</style>