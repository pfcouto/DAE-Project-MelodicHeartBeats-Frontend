<template>
  <b-container>
    <div class="middleCard">
      <h1>
        {{ isEditing ? 'PRC #' + $route.query.id : 'New PRC' }}
      </h1>
      <form :disabled="!isFormValid" @submit.prevent="create">
        <b-form-group
          v-if="!isEditing"
          id="patient"
          label="Patient"
          description="The patient is required"
          :state="isPatientValid"
        >
          <b-form-select id="patient" v-model="prc.patient" required>
            <option
              v-for="patient in patients"
              :key="patient.username"
              :value="patient.username"
            >
              {{ patient.name }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group id="startDate" label="Start Date">
          <b-form-datepicker
            id="startDate"
            v-model="prc.startDate"
            :min="new Date()"
            :max="prc.endDate"
          ></b-form-datepicker>
        </b-form-group>
        <b-form-group id="endDate" label="End Date">
          <b-form-datepicker
            id="endDate"
            v-model="prc.endDate"
            :min="prc.startDate"
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
      prc: {
        doctor: this.$auth.user.sub,
        patient: null,
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
      return this.prc.patient != null
    },
    isStartDateValid() {
      return this.prc.startDate != null
    },
    isEndDateValid() {
      return this.prc.endDate != null
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
    if (!this.$auth.user.groups.includes("Doctor")) {
      this.$toast.error('Doctors only!').goAway(3000)
      this.$router.back();
    }
  },
  async mounted() {
    await this.$route

    if (this.isEditing) {
      this.$axios
        .$get('/api/prcs/' + this.$route.query.id)
        .then((response) => {
          this.prc = response;
        })
        .catch((error) => {
          this.errorMsg = error.response.data
        })
    } else {
      this.$axios
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
      this.prc = {}
      this.prc.startDate =
        new Date().getFullYear() +
        '-' +
        (new Date().getMonth() + 1) +
        '-' +
        new Date().getDate()
    },
    create() {
      this.$axios
        .$post('/api/prcs', this.prc)
        .then(() => {
          this.$toast.success("PRC created successfully").goAway(3000)
          this.$router.push('/prcs')
        })
        .catch((error) => {
          this.$toast.error("PRC not created").goAway(3000)
          this.errorMsg = error.response.data
        })
    },
    update() {
      this.$axios
        .$put('/api/prcs/' + this.$route.query.id, this.prc)
        .then(() => {
          this.$toast.success("PRC #" + this.$route.query.id + " updated successfully").goAway(3000)
          this.$router.push('/prcs')
        })
        .catch((error) => {
          this.$toast.error("PRC #" + this.$route.query.id + " was not updated").goAway(3000)
          this.errorMsg = error.response.data
        })
    },
  }
}
</script>
