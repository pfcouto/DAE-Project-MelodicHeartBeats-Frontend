<template>
  <b-container>
    <b-container class="middleCard text-center flex-row">
      <a @click="routeBack">
        <b-button class="float-left" variant="danger">BACK</b-button>
      </a>
      <h2 class="font-weight-bold">Patient Details</h2>
      <nuxt-link class="float-right btn"
                 :to="{
              name: 'patients-create',
              query: { username: patient.username }
            }">
        <b-button variant="info">EDIT</b-button>
      </nuxt-link>
    </b-container>
    <b-container class="middleCard">
      <p>Username: {{ patient.username }}</p>
      <p>Name: {{ patient.name }}</p>
      <p>BirthDate: {{ patient.birthDate }}</p>
      <p>Email: {{ patient.email }}</p>
      <p>PhoneNumber: {{ patient.phoneNumber }}</p>
      <p v-if="isAdministrator">
        Blocked: {{ patient.blocked ? 'YES' : 'NO' }}
      </p>
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
      <nuxt-link
        v-if="isDoctor"
        :to="{
              name: 'prescriptions-create',
              query: { patientUsername: patient.username }
            }">
        <b-button class="float-right" variant="outline-success">CREATE PRESCRIPTION</b-button>
      </nuxt-link>
    </b-container>
    <b-container class="middleCard">
      <h4>Observations</h4>
    </b-container>
    <b-container class="middleCard">
      <div v-if="observations.length" class="xOverflow">
        <b-table
          striped
          hover
          :items="observations"
          :fields="observationsFields"/>
      </div>
      <nuxt-link
        v-if="isDoctor"
        :to="{
              name: 'observations-create',
              query: { patientUsername: patient.username }
            }">
        <b-button class="float-right" variant="outline-success">CREATE OBSERVATION</b-button>
      </nuxt-link>
    </b-container>
    <b-container class="middleCard">
      <h4>{{ prcs.length ? "PRCs" : "No PRCs" }}</h4>
    </b-container>
    <b-container class="middleCard">
      <div v-if="prcs.length" class="xOverflow">
        <b-table
          striped
          hover
          :items="prcs"
          :fields="prcsFields"/>
      </div>
      <nuxt-link
        v-if="isDoctor"
        :to="{
              name: 'prcs-create',
              query: { patientUsername: patient.username }
            }">
        <b-button class="float-right" variant="outline-success">CREATE PRC</b-button>
      </nuxt-link>
    </b-container>
    <b-container
      class="middleCard">
      <h4>{{
          suggestedPrescriptions && suggestedPrescriptions.length ? "Suggested Prescriptions" : "No Suggested Prescriptions"
        }}</h4>
    </b-container>
    <b-container class="gridCustomSuggested">
      <div
        v-for="(item, idx) in suggestedPrescriptions"
        :key="idx"
        class="gridCustomSuggestedCard">
        <p>Patient: {{ item.patient }}</p>
        <p>Start Date: {{ item.startDate }}</p>
        <p>End Date: {{ item.endDate }}</p>
        <p>Prescription: {{ item.description }}</p>
        <b-button
          class="float-right"
          variant="outline-success"
          @click="createSuggestedPrescription(item, idx)"
        >CREATE
        </b-button>
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
      prcsFields: ['startDate', 'endDate', 'active'],
      suggestedPrescriptions: []
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
    if (this.$auth.user.groups.includes('Doctor')) {
      this.$axios
        .$get('/api/patients/' + this.username + '/suggestedPrescriptions')
        .then((response) => {
          this.suggestedPrescriptions = response
        })
    }
  },
  methods: {
    createSuggestedPrescription(item, idx) {
      item.doctor = this.$auth.user.sub
      this.$axios
        .$post('/api/prescriptions', item)
        .then(() => {
          this.$toast
            .success('Prescription was created successfully')
            .goAway(3000)
          this.suggestedPrescriptions.splice(idx, 1)
          this.prescriptions.push(item)
        })
        .catch(() => {
          this.$toast
            .error(
              'Prescription was not created! Maybe patient dont have an active prc'
            )
            .goAway(3000)
        })
    },
    routeBack() {
      this.$router.back()
    }
  }
}
</script>
