<template>
  <div>
    <h1>Create a new Patient</h1>
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
          v-model.trim="patient.username"
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
          v-model="patient.password"
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
        <b-input v-model.trim="patient.name" :state="isNameValid" required />
      </b-form-group>

      <b-form-group
        id="birthDate"
        description="The birthDate is required"
        label="Birth Date"
        label-for="birthDate"
      >
        <b-form-datepicker id="birthDate" v-model="patient.birthDate">
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
          v-model.trim="patient.email"
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
          v-model.trim="patient.phoneNumber"
          :state="isPhoneNumberValid"
          required
        />
      </b-form-group>

      <nuxt-link to="/patients">
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
      patient: {
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
      if (!this.patient.username) {
        return null
      }
      const usernameLen = this.patient.username.length
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
      if (!this.patient.password) {
        return null
      }

      const passwordLen = this.patient.password.length

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
      if (!this.patient.name) {
        return null
      }
      const nameLen = this.patient.name.length
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
      if (!this.patient.name) {
        return null
      }
      const nameLen = this.patient.name.length
      if (nameLen < 3 || nameLen > 50) {
        return 'The name must be between [3, 50] characters.'
      }
      return ''
    },
    isEmailValid() {
      if (!this.patient.email) {
        return null
      }
      return this.$refs.email.checkValidity()
    },
    invalidPhoneNumberFeedback() {
      if (!this.patient.phoneNumber) {
        return null
      }
      if (this.patient.phoneNumber.length !== 9) {
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
      return this.patient.birthDate != null
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
        .$post('/api/patients', this.patient)
        .then(() => {
          this.$router.push('/patients')
        })
        .catch((error) => {
          this.errorMsg = error.response.data
        })
    }
  }
}
</script>
