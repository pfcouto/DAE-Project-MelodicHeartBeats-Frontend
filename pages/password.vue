<template>
  <b-container>
    <div class="middleCard">
      <h1>
        CHANGE PASSWORD
      </h1>
      <br/>
      <br/>
      <form :disabled="!isFormValid" @submit.prevent="update">
        <b-form-group
          id="newPassword"
          label="New Password"
          :invalid-feedback="invalidNewPasswordFeedback"
          :state="isNewPasswordValid"
        >
          <b-input
            id="newPassword"
            v-model="passwords.passwordNew"
            placeholder="Insert a new password here"
            :state="isNewPasswordValid"
            type="password"
          />
        </b-form-group>
        <b-form-group
          id="oldPassword"
          label="Current Password"
          :invalid-feedback="invalidOldPasswordFeedback"
          :state="isOldPasswordValid"
        >
          <b-input
            id="oldPassword"
            v-model="passwords.passwordOld"
            placeholder="Insert the current password here"
            :state="isOldPasswordValid"
            type="password"
          />
        </b-form-group>

        <p v-show="errorMsg" class="text-danger">{{ errorMsg }}</p>

        <br/>
        <b-button variant="info" @click="routeBack">RETURN</b-button>
        <div style="float: right">
          <b-button variant="dark" type="reset" @click="reset"> RESET</b-button>
          <b-button
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
      passwords: {
        passwordNew: null,
        passwordOld: null,
      },
      errorMsg: false
    }
  },

  computed: {
    invalidNewPasswordFeedback() {
      if (!this.passwords.passwordNew) {
        return null
      }
      const len = this.passwords.passwordNew.length
      if (len < 3 || len > 255) {
        return 'The new password must be between [3, 255] characters.'
      }
      return ''
    },
    invalidOldPasswordFeedback() {
      if (!this.passwords.passwordOld) {
        return null
      }
      const len = this.passwords.passwordOld.length
      if (len < 3 || len > 255) {
        return 'The current password must be between [3, 255] characters.'
      }
      return ''
    },
    isNewPasswordValid() {
      if (this.invalidNewPasswordFeedback === null) {
        return null
      }
      return this.invalidNewPasswordFeedback === ''
    },
    isOldPasswordValid() {
      if (this.invalidOldPasswordFeedback === null) {
        return null
      }
      return this.invalidOldPasswordFeedback === ''
    },
    isFormValid() {
      if (!this.isNewPasswordValid) {
        return false
      }
      if (!this.isOldPasswordValid) {
        return false
      }
      return true
    }
  },
  methods: {
    routeBack() {
      this.$router.back();
    },
    reset() {
      this.errorMsg = false
    },
    update() {
      this.$axios
        .$patch(
          '/api/' + this.$auth.user.groups[0].toLowerCase() + 's/' + this.$auth.user.sub + '/changePassword',
          this.passwords
        )
        .then(() => {
          this.$toast.success('Password altered successfully').goAway(3000)
          this.$router.push('/')
        })
        .catch((error) => {
          this.$toast.error('Something went wrong! Password not updated').goAway(3000)
          this.errorMsg = error.response.data.split(":")[1]
        })
    },
  }
}
</script>
