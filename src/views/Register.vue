<template>
  <div>
    <van-nav-bar class="top" fixed title="注册" left-arrow @click-left="$router.go(-1)" />
    <div class="margin-top"></div>
    <van-form @submit="register">
      <van-field
        required
        v-model="phone"
        name="手机号"
        label="手机号"
        placeholder="请输入11位有效手机号码"
        autocomplete="off"
      />
      <van-field
        required
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码可以是数字和字母，长度6-16位"
      />
      <van-field
        required
        v-model="rePassword"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="请确认密码"
      />
      <div style="margin: 20px;">
        <van-button round type="info" block native-type="submit">点击注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      password: "",
      rePassword: ""
    };
  },
  watch: {
    $route(to,from){
      if(to.name == 'Register'){
        this.phone = this.password = this.rePassword = "";
      }
    }
  },
  methods: {
    register() {
      // console.log(this.phone, this.password, this.rePassword);
      let phone = /^1[3456789]\d{9}$/;
      let key = /^[0-9a-zA-Z]{6,16}$/;
      if (
        phone.test(this.phone) &&
        key.test(this.password) &&
        this.password == this.rePassword
      ) {
        // console.log("注册成功");
        this.$store.state.phone = this.phone;
        this.$store.state.password = this.password;
        this.$store.state.rePassword = this.rePassword;
        const toast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "注册成功,3秒后跳转"
        });
        let second = 3;
        const timer = setInterval(() => {
          second--;
          if (second) {
            toast.message = `注册成功,${second}秒后跳转`;
          } else {
            clearInterval(timer);
            // 手动清除 Toast
            this.$toast.clear();
          }
        }, 1000);
        const a = setTimeout(()=>{
          this.$router.push({name:'Login'});
        },3000)
      }else{
         this.$toast.fail('注册失败');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.margin-top {
  margin-top: 56px;
}
</style>