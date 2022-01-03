<template>
  <b-container class="loginContainer">
    <div class="middleCard loginCard">
      <b-card-img style="border-radius: 0" src="~/assets/melodicHearts.jpg"></b-card-img>

      <b-form-group id="username"
        label="Username"
        :state="isUsernameValid"
      >
        <b-input
          id="username"
          v-model.trim="username"
          :state="isUsernameValid"
          trim
        ></b-input>
      </b-form-group>
      <b-form-group
        id="password"
        class="loginFieldset"
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
      }).catch(() => {
        this.$toast.error('Sorry, you cant login. Ensure your credentials are correct').goAway(3000)
      })
    },
  }
}
</script>
<style>

fieldset {
  width: 100%;
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
