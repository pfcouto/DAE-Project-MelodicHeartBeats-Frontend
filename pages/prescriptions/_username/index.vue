<template>
  <b-container>
    <div class="middleCard">
      <h4>Doctor Details</h4>
      <p>Username: {{ doctor.username }}</p>
      <p>Name: {{ doctor.name }}</p>
      <p>BirthDate {{ doctor.birthDate }}</p>
      <p>Email: {{ doctor.email }}</p>
      <p>Phone Number: {{ doctor.courseName }}</p>
      <p>Office: {{ doctor.courseName }}</p>
      <h4>Prescriptions</h4>
      <b-table
        v-if="prescriptions.length"
        striped
        over
        :items="prescriptions"
        :fields="prescriptionsFields"
      />
      <p v-else>No prescriptions passed.</p>
      <nuxt-link to="/prescriptions">
        <b-button variant="info"> Return</b-button>
      </nuxt-link>
    </div>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      doctor: {},
      prescriptionFields: [
        'id',
        'doctor',
        'patient',
        'description',
        'startDate',
        'endDate'
      ]
      //   documentsFields: ['filename', 'actions']
    }
  },
  computed: {
    username() {
      return this.$route.params.username
    },
    prescriptions() {
      return this.doctor.prescriptions || []
    }
    // documents() {
    //   return this.doctor.documents || []
    // }
  },
  created() {
    this.$axios.$get(`/api/doctors/${this.username}`).then((doctor) => {
      this.doctor = doctor || {}
    })
  },
  methods: {}
}
</script>
