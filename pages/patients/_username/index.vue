<template>
  <b-container>
    <h4>Patient Details</h4>
    <p>Username: {{ patient.username }}</p>
    <p>Name: {{ patient.name }}</p>
    <p>BirthDate: {{ patient.birthDate }}</p>
    <p>Email: {{ patient.email }}</p>
    <p>PhoneNumber: {{ patient.phoneNumber }}</p>
    <p v-if="isAdministrator">
      Blocked: {{ patient.blocked ? 'YES' : 'NO' }}
    </p>
    <h4>Prescriptions</h4>
    <div class="xOverflow">
      <b-table
        v-if="prescriptions.length"
        striped
        hover
        :items="prescriptions"
        :fields="prescriptionsFields" />
      <p v-else>No prescriptions passed.</p>
    </div>
    <b-button @click="routeBack">BACK</b-button>
    <nuxt-link
      v-if="isDoctor"
      :to="{
        name: 'prescriptions-create',
        query: { patientUsername: patient.username }
      }">
      <b-button variant="success">Create Presciption</b-button>
    </nuxt-link>
    <nuxt-link
      v-if="isDoctor"
      :to="{
        name: 'observations-create',
        query: { patientUsername: patient.username }
      }">
      <b-button variant="success">Create Observation</b-button>
    </nuxt-link>
    <nuxt-link
      v-if="isDoctor"
      :to="{
        name: 'prcs-create',
        query: { patientUsername: patient.username }
      }">
      <b-button variant="success">Create PRC</b-button>
    </nuxt-link>
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
    }
  },
  computed: {
    username() {
      return this.$route.params.username
    },
    prescriptions() {
      return this.patient.prescriptionDTOS || []
    },

    isDoctor() {
      return this.$auth.user.groups.includes('Doctor')
    },
    isAdministrator() {
      return this.$auth.user.groups[0] === 'Administrator'
    }
  },
  created() {
    this.$axios.$get(`/api/patients/${this.username}`).then((patient) => {
      this.patient = patient || {}
    })
  },
  methods: {
    routeBack() {
      this.$router.back()
    }
  }
}
</script>
