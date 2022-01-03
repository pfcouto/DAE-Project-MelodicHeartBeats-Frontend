<template>
  <b-container>
    <b-container class="middleCard">
      <h4>Administrator Details</h4>
      <p>Username: {{ administrator.username }}</p>
      <p>Name: {{ administrator.name }}</p>
      <p>BirthDate: {{ administrator.birthDate }}</p>
      <p>Email: {{ administrator.email }}</p>
      <p>PhoneNumber: {{ administrator.phoneNumber }}</p>

      <h4>BiometricTypes</h4>
      <div class="xOverflow">
        <b-table
          v-if="biometricTypes.length"
          striped
          hover
          :items="biometricTypes"
          :fields="biometricTypeFields"
        />
        <p v-else>No Biometric Types Created.</p>
      </div>
      <div class="spaceBetween">
        <b-button variant="danger" @click="routeBack">BACK</b-button>
        <nuxt-link :to="{
                name: 'administrators-create',
                query: { username: administrator.username }
              }">
          <b-button variant="info">EDIT</b-button>
        </nuxt-link>
      </div>
    </b-container>
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
      ]
    }
  },
  computed: {
    username() {
      return this.$route.params.username
    },
    biometricTypes() {
      return this.administrator.biometricsTypeDTOS || []
    }
    // documents() {
    //   return this.student.documents || []
    // }
  },
  created() {
    this.$axios
      .$get(`/api/administrators/${this.username}`)
      .then((administrator) => {
        this.administrator = administrator || {}
      })
  },
  methods: {
    routeBack() {
      this.$router.back();
    }
  }
}
</script>
