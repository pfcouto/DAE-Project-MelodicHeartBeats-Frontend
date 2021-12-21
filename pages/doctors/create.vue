<template>
  <b-container>
    <div class="middleCard">
      <h1>
        {{ isEditing ? 'Update ' + $route.query.username : 'Create a new Doctor' }}
      </h1>
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
            v-model.trim="doctor.username"
            :state="isUsernameValid"
            trim
          ></b-input>
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
            v-model="doctor.password"
            :state="isPasswordValid"
            required
            placeholder="Enter your password"
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
            v-model.trim="doctor.name"
            :state="isNameValid"
            required
            placeholder="Enter your name"
          />
        </b-form-group>
        <b-form-group
          id="birthDate"
          description="The birthDate is required"
          label="Birth Date"
          label-for="birthDate"
        >
          <b-form-datepicker id="birthDate" v-model="doctor.birthDate">
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
            v-model.trim="doctor.email"
            :state="isEmailValid"
            required
            placeholder="Enter your e-mail"
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
            v-model.trim="doctor.phoneNumber"
            :state="isPhoneNumberValid"
            required
            placeholder="Enter your phone number"
          />
        </b-form-group>
        <b-form-group
          id="office"
          description="The office is required"
          label="Office"
          label-for="office"
          :invalid-feedback="invalidOfficeFeedback"
          :state="isOfficeValid"
        >
          <b-input
            ref="office"
            v-model.trim="doctor.office"
            :state="isOfficeValid"
            required
            placeholder="Enter your office"
          />
        </b-form-group>

        <p v-show="errorMsg" class="text-danger">{{ errorMsg }}</p>
        <nuxt-link to="/doctors">
          <b-button variant="info">RETURN</b-button>
        </nuxt-link>
        <div style="float: right">
          <b-button variant="dark" type="reset" @click="reset"> RESET</b-button>
          <b-button
            v-if="!isEditing"
            variant="success"
            :disabled="!isFormValid"
            @click.prevent="create"
          >
            CREATE
          </b-button>
          <b-button
            v-else
            variant="success"
            :disabled="!isFormValid"
            @click.prevent="update"
          >
            UPDATE
          </b-button>
        </div>
      </form>
    </div>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      doctor: {
        username: null,
        password: null,
        birthDate: null,
        name: null,
        email: null,
        phoneNumber: null,
        office: null
      },
      errorMsg: false,
    }
  },
  computed: {
    isEditing() {
      return this.$route.query.username != null
    },

    invalidUsernameFeedback() {
      if (!this.doctor.username) {
        return null
      }
      const usernameLen = this.doctor.username.length
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
      if (!this.doctor.password) {
        return null
      }

      const passwordLen = this.doctor.password.length

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
      if (!this.doctor.name) {
        return null
      }
      const nameLen = this.doctor.name.length
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
      if (!this.doctor.name) {
        return null
      }
      const nameLen = this.doctor.name.length
      if (nameLen < 3 || nameLen > 50) {
        return 'The name must be between [3, 50] characters.'
      }
      return ''
    },
    isEmailValid() {
      if (!this.doctor.email) {
        return null
      }
      return this.invalidEmailFeedback === ''
    },
    invalidPhoneNumberFeedback() {
      if (!this.doctor.phoneNumber) {
        return null
      }
      if (this.doctor.phoneNumber.length !== 9) {
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

    invalidOfficeFeedback() {
      if (!this.doctor.office) {
        return null
      }
      const officeLen = this.doctor.office.length
      if (officeLen < 3 || officeLen > 5) {
        return 'The Phone Number must be between 3 and 5 characters'
      }
      return ''
    },

    isOfficeValid() {
      if (this.invalidPhoneNumberFeedback === null) {
        return null
      }
      return this.invalidPhoneNumberFeedback === ''
    },

    isBirthDateValid() {
      return this.doctor.birthDate != null
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
      if (!this.isOfficeValid) {
        return false
      }
      if (!this.isBirthDateValid) {
        return false
      }
      return true
    }
  },
  async mounted() {
    await this.$route

    if (this.isEditing) {
      this.$axios
        .$get('/api/doctors/' + this.$route.query.username)
        .then((response) => {
          this.initializeDoctor(response)
          // console.log(response)
        })
        .catch((error) => {
          this.errorMsg = error.response.data
        })
    }
  },
  methods: {
    reset() {
      this.errorMsg = false
    },
    create() {
      this.$axios
        .$post('/api/doctors', this.doctor)
        .then(() => {
          this.$router.push('/doctors')
        })
        .catch((error) => {
          this.errorMsg = error.response.data
        })
    },
    update() {
      this.$axios
        .$put('/api/doctors/' + this.$route.query.username, this.doctor)
        .then(() => {
          this.$router.push('/doctors')
        })
        .catch((error) => {
          this.errorMsg = error.response.data
        })
    },
    initializeDoctor(editingDoctor) {
      this.doctor = editingDoctor
    }
  }
}
</script>
