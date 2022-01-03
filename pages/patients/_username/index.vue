<template>
  <b-container>
    <b-container class="middleCard">
      <h4>Patient Details</h4>
      <p>Username: {{ patient.username }}</p>
      <p>Name: {{ patient.name }}</p>
      <p>BirthDate: {{ patient.birthDate }}</p>
      <p>Email: {{ patient.email }}</p>
      <p>PhoneNumber: {{ patient.phoneNumber }}</p>
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
                name: 'patients-create',
                query: { username: patient.username }
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
      patient: {},
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
      return this.patient.prescriptionDTOS || []
    }
    // documents() {
    //   return this.student.documents || []
    // }
  },
  created() {
    this.$axios.$get(`/api/patients/${this.username}`).then((patient) => {
      this.patient = patient || {}
    })
  },
  methods: {
    routeBack() {
      this.$router.back();
    }
  }
}
</script>
