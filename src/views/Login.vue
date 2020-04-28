<template>
  <div>
    <van-nav-bar class="top" fixed title="登录" left-arrow @click-left="$router.go(-1)" />
    <div class="margin-top"></div>
    <van-form @submit="onSubmit">
      <van-field
        required
        v-model="loginPhone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        autocomplete="off"
      />
      <van-field
        required
        v-model="loginPassword"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
      />
      <div class="button" style="margin: 20px;">
        <van-button round block type="info" native-type="submit">确认登录</van-button>
      </div>
    </van-form>
    <div class="button" style="margin: 20px;">
      <van-button round block type="info" @click="register">没有账号？前往注册</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginPhone: "",
      loginPassword: ""
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "Login") {
        this.loginPhone = this.loginPassword = "";
      }
    }
  },
  methods: {
    onSubmit() {
      if (
        this.loginPhone == this.$store.state.phone &&
        this.loginPassword == this.$store.state.password &&
        this.loginPhone != ""
      ) {
        console.log("登录成功");
        this.$store.state.loginFlag = true;
        const toast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "登录成功,3秒后跳转"
        });
        let second = 3;
        const timer = setInterval(() => {
          second--;
          if (second) {
            toast.message = `登录成功,${second}秒后跳转`;
          } else {
            clearInterval(timer);
            // 手动清除 Toast
            this.$toast.clear();
          }
        }, 1000);
        const a = setTimeout(() => {
          this.$router.push({ name: "My" });
        }, 3000);
      } else {
        this.$toast.fail("手机号或者密码错误");
      }
    },
    register() {
      this.$router.push({ name: "Register" });
    }
  }
};
</script>

<style lang="scss" scoped>
.margin-top {
  margin-top: 56px;
}
.button {
  text-align: center;
  .van-button {
    margin-right: 20px;
  }
}
</style>