<template>
  <b-container>
    <div class="middleCard">
      <h1>
        {{ isEditing ? 'Prescription #' + $route.query.id : 'New Prescription' }}
      </h1>
      <form :disabled="!isFormValid" @submit.prevent="create">
        <b-form-group
          id="doctor"
          label="Doctor"
          description="The doctor is required"
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
          :state="isPatientValid"
        >
          <b-form-select id="patient" v-model="prescription.patient" required>
            <option
              v-for="patient in patients"
              :key="patient.username"
              :value="patient.username"
            >
              {{ patient.name }}
            </option>
          </b-form-select>
        </b-form-group>

        <b-form-group id="description" label="Prescription">
          <b-input
            id="description"
            v-model.trim="prescription.description"
            trim
          ></b-input>
        </b-form-group>
        <b-form-group id="startDate" label="Start Date">
          <b-form-datepicker
            id="startDate"
            v-model="prescription.startDate"
            :min="new Date()"
            :max="prescription.endDate"
          ></b-form-datepicker>
        </b-form-group>
        <b-form-group id="endDate" label="End Date">
          <b-form-datepicker
            id="endDate"
            v-model="prescription.endDate"
            :min="prescription.startDate"
          ></b-form-datepicker>
        </b-form-group>

        <p v-show="errorMsg" class="text-danger">{{ errorMsg }}</p>
        <nuxt-link to="/prescriptions">
          <b-button variant="info"> Return</b-button>
        </nuxt-link>
        <div style="float: right">
          <b-button v-if="isEditing" variant="danger" @click="del">Delete</b-button>
          <b-button variant="dark" type="reset" @click="reset"> RESET</b-button>
          <b-button
            v-if="!isEditing"
            variant="success"
            :disabled="!isFormValid"
            @click.prevent="create"
          >
            CREATE
          </b-button>
          <b-button
            v-else
            variant="success"
            :disabled="!isFormValid"
            @click.prevent="update"
          >
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
      prescription: {
        doctor: null,
        patient: null,
        description: null,
        startDate:
          new Date().getFullYear() +
          '-' +
          (new Date().getMonth() + 1) +
          '-' +
          new Date().getDate(),
        endDate: null
      },
      patients: [],
      errorMsg: false
    }
  },

  computed: {
    isEditing() {
      return this.$route.query.id != null
    },
    isDoctorValid() {
      return this.prescription.doctor && this.prescription.doctor.length > 3
    },
    isPatientValid() {
      return this.prescription.patient != null
    },
    isStartDateValid() {
      return this.prescription.startDate != null
    },
    isEndDateValid() {
      return this.prescription.endDate != null
    },
    isFormValid() {
      if (!this.isDoctorValid) {
        return false
      }
      if (!this.isPatientValid) {
        return false
      }
      if (!this.isStartDateValid) {
        return false
      }
      if (!this.isEndDateValid) {
        return false
      }
      return true
    }
  },
  async mounted() {
    this.$axios
      .get('/api/patients')
      .then((response) => {
        this.patients = response.data
      })
      .catch(() => {
        this.patients = []
      })
    await this.$route

    if (this.isEditing) {
      this.$axios
        .$get('/api/prescriptions/' + this.$route.query.id)
        .then((response) => {
          this.prescription = response;
        })
        .catch((error) => {
          this.errorMsg = error.response.data
        })
    }
  },
  methods: {
    del() {
      this.$axios.$delete('/api/prescriptions/' + this.$route.query.id).then((response) => {
        this.$toast.success("Transaction #" + this.$route.query.id + " deleted successfuly")
        this.$router.push('/prescriptions')
      }).catch((error) => {
        this.$toast.danger("Transaction #" + this.$route.query.id + " was not deleted")
        this.errorMsg = error.response.data
      })
    },
    reset() {
      this.errorMsg = false
      this.prescription = {}
      this.prescription.startDate =
        new Date().getFullYear() +
        '-' +
        (new Date().getMonth() + 1) +
        '-' +
        new Date().getDate()
    },
    create() {
      this.$axios
        .$post('/api/prescriptions', this.prescription)
        .then(() => {
          this.$toast.success("Transaction #" + this.$route.query.id + " created successfuly")
          this.$router.push('/prescriptions')
        })
        .catch((error) => {
          this.$toast.danger("Transaction #" + this.$route.query.id + " was not created")
          this.errorMsg = error.response.data
        })
    },
    update() {
      this.$axios
        .$put('/api/prescriptions/' + this.$route.query.id, this.prescription)
        .then(() => {
          this.$toast.success("Transaction #" + this.$route.query.id + " updated successfuly")
          this.$router.push('/prescriptions')
        })
        .catch((error) => {
          this.$toast.danger("Transaction #" + this.$route.query.id + " was not updated")
          this.errorMsg = error.response.data
        })
    },
  }
}
</script>
