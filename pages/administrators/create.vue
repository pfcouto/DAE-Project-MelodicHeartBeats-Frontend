<template>
  <div>
    <h1>Create a new Administrator</h1>
    <form :disabled="!isFormValid" @submit.prevent="create">
      <b-form-group
        id="username"
        description="The username is required"
        label="Username"
        label-for="username"
        :invalid-feedback="invalidUsernameFeedback"
        :state="isUsernameValid"
      >
        <b-input
          id="username"
          v-model.trim="administrator.username"
          :state="isUsernameValid"
          trim
        />
      </b-form-group>
      <b-form-group
        id="password"
        description="The password is required"
        label="Password"
        label-for="password"
        :invalid-feedback="invalidPasswordFeedback"
        :state="isPasswordValid"
      >
        <b-input
          v-model="administrator.password"
          :state="isPasswordValid"
          type="password"
          required
        />
      </b-form-group>
      <b-form-group
        id="name"
        description="The name is required"
        label="Name"
        label-for="name"
        :invalid-feedback="invalidNameFeedback"
        :state="isNameValid"
      >
        <b-input
          v-model.trim="administrator.name"
          :state="isNameValid"
          required
        />
      </b-form-group>

      <b-form-group
        id="birthDate"
        description="The birthDate is required"
        label="Birth Date"
        label-for="birthDate"
      >
        <b-form-datepicker id="birthDate" v-model="administrator.birthDate">
        </b-form-datepicker>
      </b-form-group>

      <b-form-group
        id="email"
        description="The email is required"
        label="Email"
        label-for="email"
        :invalid-feedback="invalidEmailFeedback"
        :state="isEmailValid"
      >
        <b-input
          ref="email"
          v-model.trim="administrator.email"
          :state="isEmailValid"
          required
          pattern=".+@my.ipleiria.pt"
        />
      </b-form-group>
      <b-form-group
        id="phoneNumber"
        description="The Phone Number is required"
        label="Phone Number"
        label-for="phoneNumber"
        :invalid-feedback="invalidPhoneNumberFeedback"
        :state="isPhoneNumberValid"
      >
        <b-input
          ref="phoneNumber"
          v-model.trim="administrator.phoneNumber"
          :state="isPhoneNumberValid"
          required
        />
      </b-form-group>

      <p v-show="errorMsg" class="text-danger">{{ errorMsg }}</p>

      <nuxt-link to="/administrators">
        <b-button variant="light"> Return </b-button>
      </nuxt-link>
      <div style="float: right">
        <b-button variant="dark" type="reset" @click="reset"> RESET </b-button>
        <b-button
          variant="success"
          :disabled="!isFormValid"
          @click.prevent="create"
        >
          CREATE
        </b-button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      administrator: {
        username: null,
        password: null,
        name: null,
        birthDate: null,
        email: null,
        phoneNumber: null
      },

      errorMsg: false
    }
  },

  computed: {
    invalidUsernameFeedback() {
      if (!this.administrator.username) {
        return null
      }
      const usernameLen = this.administrator.username.length
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

    invalidPasswordFeedback() {
      if (!this.administrator.password) {
        return null
      }

      const passwordLen = this.administrator.password.length

      if (passwordLen < 3 || passwordLen > 255) {
        return 'The password must be between [3, 255] characters.'
      }
      return ''
    },

    isPasswordValid() {
      if (this.invalidPasswordFeedback === null) {
        return null
      }
      return this.invalidPasswordFeedback === ''
    },

    invalidNameFeedback() {
      if (!this.administrator.name) {
        return null
      }
      const nameLen = this.administrator.name.length
      if (nameLen < 3 || nameLen > 50) {
        return 'The name must be between [3, 50] characters.'
      }
      return ''
    },
    isNameValid() {
      if (this.invalidNameFeedback === null) {
        return null
      }
      return this.invalidNameFeedback === ''
    },
    invalidEmailFeedback() {
      if (!this.administrator.name) {
        return null
      }
      const nameLen = this.administrator.name.length
      if (nameLen < 3 || nameLen > 50) {
        return 'The name must be between [3, 50] characters.'
      }
      return ''
    },
    isEmailValid() {
      if (!this.administrator.email) {
        return null
      }
      return this.$refs.email.checkValidity()
    },
    invalidPhoneNumberFeedback() {
      if (!this.administrator.phoneNumber) {
        return null
      }
      if (this.administrator.phoneNumber.length !== 9) {
        return 'The Phone Number must have exactly 9 characters'
      }
      return ''
    },

    isPhoneNumberValid() {
      if (this.invalidPhoneNumberFeedback === null) {
        return null
      }
      return this.invalidPhoneNumberFeedback === ''
    },

    isBirthDateValid() {
      return this.administrator.birthDate != null
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
      if (!this.isBirthDateValid) {
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
        .$post('/api/administrators', this.administrator)
        .then(() => {
          this.$router.push('/administrators')
        })
        .catch((error) => {
          this.errorMsg = error.response.data
        })
    }
  }
}
</script>
