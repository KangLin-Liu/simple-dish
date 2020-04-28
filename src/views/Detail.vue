<template>
  <div>
    <van-nav-bar class="top" fixed :title="resData.name" left-arrow @click-left="$router.go(-1)" />
    <div class="margin-top"></div>
    <div class="detail">
      <div class="img">
        <img :src="resData.pic" alt />
      </div>
      <div class="tag">
        <van-tag
          plain
          :color="tagColor[index]"
          v-for="(item, index) in resTag"
          :key="index"
        >{{item}}</van-tag>
      </div>
      <div class="content">
        <p ref="describe">{{resData.content}}</p>
        <div>
          <span>准备时间：{{resData.preparetime}}</span>
          <span>烹饪时间：{{resData.cookingtime}}</span>
        </div>
      </div>
      <van-collapse v-model="activeName">
        <van-collapse-item size="large" title="马上查看制作步骤" name="1">
          <div class="material">
            <div class="main">
              <div>主料</div>
              <!-- <div v-for="(item,index) in mainMaterial" :key="index">{{item.mname}}:{{item.amount}}<van-divider /></div> -->
              <span v-for="(item,index) in mainMaterial" :key="index">{{item.mname}}:{{item.amount}}</span>
            </div>
            <div class="accessories">
              <div>辅料</div>
              <!-- <div v-for="(item,index) in mainMaterial" :key="index">{{item.mname}}:{{item.amount}}<van-divider /></div> -->
              <span
                v-for="(item,index) in accessoriesMaterial"
                :key="index"
              >{{item.mname}}:{{item.amount}}</span>
            </div>
          </div>
          <div class="make">
            <div v-for="(item,index) in resData.process" :key="index">
              <div class="step">步骤{{index+1}}/{{resData.process.length}}</div>
              <div class="makeDescribe" ref="makeDescribe">{{makeDescribe[index]}}</div>
              <div>
                <img :src="item.pic" alt />
              </div>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
      <div class="star">
        <img :src="starSrc[isSelect]" @click="collect(resData.id)" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: ["1"],
      resData: {},
      resTag: [], //标签数组
      resmaterial: [], //材料
      mainMaterial: [], //主料
      accessoriesMaterial: [], //辅料
      makeDescribe: [],
      isSelect: 0, //是否被收藏 0否 1是
      starSrc: [
        require("../assets/images/detail/star.png"),
        require("../assets/images/detail/star_active.png")
      ],
      tagColor: [
        "#1989fa",
        "#07c160",
        "#ee0a24",
        "#7232dd",
        "#ff976a",
        "#1989fa",
        "#07c160",
        "#ee0a24",
        "#7232dd",
        "#ff976a",
        "#1989fa",
        "#07c160",
        "#ee0a24",
        "#7232dd",
        "#ff976a",
        "#1989fa",
        "#07c160",
        "#ee0a24",
        "#7232dd",
        "#ff976a",
        "#ff976a",
        "#1989fa",
        "#07c160",
        "#ee0a24",
        "#7232dd",
        "#ff976a"
      ]
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "Detail") {
        this.resData = this.$route.params;
        // this.describe = this.$route.params.content;
        // console.log(this.resData);
        this.adjustContent();
        this.resTag = this.$route.params.tag.split(",");
        this.resmaterial = this.$route.params.material;
        this.adjustMaterial(this.resmaterial);
        this.adjustMakeDescribe();
        if (this.$store.state.collectArr.find(v => v == this.resData.id)) {
          this.isSelect = 1;
        } else {
          this.isSelect = 0;
        }
      }
    }
  },
  methods: {
    adjustContent() {
      //   this.describe.replace(/<br\/>/,"<br>&nbsp;");
      this.$nextTick(() => {
        this.$refs.describe.innerHTML = this.resData.content;
      });
    },
    //对制作描述进行修改
    adjustMakeDescribe() {
      this.makeDescribe = [];
      for (let i = 0; i < this.resData.process.length; i++) {
        let content = this.resData.process[i].pcontent.replace(
          /<br \/>/g,
          "\n"
        );
        this.makeDescribe.push(content);
      }
      // console.log(this.makeDescribe);
      //   this.$nextTick(() => {
      //     this.$refs.makeDescribe.innerHTML = this.resData.process.pcontent;
      //   });
    },
    adjustMaterial(item) {
      this.mainMaterial = item.filter(v => {
        return v.type == 1;
      });
      this.accessoriesMaterial = item.filter(v => {
        return v.type == 0;
      });
    },
    //收藏
    collect(id) {
      if (this.$store.state.loginFlag) {
        if (this.isSelect == 0) {
          this.$store.commit("collectDish", id);
          this.isSelect = 1;
          this.$toast.success("收藏成功");
          // console.log(this.$store.state.collectArr);
        } else {
          this.$store.commit("removeDish", id);
          this.isSelect = 0;
          this.$toast.success("取消收藏");
          // console.log(this.$store.state.collectArr);
        }
      } else {
        this.$toast("请登录后再进行收藏");
      }
    }
  },
  created() {
    // console.log(this.$route.params);
    this.resData = this.$route.params;
    // this.describe = this.$route.params.content;
    this.adjustContent();
    this.resTag = this.$route.params.tag.split(",");
    this.resmaterial = this.$route.params.material;
    this.adjustMaterial(this.resmaterial);
    this.adjustMakeDescribe();
    //检查是否被收藏
    if (this.$store.state.collectArr.find(v => v == this.resData.id)) {
      this.isSelect = 1;
    } else {
      this.isSelect = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.margin-top {
  margin-top: 56px;
}
.detail {
  width: 375px;
  position: relative;
  .img {
    width: 230px;
    height: 230px;
    margin: auto;
    // width: 100%;
    img {
      border-radius: 20px;
      width: 100%;
      height: 100%;
    }
  }
  .content {
    p {
      color: #888988;
      font-size: 16px;
      margin: 0 20px 0 20px;
      line-height: 22px;
      max-height: 200px;
      overflow: auto;
    }
    span {
      margin-left: 10px;
      font-size: 16px;
    }
  }
  .tag {
    margin-left: 10px;
    margin-top: 10px;
    .van-tag {
      font-size: 16px;
      font-weight: bold;
      margin: 4px 4px 4px 10px;
    }
  }
  //   .material {
  //     //   border: 4px solid #ccc;
  //     //   display: flex;
  //       font-size: 20px;
  //       font-weight: bold;
  //       .main{
  //         //   flex: 0 0 200px;
  //           text-align: center;
  //       }
  //       .accessories{
  //           text-align: center;
  //         //   flex: 1;
  //       }
  //     .van-panel {
  //       font-size: 16px;
  //     //   color: #f3742c;
  //       border-bottom: 2px solid #ccc;
  //       padding: 0px 10px 10px 10px;
  //       margin: 0 10px;
  //     }
  //   }
  //   .material {
  //       .main{
  //           float: left;
  //       }
  //       .accessories{
  //           float: left;
  //       }
  //   }
  .material {
    font-size: 20px;
    font-weight: bold;
    color: red;
    margin: -20px 0 10px 10px;
    line-height: 1.5;
    // border: 4px solid #ccc;
  }
  .make {
    font-size: 16px;
    // margin: 10px 20px;
    margin-left: 10px;
    .step {
      color: #888888;
    }
    img {
      //   margin: 10px 82.5px;
      width: 190px;
      height: 142px;
      margin-left: 66.5px;
      border-radius: 20px;
    }
    .makeDescribe {
      line-height: 1.5;
    }
  }
  .star {
    // width: 32px;
    // height: 32px;
    position: absolute;
    top: 10px;
    right: 20px;
    img {
      width: 32px;
      height: 32px;
    }
  }
}
</style>