<template>
  <b-container>
    <b-container class="middleCard text-center flex-row">
      <a @click="routeBack">
        <b-button variant="danger">BACK</b-button>
      </a>
      <h2 class="font-weight-bold">Doctor Details</h2>
      <nuxt-link
        :to="{
            name: 'doctors-create',
            query: { username: doctor.username }
          }">
        <b-button variant="info">EDIT</b-button>
      </nuxt-link>
    </b-container>
    <b-container class="middleCard">
      <p>Username: {{ doctor.username }}</p>
      <p>Name: {{ doctor.name }}</p>
      <p>BirthDate {{ doctor.birthDate }}</p>
      <p>Email: {{ doctor.email }}</p>
      <p>Phone Number: {{ doctor.phoneNumber }}</p>
      <p>Office: {{ doctor.office }}</p>
      <p v-if="isAdministrator">Blocked: {{ doctor.blocked ? 'YES' : 'NO' }}</p>
    </b-container>
    <b-container class="middleCard">
      <h4>{{ prescriptions.length ? "Prescriptions" : "No Prescriptions" }}</h4>
    </b-container>
    <b-container class="middleCard">
      <div v-if="prescriptions.length" class="xOverflow">
        <b-table
          striped
          hover
          :items="prescriptions"
          :fields="prescriptionsFields"/>
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
        store.state.auth.user.groups.includes('Administrator') ||
        (store.state.auth.user.groups.includes('Doctor') &&
          store.state.auth.user.sub === route.params.username)
      )
    ) {
      return redirect('/forbiden')
    }
  },
  data() {
    return {
      doctor: {},
      prescriptionsFields: [
        'id',
        'doctor',
        'patient',
        'description',
        'startDate',
        'endDate'
      ]
    }
  },
  computed: {
    username() {
      return this.$route.params.username
    },
    prescriptions() {
      return this.doctor.prescriptionDTOS || []
    },
    isAdministrator() {
      return this.$auth.user.groups[0] === 'Administrator'
    }
  },
  created() {
    this.$axios.$get(`/api/doctors/${this.username}`).then((doctor) => {
      this.doctor = doctor || {}
    })
  },
  methods: {
    routeBack() {
      this.$router.back()
    }
  }
}
</script>
