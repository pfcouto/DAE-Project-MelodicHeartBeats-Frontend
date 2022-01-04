<template>
  <b-container>
    <b-container class="middleCard text-center flex-row">
      <a>
        <b-button variant="danger" @click="routeBack">BACK</b-button>
      </a>
      <h2 class="font-weight-bold">Administrator Details</h2>
      <nuxt-link
        :to="{
            name: 'administrators-create',
            query: { username: administrator.username }
          }">
        <b-button variant="info">EDIT</b-button>
      </nuxt-link>
    </b-container>
    <b-container class="middleCard">
      <p>Username: {{ administrator.username }}</p>
      <p>Name: {{ administrator.name }}</p>
      <p>BirthDate: {{ administrator.birthDate }}</p>
      <p>Email: {{ administrator.email }}</p>
      <p>PhoneNumber: {{ administrator.phoneNumber }}</p>
      <p v-if="isAdministrator">
        Blocked: {{ administrator.blocked ? 'YES' : 'NO' }}
      </p>
    </b-container>
    <b-container class="middleCard">
      <h4>BiometricTypes</h4>
    </b-container>
    <b-container class="middleCard">
      <div class="xOverflow">
        <b-table
          v-if="biometricTypes.length"
          striped
          hover
          :items="biometricTypes"
          :fields="biometricTypeFields"/>
        <p v-else>No Biometric Types Created.</p>
      </div>
    </b-container>
  </b-container>
</template>
<script>
export default {
  middleware({redirect, store, route}) {
    if (
      store.state.auth.user.groups &&
      !(
        store.state.auth.user.groups.includes('Administrator') &&
        store.state.auth.user.sub === route.params.username
      )
    ) {
      return redirect('/forbiden')
    }
  },
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
  },
  methods: {
    routeBack() {
      this.$router.back()
    }
  }
}
</script>
