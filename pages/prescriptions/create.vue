<template>
  <div>
    <h1>Create a new Prescription</h1>
    <form :disabled="!isFormValid" @submit.prevent="create">
      <b-form-group
        id="doctor"
        label="Doctor"
        description="The doctor is required"
        :invalid-feedback="invalidDoctorFeedback"
        :state="isDoctorValid"
      >
        <b-input
          id="patient"
          v-model.trim="prescription.doctor"
          :state="isDoctorValid"
          trim
        ></b-input>
      </b-form-group>
      <b-form-group
        id="patient"
        label="Patient"
        description="The patient is required"
        :invalid-feedback="invalidPatientFeedback"
        :state="isPatientValid"
      >
        <b-input
          id="patient"
          v-model.trim="prescription.patient"
          :state="isPatientValid"
          trim
        ></b-input>
      </b-form-group>
      <b-form-group
        id="description"
        label="Prescription"
      >
        <b-input
          id="description"
          v-model.trim="prescription.description"
          trim
        ></b-input>
      </b-form-group>

      <p v-show="errorMsg" class="text-danger">{{ errorMsg }}</p>
      <nuxt-link to="/prescriptions">Return</nuxt-link>
      <button type="reset" @click="reset">RESET</button>
      <button :disabled="!isFormValid" @click.prevent="create">CREATE</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      prescription: {
        doctor: null,
        patient: null,
        description: null,
        errorMsg: false
      }

    }
  },

  computed: {
    invalidDoctorFeedback() {
      return 'Doctor invalid! Maybe xxx'
    },
    invalidPatientFeedback() {
      return 'Patient invalid! Maybe xxx'
    },
    isDoctorValid() {
      return (this.prescription.doctor && this.prescription.doctor.length > 0);
    },
    isPatientValid() {
      return (this.prescription.patient && this.prescription.patient.length > 0);
    },
    isFormValid() {
      if (!this.isDoctorValid) {
        return false
      }
      if (!this.isPatientValid) {
        return false
      }
      return true
    }
  },
  methods: {
    reset() {
      this.errorMsg = false
    },
    create() {
      this.$axios
        .$post('/api/prescriptions', this.prescription)
        .then(() => {
          this.$router.push('/prescriptions')
        })
        .catch((error) => {
          this.errorMsg = error.response.data
        })
    }
  }
}
</script>
