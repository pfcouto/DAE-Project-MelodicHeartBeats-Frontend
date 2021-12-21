<template>
  <b-container>
    <div class="middleCard">
      <h1>Create a new Biometric Type</h1>
      <form :disabled="!isFormValid" @submit.prevent="create">
        <b-form-group
          id="type"
          label="Type"
          description="The type is required"
          :state="isTypeValid"
        >
          <b-input
            id="type"
            v-model.trim="biometricsType.type"
            :state="isTypeValid"
            trim
          >
          </b-input>
        </b-form-group>
        <b-form-group
          id="max"
          label="Max"
          description="The Max is required"
          :state="isMaxValid"
        >
          <b-input
            id="max"
            v-model.number="biometricsType.max"
            type="number"
            :state="isMaxValid"
            trim
          >
          </b-input>
        </b-form-group>
        <b-form-group
          id="min"
          label="Min"
          description="The Min is required"
          :state="isMinValid"
        >
          <b-input
            id="max"
            v-model.number="biometricsType.min"
            type="number"
            :state="isMinValid"
            trim
          >
          </b-input>
        </b-form-group>
        <b-form-group
          id="unity"
          label="Unity"
          description="The Unity is required"
          :state="isUnityValid"
        >
          <b-input
            id="type"
            v-model.trim="biometricsType.unity"
            :state="isUnityValid"
            trim
          >
          </b-input>
        </b-form-group>
        <b-form-group
          id="admin"
          label="Admin"
          description="The Admin is required"
          :state="isAdminValid"
        >
          <b-form-select
            id="patient"
            v-model="biometricsType.admin"
            required
            :state="isAdminValid"
          >
            <option :key="null" :value="null">Escolha uma opção.</option>
            <option
              v-for="admin in admins"
              :key="admin.username"
              :value="admin.username"
            >
              {{ admin.name }}
            </option>
          </b-form-select>
        </b-form-group>
        <p v-show="errorMsg" class="text-danger">{{ errorMsg }}</p>
        <nuxt-link to="/biometricsType">
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
      biometricsType: {
        type: null,
        max: null,
        min: null,
        unity: null,
        admin: null
      },
      admins: [],
      errorMsg: false
    }
  },
  computed: {
    isTypeValid() {
      return this.biometricsType.type != null
    },
    isMaxValid() {
      return this.biometricsType.max != null
    },
    isMinValid() {
      return this.biometricsType.min != null
    },
    isUnityValid() {
      return this.biometricsType.unity != null
    },
    isAdminValid() {
      return this.biometricsType.admin != null
    },
    isFormValid() {
      if (!this.isTypeValid) {
        return false
      }
      if (!this.isMaxValid) {
        return false
      }
      if (!this.isMinValid) {
        return false
      }
      if (!this.isUnityValid) {
        return false
      }
      if (!this.isAdminValid) {
        return false
      }
      return true
    }
  },
  mounted() {
    this.$axios
      .get('/api/administrators')
      .then((response) => {
        this.admins = response.data
      })
      .catch(() => {
        this.administrators = []
      })
  },
  methods: {
    reset() {
      this.errorMsg = false
      this.biometricsType = {}
    },
    create() {
      this.$axios
        .$post('/api/biometricsType', this.biometricsType)
        .then(() => {
          this.$router.push('/biometricsType')
        })
        .catch((error) => {
          this.errorMsg = error.response.data
        })
    }
  }
}
</script>
