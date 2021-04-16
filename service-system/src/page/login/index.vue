<template>
  <div class="login">
    <div class="body">
      <div class="l_item">用户名</div>
      <Input v-model="username" size="large" placeholder="用户名" />
      <div class="l_item">密码</div>
      <Input
        :type="'password'"
        v-model="password"
        size="large"
        placeholder="密码"
      />
      <Button
        style="width: 100%; margin-top: 15px"
        size="large"
        type="info"
        @click="login"
        >登录</Button
      >
    </div>
  </div>
</template>

<script>
import api from "../../api/home";
var qs = require("qs");
export default {
  name: "",
  data: () => ({
    username: "",
    password: "",
    ms: 1296000000,
  }),
  methods: {
    login() {
      api
        .login(
          qs.stringify({
            username: this.username,
            password: this.password,
          })
        )
        .then((res) => {
          let effective = new Date().getTime() + this.ms;
          res.data.effective = effective;
          localStorage.setItem("user_info",JSON.stringify(res.data));
          this.$router.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  position: relative;
}
.login .body {
  width: 20%;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login .body .l_item {
  font-size: 18px;
  margin: 10px 0px;
}
</style>