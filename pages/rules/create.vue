<template>
  <b-container>
    <b-container class="middleCard text-center flex-row">
      <a class="float-left" @click="routeBack">
        <b-button variant="danger">BACK</b-button>
      </a>
      <h2 class="font-weight-bold">
        {{
          isEditing ? 'Rule #' + $route.query.id : 'New Rule'
        }}
      </h2>
    </b-container>
    <div class="middleCard">
      <form :disabled="!isFormValid" @submit.prevent="create">
        <b-form-group
          v-if="!isEditing"
          id="biometricType"
          label="Biometric Type">
          <b-form-select id="biometricType" v-model="rule.biometricTypeCode" required>
            <option
              v-for="type in biometricTypes"
              :key="type.code"
              :value="type.code">
              {{ type.name }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          id="exp"
          label="Comparation Type">
          <b-form-select id="exp" v-model="rule.exp" required>
            <option value="<">Minor then</option>
            <option value="=">Equal to</option>
            <option value=">">Bigger then</option>

          </b-form-select>
        </b-form-group>
        <b-form-group id="value" label="Value">
          <b-form-input
            id="value"
            v-model.number="rule.value"
            type="number"
            trim></b-form-input>
        </b-form-group>
        <b-form-group id="days" label="Lasting Time">
          <b-form-input
            id="days"
            v-model.number="rule.days"
            type="number"
            trim></b-form-input>
        </b-form-group>
        <b-form-group id="description" label="Prescription">
          <b-form-textarea
            id="description"
            v-model.trim="rule.description"
            trim></b-form-textarea>
        </b-form-group>


        <p v-show="errorMsg" class="text-danger">{{ errorMsg }}</p>
        <div style="float: right">
          <nuxt-link v-if="rule.patient && !patientValid"
                     :to="{name: 'prcs-create', query: { patientUsername: rule.patient }}">
            <b-button variant="outline-danger" type="reset" @click="reset">CREATE PRC</b-button>
          </nuxt-link>
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
  middleware({redirect, store}) {
    if (
      !store.state.auth.user.groups ||
      store.state.auth.user.groups.includes('Patient')
    ) {
      return redirect('/forbiden')
    }
  },
  data() {
    return {
      rule: {
        doctor: this.$auth.user.sub,
        description: null,
      },
      biometricTypes: [],
      errorMsg: false
    }
  },
  computed: {
    isEditing() {
      return this.$route.query.id != null
    },
    invalidPatientFeedback() {
      if (this.rule.patient == null) {
        return ''
      }
      return this.patientValid ? '' : 'Patient has no active PRC'
    },
    invalidStartDateFeedback() {
      if (!this.prc) {
        return ""
      }
      return "PRC Start Date: " + this.prc.startDate
    },
    invalidEndDateFeedback() {
      if (!this.prc) {
        return ""
      }
      return "PRC End Date: " + this.prc.endDate
    },
    isPatientValid() {
      return this.rule.patient != null && this.patientValid
    },
    isStartDateValid() {
      if (this.rule.startDate == null) {
        return null
      }
      return this.prc && this.prc.startDate <= this.rule.startDate
    },
    isEndDateValid() {
      if (this.rule.endDate == null) {
        return null
      }
      return this.prc && this.prc.endDate >= this.rule.endDate
    },
    isFormValid() {
      return true
    }
  },
  async mounted() {
    await this.$route

    if (this.isEditing) {
      this.$axios
        .$get('/api/rules/' + this.$route.query.id)
        .then((response) => {
          this.rule = response
        })
        .catch((error) => {
          this.errorMsg = error.response.data.split(":")[1]
        })
    }
    await this.$axios
      .get('/api/biometricsType/nonDeleted')
      .then((response) => {
        this.biometricTypes = response.data
      })
      .catch(() => {
        this.biometricTypes = []
      })
  },
  methods: {
    routeBack() {
      this.$router.back()
    },
    reset() {
      this.errorMsg = false
      this.rule = {}
      this.rule.startDate =
        new Date().getFullYear() +
        '-' +
        (new Date().getMonth() + 1) +
        '-' +
        new Date().getDate()
    },
    create() {
      this.$axios
        .$post('/api/rules', this.rule)
        .then(() => {
          this.$toast.success('Rule created successfully').goAway(3000)
          this.$router.push('/rules')
        })
        .catch((error) => {
          this.$toast.error("Rule not created").goAway(3000)
          this.errorMsg = error.response.data.split(":")[1]
        })
    },
    update() {
      this.$axios
        .$put('/api/rules/' + this.$route.query.id, this.rule)
        .then(() => {
          this.$toast
            .success(
              'Rule #' + this.$route.query.id + ' updated successfully'
            )
            .goAway(3000)
          this.$router.push('/rules')
        })
        .catch((error) => {
          this.$toast.error("Rule #" + this.$route.query.id + " was not updated").goAway(3000)
          this.errorMsg = error.response.data.split(":")[1]
        })
    }
  }
}
</script>
