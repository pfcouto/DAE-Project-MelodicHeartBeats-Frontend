<template>
  <b-container>
    <b-container class="middleCard">
      <h4>Doctor Details</h4>
      <p>Username: {{ doctor.username }}</p>
      <p>Name: {{ doctor.name }}</p>
      <p>BirthDate {{ doctor.birthDate }}</p>
      <p>Email: {{ doctor.email }}</p>
      <p>Phone Number: {{ doctor.phoneNumber }}</p>
      <p>Office: {{ doctor.office }}</p>
      <h4>Prescriptions</h4>
      <div class="xOverflow">
        <b-table
          v-if="prescriptions.length"
          striped
          hover
          :items="prescriptions"
          :fields="prescriptionsFields"
        />
        <p v-else>No prescriptions passed.</p>
      </div>
      <div class="spaceBetween">
        <b-button variant="danger" @click="routeBack">BACK</b-button>
        <nuxt-link :to="{
                name: 'doctors-create',
                query: { username: doctor.username }
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
      doctor: {},
      prescriptionsFields: [
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
      return this.doctor.prescriptionDTOS || []
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
  methods: {
    routeBack() {
      this.$router.back();
    }
  }
}
</script>
