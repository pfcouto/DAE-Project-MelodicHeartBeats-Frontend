<template>
  <b-container class="loginContainer">
    <div class="middleCard loginCard">
      <h1>Welcome To Your Heath Platform</h1>
      <br/>
      <br/>
      <br/>

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
          type="password"
          @keypress.enter="login"
        ></b-input>
      </b-form-group>
      <br/>
      <br/>
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
      this.$auth.loginWith('local', {
        data: {
          username: this.username,
          password: this.password
        }
      }).then(() => {
        this.$toast.success('You are logged in!').goAway(3000)
        this.$router.push('/')
      }).catch(() => {
        this.$toast.error('Sorry, you cant login. Ensure your credentials are correct').goAway(3000)
      })
    },
  }
}
</script>
<style>

.inputField {
  width: 450px;
}

.loginContainer {
  max-width: 800px !important;
}

legend {
  text-align: left;
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
  padding: 4px 24px 4px 24px;
  border-width: 1px;
  border-style: solid;
  border-color: darkcyan;
  color: darkcyan;
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
