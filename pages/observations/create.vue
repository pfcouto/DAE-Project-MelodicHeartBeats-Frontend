<template>
  <b-container>
    <div class="middleCard">
      <h1>Insert a new Observation</h1>
      <form :disabled="!isFormValid" @submit.prevent="create">
        <b-form-group id="date" label="Date" :state="isDateValid">
          <b-form-datepicker
            id="date"
            v-model="observation.date"
            :state="isDateValid"
          ></b-form-datepicker>
        </b-form-group>
        <b-form-group
          id="patient"
          label="Patient"
          description="The Patient is required"
          :state="isPatientValid"
        >
          <b-form-select
            id="patient"
            v-model="observation.patient"
            required
            :state="isPatientValid"
          >
            <option :key="null" :value="null">Choose the patient...</option>
            <option
              v-for="patient in patients"
              :key="patient.username"
              :value="patient.username"
            >
              {{ patient.name }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          id="BiometricType"
          label="Biometric Type"
          description="The Biometric Type is required"
          :state="isBiometricsTypeValid"
        >
          <b-form-select
            id="BiometricType"
            v-model="observation.biometricType"
            required
            :state="isBiometricsTypeValid"
          >
            <option :key="null" :value="null">
              Choose the Biometric Type...
            </option>
            <option
              v-for="biometricType in biometricsType"
              :key="biometricType.code"
              :value="biometricType.code"
            >
              {{ biometricType.name }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          id="quantitativeValue"
          label="Quantitative Value"
          description="The Quantitative Value is required"
          :state="isQuantitativeValueValid"
        >
          <b-input
            id="quantitativeValue"
            v-model.number="observation.quantitativeValue"
            placeholder="Enter Quantitative Value..."
            type="number"
            :state="isQuantitativeValueValid"
            trim
          >
          </b-input>
        </b-form-group>
        <b-form-group
          id="qualitativeValue"
          label="Qualitative Value"
          description="The Qualitative Value is required"
          :state="isQualitativeValueValid"
        >
          <b-input
            id="qualitativeValue"
            v-model.trim="observation.qualitativeValue"
            placeholder="Enter Qualitative Value..."
            :state="isQualitativeValueValid"
            trim
          >
          </b-input>
        </b-form-group>
        <b-form-group
          id="what"
          label="What"
          description="The what is required"
          :state="isWhatValid"
        >
          <b-input
            id="what"
            v-model.trim="observation.what"
            placeholder="Enter what Value..."
            :state="isWhatValid"
            trim
          >
          </b-input>
        </b-form-group>
        <b-form-group
          id="local"
          label="Local"
          description="The Local is required"
          :state="isLocalValid"
        >
          <b-input
            id="local"
            v-model.trim="observation.local"
            placeholder="Enter local Value..."
            :state="isLocalValid"
            trim
          >
          </b-input>
        </b-form-group>

        <p v-show="errorMsg" class="text-danger">{{ errorMsg }}</p>
        <nuxt-link to="/observations">
          <b-button variant="info"> Return</b-button>
        </nuxt-link>
        <div style="float: right">
          <b-button variant="dark" type="reset" @click="reset"> RESET</b-button>
          <b-button
            variant="success"
            :disabled="!isFormValid"
            @click.prevent="create"
          >
            CREATE
          </b-button>
        </div>
      </form>
    </div>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      observation: {
        date: null,
        patient: null,
        biometricType: null,
        quantitativeValue: null,
        qualitativeValue: null,
        what: null,
        local: null
      },
      patients: [],
      biometricsType: [],
      errorMsg: false
    }
  },
  computed: {
    isDateValid() {
      return this.observation.date != null
    },
    isPatientValid() {
      return this.observation.patient != null
    },
    isBiometricsTypeValid() {
      return this.observation.biometricType != null
    },
    isQuantitativeValueValid() {
      return this.observation.quantitativeValue != null
    },
    isQualitativeValueValid() {
      return this.observation.qualitativeValue != null
    },
    isWhatValid() {
      return this.observation.what != null
    },
    isLocalValid() {
      return this.observation.local != null
    },
    isFormValid() {
      if (!this.isDateValid) {
        return false
      }
      if (!this.isPatientValid) {
        return false
      }
      if (!this.isBiometricsTypeValid) {
        return false
      }
      if (!this.isQuantitativeValueValid) {
        return false
      }
      if (!this.isQualitativeValueValid) {
        return false
      }
      if (!this.isWhatValid) {
        return false
      }
      if (!this.isLocalValid) {
        return false
      }
      return true
    }
  },
  mounted() {
    this.$axios
      .get('/api/patients')
      .then((response) => {
        this.patients = response.data
      })
      .catch(() => {
        this.patients = []
      })
    this.$axios
      .get('/api/biometricsType')
      .then((response) => {
        this.biometricsType = response.data
      })
      .catch(() => {
        this.biometricsType = []
      })
  },
  methods: {
    reset() {
      this.errorMsg = false
      this.observation = {}
    },
    create() {
      this.$axios
        .$post('/api/observations', this.observation)
        .then(() => {
          this.$router.push('/observations')
        })
        .catch((error) => {
          this.errorMsg = error.response.data
        })
    }
  }
}
</script>
