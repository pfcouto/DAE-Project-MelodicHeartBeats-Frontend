<template>
  <b-container>
    <h4>Administrator Details</h4>
    <p>Username: {{ administrator.username }}</p>
    <p>Name: {{ administrator.name }}</p>
    <p>BirthDate: {{ administrator.birthDate }}</p>
    <p>Email: {{ administrator.email }}</p>
    <p>PhoneNumber: {{ administrator.phoneNumber }}</p>
    <p v-if="isAdministrator">
      Blocked: {{ administrator.blocked ? 'YES' : 'NO' }}
    </p>

    <h4>BiometricTypes</h4>
    <b-table
      v-if="biometricTypes.length"
      striped
      hover
      :items="biometricTypes"
      :fields="biometricTypeFields" />
    <p v-else>No Biometric Types Created.</p>

    <nuxt-link to="/administrators">Back</nuxt-link>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      administrator: {},
      biometricTypeFields: [
        'code',
        'name',
        'description',
        'valueMax',
        'valueMin',
        'unity',
        'admin',
        'deleted_at'
      ]
    }
  },
  computed: {
    username() {
      return this.$route.params.username
    },
    biometricTypes() {
      return this.administrator.biometricsTypeDTOS || []
    },
    isAdministrator() {
      return this.$auth.user.groups[0] === 'Administrator'
    }
  },
  created() {
    this.$axios
      .$get(`/api/administrators/${this.username}`)
      .then((administrator) => {
        this.administrator = administrator || {}
      })
  }
}
</script>
