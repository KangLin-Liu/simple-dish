<template>
  <div>
    <van-nav-bar
      class="top"
      fixed
      :title="resData.name.name+'系列'"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="margin-top"></div>
    <div class="allList" >
    <div class="list" @click="select(item)" v-for="(item,index) in resData.list.list" :key="index">
        <div>
            <img :src="item.pic" alt="">
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
            resData:{},
            // bgImage:'url('+require('../assets/images/list/bg.jpg')+')',
        }
    },
    methods: {
        select(item){
            console.log(item);
            this.axios(`/dish/detail?id=${item.id}&appkey=90f6571199fb444271209711e16cf357`).then(res=>{
                console.log(res);
                this.$router.push({name:'Detail',params:item});
            })
        }
    },
    watch: {
        $route(to,from){
            if(to.name == "List" && from.name == "Sort"){
                this.resData = this.$route.params;
                console.log(this.resData);
            }
        }
        
    },
    created() {
        console.log(this.$route.params);
        this.resData = this.$route.params;
    },
};
</script>

<style lang="scss" scoped>
.margin-top {
  margin-top: 46px;
}
.allList{
    // background: no-repeat;
    background-size: contain;
}
.list{
    display: flex;
    height: 100px;
    margin: 20px;
    border: 3px solid #ccc;
    border-radius: 10px;
    box-shadow: 10px 10px 10px #ccc;
    position: relative;
    img{
        width: 80px;
        border-radius: 50%;
        margin: 10px;
    }
    .content{
        font-size: 16px;
        margin-top: 30px;
    }
    .van-tag{
        width: 16px;
        position: absolute;
        left: 10px;
    }
}
</style>