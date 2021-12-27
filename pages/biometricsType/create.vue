<template>
  <b-container>
    <div class="middleCard">
      <h1>
        {{
          isEditing
            ? 'Update Biometric Type ' + biometricType.name
            : 'Create a new Biometric Type'
        }}
      </h1>
      <form :disabled="!isFormValid" @submit.prevent="create">
        <b-form-group
          id="name"
          label="Name"
          description="The name is required"
          :state="isNameValid"
        >
          <b-input
            id="name"
            v-model.trim="biometricType.name"
            placeholder="Enter name..."
            :state="isNameValid"
            trim
          >
          </b-input>
        </b-form-group>
        <b-form-group
          id="description"
          label="Description"
          :description="charactersLeft(biometricType.description)"
          :state="isNameValid"
        >
          <b-form-textarea
            id="description"
            v-model.trim="biometricType.description"
            placeholder="Enter description..."
            rows="2"
            max-rows="2"
            style="resize: none"
            maxlength="255"
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
            v-model.number="biometricType.valueMax"
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
            v-model.number="biometricType.valueMin"
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
            v-model.trim="biometricType.unity"
            placeholder="Enter unity..."
            :state="isUnityValid"
            trim
          >
          </b-input>
        </b-form-group>
        <b-form-group
          id="admin"
          :disabled="isEditing"
          label="Admin"
          description="The Admin is required"
          :state="isAdminValid"
        >
          <b-form-select
            id="patient"
            v-model="biometricType.admin"
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
        <div v-for="item in biometricType.qualitatives" :key="item.value">
          {{ item.value + ": " + item.meaning }}
          <a @click="removeQualitative(item)">Remove</a>
        </div>


        <div class="flex-row">
          <div style="margin-right: 0; width: 25%">
            <b-form-group
              label="Quantitative Value"
            >
              <b-input
                v-model.number="newQualitative.value"
                type="number"
              >
              </b-input>
            </b-form-group>
          </div>
          <div style="margin-right: 0; width: 50%">
            <b-form-group
              label="Qualitative Value"
            >
              <b-input
                v-model="newQualitative.meaning"
                type="text"
              >
              </b-input>
            </b-form-group>
          </div>
          <b-button @click="addNewQualitative">ADD</b-button>
        </div>


        <p v-show="errorMsg" class="text-danger">{{ errorMsg }}</p>
        <nuxt-link to="/biometricsType">
          <b-button variant="info"> Return</b-button>
        </nuxt-link>
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
      biometricType: {
        name: null,
        description: null,
        valueMax: null,
        valueMin: null,
        unity: null,
        admin: null,
        qualitatives: []
      },
      newQualitative: {value: null, meaning: null},
      admins: [],
      errorMsg: false
    }
  },
  computed: {
    isEditing() {
      return this.$route.query.code != null
    },
    isNameValid() {
      return this.biometricType.name != null
    },
    isValueMaxValid() {
      return this.biometricType.valueMax != null
    },
    isValueMinValid() {
      return this.biometricType.valueMin != null
    },
    isUnityValid() {
      return this.biometricType.unity != null
    },
    isAdminValid() {
      return this.biometricType.admin != null
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
  async mounted() {
    await this.$route

    if (this.isEditing) {
      await this.fetchBiometricType()
    }
    await this.$axios
      .get('/api/administrators')
      .then((response) => {
        this.admins = response.data
      })
      .catch(() => {
        this.administrators = []
      })
  },
  methods: {
    addNewQualitative() {
      if (!this.newQualitative.value) {
        return
      }
      const obj = this.biometricType.qualitatives.filter(o => o.value === this.newQualitative.value)
      if (obj.length > 0) {
        return
      }
      this.biometricType.qualitatives.push(this.newQualitative)
      this.newQualitative = {}
    },
    removeQualitative(item) {
      const idx = this.biometricType.qualitatives.indexOf(item)
      this.biometricType.qualitatives.splice(idx, 1)
    },
    reset() {
      this.errorMsg = false
      this.biometricType = {}
      if (this.isEditing) {
        this.fetchBiometricType()
      }
    },
    create() {
      this.$axios
        .$post('/api/biometricsType', this.biometricType)
        .then(() => {
          this.$router.push('/biometricsType')
        })
        .catch((error) => {
          this.errorMsg = error.response.data
        })
    },
    update() {
      this.$axios
        .$patch(
          '/api/biometricsType/update/' + this.$route.query.code,
          this.biometricType
        )
        .then(() => {
          this.$router.push('/biometricsType')
        })
        .catch((error) => {
          this.errorMsg = error.response.data
        })
    },
    fetchBiometricType() {
      this.$axios
        .$get('/api/biometricsType/' + this.$route.query.code)
        .then((response) => {
          this.initializeBiometricType(response)
        })
        .catch((error) => {
          this.errorMsg = error.response.data
        })
    },
    initializeBiometricType(biometricType) {
      this.biometricType = biometricType
    },
    charactersLeft(descrip) {
      let char = 0
      if (descrip) {
        char = descrip.length
      }
      const limit = 255

      return limit - char + ' / ' + limit + ' Caracteres em falta'
    }
  }
}
</script>
