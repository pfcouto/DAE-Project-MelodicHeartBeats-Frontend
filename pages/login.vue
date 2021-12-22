<template>
  <b-container>
    <div class="middleCard loginCard">
      <h1>Welcome To Your Heath Platform</h1>
      <br />
      <br />
      <br />

      <b-form-group
        id="username"
        label="Username"
        :state="isUsernameValid"
      >
        <b-input
          id="username"
          v-model.trim="username"
          class="inputField"
          :state="isUsernameValid"
          trim
        ></b-input>
      </b-form-group>
      <b-form-group
        id="password"
        label="Password"
      >
        <b-input
          id="patient"
          v-model="password"
          class="inputField"
        ></b-input>
      </b-form-group>
      <br />
      <br />
      <b-button class="login" @click="login">Login</b-button>
    </div>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      username: null,
      password: null,
    }
  },
  computed: {
    isUsernameValid() {
      return null;
    }
  },
  methods: {
    login() {
      this.$toast.success("Welcome " + this.username)
    }
  }
}
</script>
<style>

.inputField{
  width: 450px;
}

.loginCard {
  align-items: center;
  text-align: center;
  justify-content: center;
  display: flex;
}

.login {
  border-radius: 4px;
  background-color: lightcyan;
  margin: auto;
  padding: 8px 24px 8px 24px;
  border-width: 1px;
  border-style: solid;
  border-color: darkcyan;
  color: darkcyan;
  font-weight: bold;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 26px;
}

.login:hover {
  background-color: lightgreen;
  color: darkcyan;
}
</style>
