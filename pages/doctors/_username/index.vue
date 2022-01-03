<template>
  <b-container>
    <h4>Doctor Details</h4>
    <p>Username: {{ doctor.username }}</p>
    <p>Name: {{ doctor.name }}</p>
    <p>BirthDate {{ doctor.birthDate }}</p>
    <p>Email: {{ doctor.email }}</p>
    <p>Phone Number: {{ doctor.phoneNumber }}</p>
    <p>Office: {{ doctor.office }}</p>
    <p v-if="isAdministrator">Blocked: {{ doctor.blocked ? 'YES' : 'NO' }}</p>
    <h4>PRCs</h4>
    <div class="xOverflow">
      <b-table
        v-if="prescriptions.length"
        striped
        hover
        :items="prescriptions"
        :fields="prescriptionsFields" />
      <p v-else>No prescriptions passed.</p>
    </div>
    <nuxt-link to="/doctors">BACK</nuxt-link>
    &nbsp;
  </b-container>
</template>
<script>
export default {
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
  }
}
</script>
