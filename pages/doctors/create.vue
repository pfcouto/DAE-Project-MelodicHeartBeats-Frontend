<template>
  <div>
    <h1>Create a new Doctor</h1>
    <form :disabled="!isFormValid" @submit.prevent="create">
      <b-form-group
        id="username"
        description="The username is required"
        label="Enter your username"
        label-for="username"
        :invalid-feedback="invalidUsernameFeedback"
        :state="isUsernameValid"
      >
        <b-input
          id="username"
          v-model.trim="username"
          :state="isUsernameValid"
          trim
        ></b-input>
      </b-form-group>
      <b-input
        v-model="password"
        :state="isPasswordValid"
        required
        placeholder="Enter your password"
      />
      <b-input
        v-model.trim="name"
        :state="isNameValid"
        required
        placeholder="Enter your name"
      />
      <b-form-datepicker id="birthDate" v-model="birthDate"></b-form-datepicker>

      <b-input
        ref="email"
        v-model.trim="email"
        type="email"
        :state="isEmailValid"
        required
        pattern=".+@my.ipleiria.pt"
        placeholder="Enter
your e-mail"
      />
      <b-input
        ref="phoneNumber"
        v-model.trim="phoneNumber"
        type="phoneNumber"
        :state="isPhoneNumberValid"
        required
        placeholder="Enter your phone number"
      />

      <b-input
        ref="office"
        v-model.trim="office"
        type="office"
        :state="isOfficeValid"
        required
        placeholder="Enter your office"
      />

      <p v-show="errorMsg" class="text-danger">{{ errorMsg }}</p>
      <nuxt-link to="/doctors">Return</nuxt-link>
      <button type="reset" @click="reset">RESET</button>
      <button :disabled="!isFormValid" @click.prevent="create">CREATE</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: null,
      password: null,
      name: null,
      email: null,
      courseCode: null,
      phoneNumber: null,
      errorMsg: false
    }
  },

  computed: {
    invalidUsernameFeedback() {
      if (!this.username) {
        return null
      }
      const usernameLen = this.username.length
      if (usernameLen < 3 || usernameLen > 15) {
        return 'The username must be between [3, 15] characters.'
      }
      return ''
    },
    isUsernameValid() {
      if (this.invalidUsernameFeedback === null) {
        return null
      }
      return this.invalidUsernameFeedback === ''
    },

    isPasswordValid() {
      if (!this.password) {
        return null
      }
      const passwordLen = this.password.length
      if (passwordLen < 3 || passwordLen > 255) {
        return false
      }
      return true
    },
    isNameValid() {
      if (!this.name) {
        return null
      }
      const nameLen = this.name.length
      if (nameLen < 3 || nameLen > 25) {
        return false
      }
      return true
    },
    isEmailValid() {
      if (!this.email) {
        return null
      }

      // asks the component if it’s valid. We don’t need to use a regex for
      // the e-mail. The input field already does the job for us, because it is of type
      // “email” and validates that the user writes an e-mail that belongs to the domain
      // of IPLeiria.
      return this.$refs.email.checkValidity()
    },
    isPhoneNumberValid() {
      if (!this.phoneNumber) {
        return null
      }
      if (this.phoneNumber.length !== 9) {
        return false
      }
      return true
    },
    isOfficeValid() {
      if (!this.office) {
        return null
      }
      return true
    },

    isFormValid() {
      if (!this.isUsernameValid) {
        return false
      }
      if (!this.isPasswordValid) {
        return false
      }
      if (!this.isNameValid) {
        return false
      }
      if (!this.isEmailValid) {
        return false
      }
      if (!this.isPhoneNumberValid) {
        return false
      }
      if (!this.isOfficeValid()) {
        return false
      }
      return true
    }
  },
  // created() {
  //   this.$axios.$get('/api/courses').then((courses) => {
  //     this.courses = courses
  //   })
  // },
  methods: {
    reset() {
      this.errorMsg = false
    },
    create() {
      this.$axios
        .$post('/api/doctors', {
          username: this.username,
          password: this.password,
          name: this.name,
          birthDate: this.birthDate,
          email: this.email,
          phoneNumber: this.phoneNumber,
          office: this.office
        })
        .then(() => {
          this.$router.push('/doctors')
        })
        .catch((error) => {
          this.errorMsg = error.response.data
        })
    }
  }
}
</script>
