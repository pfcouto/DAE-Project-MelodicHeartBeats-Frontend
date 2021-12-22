<template>
  <b-container>
    <div class="middleCard">
      <h1>Create a new Biometric Type</h1>
      <form :disabled="!isFormValid" @submit.prevent="create">
        <b-form-group
          id="name"
          label="Name"
          description="The name is required"
          :state="isNameValid"
        >
          <b-input
            id="name"
            v-model.trim="biometricsType.name"
            placeholder="Enter name..."
            :state="isNameValid"
            trim
          >
          </b-input>
        </b-form-group>
        <b-form-group
          id="description"
          label="Description"
          description="The description is required"
          :state="isNameValid"
        >
          <b-form-textarea
            id="description"
            v-model.trim="biometricsType.description"
            placeholder="Enter description..."
            rows="3"
            max-rows="3"
            :state="isNameValid"
            trim
          >
          </b-form-textarea>
        </b-form-group>
        <b-form-group
          id="valueMax"
          label="Value Max"
          description="The Value Max is required"
          :state="isValueMaxValid"
        >
          <b-input
            id="valueMax"
            v-model.number="biometricsType.valueMax"
            placeholder="Enter Max Value..."
            type="number"
            :state="isValueMaxValid"
            trim
          >
          </b-input>
        </b-form-group>
        <b-form-group
          id="valueMin"
          label="Value Min"
          description="The Value Min is required"
          :state="isValueMinValid"
        >
          <b-input
            id="max"
            v-model.number="biometricsType.valueMin"
            placeholder="Enter Min Value..."
            type="number"
            :state="isValueMinValid"
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
            id="unity"
            v-model.trim="biometricsType.unity"
            placeholder="Enter unity..."
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
            <option :key="null" :value="null">Choose the admin...</option>
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
        name: null,
        description: null,
        valueMax: null,
        valueMin: null,
        unity: null,
        admin: null
      },
      admins: [],
      errorMsg: false
    }
  },
  computed: {
    isNameValid() {
      return this.biometricsType.name != null
    },
    isValueMaxValid() {
      return this.biometricsType.valueMax != null
    },
    isValueMinValid() {
      return this.biometricsType.valueMin != null
    },
    isUnityValid() {
      return this.biometricsType.unity != null
    },
    isAdminValid() {
      return this.biometricsType.admin != null
    },
    isFormValid() {
      if (!this.isNameValid) {
        return false
      }
      if (!this.isValueMaxValid) {
        return false
      }
      if (!this.isValueMinValid) {
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
