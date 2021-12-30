<template>
  <b-container>
    <div class="middleCard">
      <h1>
        {{ isEditing ? 'Prescription #' + $route.query.id : 'New Prescription' }}
      </h1>
      <form :disabled="!isFormValid" @submit.prevent="create">
        <b-form-group
          v-if="!isEditing"
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
          <b-form-textarea
            id="description"
            v-model.trim="prescription.description"
            trim
          ></b-form-textarea>
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
        <b-button variant="info" @click="routeBack">RETURN</b-button>
        <div style="float: right">
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
        doctor: this.$auth.user.sub,
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
  beforeCreate() {
    if (this.$auth.user.groups[0] !== "Doctor") {
      this.$toast.error('Doctors only!').goAway(3000)
      this.$router.back();
    }
  },
  async mounted() {
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
    } else {
      await this.$axios
        .get('/api/patients')
        .then((response) => {
          this.patients = response.data
        })
        .catch(() => {
          this.patients = []
        })
    }
  },
  methods: {
    routeBack() {
      this.$router.back();
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
          this.$toast.success("Prescription created successfully").goAway(3000)
          this.$router.push('/prescriptions')
        })
        .catch((error) => {
          this.$toast.error("Prescription not created").goAway(3000)
          this.errorMsg = error.response.data
        })
    },
    update() {
      this.$axios
        .$put('/api/prescriptions/' + this.$route.query.id, this.prescription)
        .then(() => {
          this.$toast.success("Prescription #" + this.$route.query.id + " updated successfully").goAway(3000)
          this.$router.push('/prescriptions')
        })
        .catch((error) => {
          this.$toast.error("Prescription #" + this.$route.query.id + " was not updated").goAway(3000)
          this.errorMsg = error.response.data
        })
    },
  }
}
</script>
