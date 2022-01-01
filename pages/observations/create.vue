<template>
  <b-container>
    <div class="middleCard">
      <h1>
        {{
          isEditing
            ? 'Update ' + observation.patient + ' Observation '
            : 'Create a new Observation'
        }}
      </h1>
      <form :disabled="!isFormValid" @submit.prevent="create">
        <b-form-group id="date" label="Date" :state="isDateValid">
          <b-form-datepicker
            id="date"
            v-model="observation.date"
            :disabled="isEditing"
            :state="isDateValid"></b-form-datepicker>
        </b-form-group>
        <b-form-group
          id="patient"
          :disabled="isEditing"
          label="Patient"
          description="The Patient is required"
          :state="isPatientValid">
          <b-form-select
            id="patient"
            v-model="observation.patient"
            required
            :state="isPatientValid">
            <option :key="null" :value="null">Choose the patient...</option>
            <option
              v-for="patient in patients"
              :key="patient.username"
              :value="patient.username">
              {{ patient.name }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          id="BiometricType"
          :disabled="isEditing"
          label="Biometric Type"
          description="The Biometric Type is required"
          :state="isBiometricsTypeValid">
          <b-form-select
            id="BiometricType"
            v-model="observation.biometricType"
            required
            :state="isBiometricsTypeValid"
            @change="loadMinMax">
            <option :key="null" :value="null">
              Choose the Biometric Type...
            </option>
            <option
              v-for="biometricType in biometricsType"
              :key="biometricType.code"
              :value="biometricType.code">
              {{ biometricType.name }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          id="quantitativeValue"
          label="Quantitative Value"
          description="The Quantitative Value is required"
          :state="isQuantitativeValueValid">
          <b-input
            id="quantitativeValue"
            v-model.number="observation.quantitativeValue"
            placeholder="Enter Quantitative Value..."
            type="number"
            :state="isQuantitativeValueValid"
            trim>
          </b-input>
        </b-form-group>
        <b-form-group
          id="qualitativeValue"
          label="Qualitative Value"
          description="The Qualitative Value is required"
          :state="isQualitativeValueValid">
          <b-input
            id="qualitativeValue"
            v-model.trim="observation.qualitativeValue"
            placeholder="Enter Qualitative Value..."
            :state="isQualitativeValueValid"
            trim>
          </b-input>
        </b-form-group>
        <b-form-group
          id="what"
          label="What"
          description="The what is required"
          :state="isWhatValid">
          <b-input
            id="what"
            v-model.trim="observation.what"
            placeholder="Enter what Value..."
            :state="isWhatValid"
            trim>
          </b-input>
        </b-form-group>
        <b-form-group
          id="local"
          label="Local"
          description="The Local is required"
          :state="isLocalValid">
          <b-input
            id="local"
            v-model.trim="observation.local"
            placeholder="Enter local Value..."
            :state="isLocalValid"
            trim>
          </b-input>
        </b-form-group>

        <p v-show="errorMsg" class="text-danger">{{ errorMsg }}</p>
        <nuxt-link to="/observations">
          <b-button variant="info"> Return</b-button>
        </nuxt-link>
        <div style="float: right">
          <b-button variant="dark" type="reset" @click="reset"> RESET</b-button>
          <b-button
            v-if="!isEditing"
            variant="success"
            :disabled="!isFormValid"
            @click.prevent="create">
            CREATE
          </b-button>
          <b-button
            v-else
            variant="success"
            :disabled="!isFormValid"
            @click.prevent="update">
            UPDATE
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
        patient: this.$route.query.patientUsername ?? null,
        biometricType: null,
        quantitativeValue: null,
        qualitativeValue: null,
        what: null,
        local: null
      },
      patients: [],
      biometricsType: [],
      errorMsg: false,
      biometricTypeMin: null,
      biometricTypeMax: null
    }
  },
  computed: {
    isEditing() {
      return this.$route.query.code != null
    },

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
      return (
        this.observation.quantitativeValue != null &&
        this.observation.quantitativeValue <= this.biometricTypeMax &&
        this.observation.quantitativeValue >= this.biometricTypeMin
      )
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
  async mounted() {
    await this.$route

    if (this.isEditing) {
      await this.fetchObservationData()
      this.loadMinMax()
    }
    await this.fetchPatients()
    await this.fetchBiometricsType()
  },
  methods: {
    loadMinMax() {
      if (!this.observation.biometricType && !this.isEditing) {
        return
      }
      this.$axios
        .$get('/api/biometricsType/' + this.observation.biometricType)
        .then((bio) => {
          this.observation.biometricType = bio.code
          this.biometricTypeMin = bio.valueMin
          this.biometricTypeMax = bio.valueMax
        })
        .catch(() => {
          this.biometricTypeMin = null
          this.biometricTypeMax = null
        })
    },
    async reset() {
      this.errorMsg = false
      this.observation = {}
      if (this.isEditing) {
        await this.fetchObservationData()
        this.loadMinMax()
      }
    },
    update() {
      this.$axios
        .$patch(
          '/api/observations/update/' + this.$route.query.code,
          this.observation
        )
        .then(() => {
          this.$router.push('/observations')
        })
        .catch((error) => {
          this.errorMsg = error.response.data
        })
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
    },
    async fetchObservationData() {
      await this.$axios
        .$get('/api/observations/' + this.$route.query.code)
        .then((response) => {
          this.initializeObservation(response)
          // console.log(response)
        })
        .catch((error) => {
          this.errorMsg = error.response.data
        })
    },
    fetchPatients() {
      this.$axios
        .get('/api/patients')
        .then((response) => {
          this.patients = response.data
        })
        .catch(() => {
          this.patients = []
        })
    },
    fetchBiometricTypeByName() {},
    fetchBiometricsType() {
      this.$axios
        .get('/api/biometricsType/' + (this.isEditing ? '' : 'nonDeleted'))
        .then((response) => {
          this.biometricsType = response.data
        })
        .catch(() => {
          this.biometricsType = []
        })
    },
    initializeObservation(editingObservation) {
      this.observation = editingObservation
    }
  }
}
</script>
