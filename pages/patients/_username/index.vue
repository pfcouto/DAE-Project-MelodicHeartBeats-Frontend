<template>
  <b-container>
    <b-container class="middleCard">
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
      <h4>Observations</h4>
      <div class="xOverflow">
        <b-table
          v-if="observations.length"
          striped
          hover
          :items="observations"
          :fields="observationsFields" />
        <p v-else>No observations passed.</p>
      </div>
      <h4>PRCs</h4>
      <div class="xOverflow">
        <b-table
          v-if="prcs.length"
          striped
          hover
          :items="prcs"
          :fields="prcsFields" />
        <p v-else>No prcs passed.</p>
      </div>
      <div class="spaceBetween">
        <b-button variant="danger" @click="routeBack">BACK</b-button>
        <nuxt-link
          :to="{
            name: 'patients-create',
            query: { username: patient.username }
          }">
          <b-button variant="info">EDIT</b-button>
        </nuxt-link>
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
      </div>
    </b-container>
  </b-container>
</template>
<script>
export default {
  middleware({ redirect, store, route }) {
    if (
      store.state.auth.user.groups &&
      !(
        store.state.auth.user.groups.includes('Administrator') ||
        store.state.auth.user.groups.includes('Doctor') ||
        (store.state.auth.user.groups.includes('Patient') &&
          store.state.auth.user.sub === route.params.username)
      )
    ) {
      return redirect('/forbiden')
    }
  },
  data() {
    return {
      patient: {},
      prescriptionsFields: ['doctor', 'description', 'startDate', 'endDate'],
      observationsFields: [
        'date',
        'biometricType',
        'biometricTypeName',
        'quantitativeValue',
        'qualitativeValue',
        'what',
        'local',
        'doctor'
      ],
      prcsFields: ['startDate', 'endDate', 'active']
      //   documentsFields: ['filename', 'actions']
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
    },
    observations() {
      return this.patient.observationDTOS || []
    },
    prcs() {
      return this.patient.prcsdtos || []
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
