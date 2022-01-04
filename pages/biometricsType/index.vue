<template>
  <b-container>
    <b-container class="middleCard text-center flex-row">
      <h2 class="font-weight-bold">Biometric Types</h2>
    </b-container>
    <div class="middleCard">
      <div class="xOverflow">
        <b-table striped hover :items="coloredBiometricType" :fields="fields">
          <template #cell(admin)="row">
            <nuxt-link :to="`/administrators/${row.item.admin}`">
              {{ row.item.admin }}
            </nuxt-link>
          </template>
          <template #cell(details)="row">
            <nuxt-link
              class="btn btn-link"
              :to="`/biometricsType/${row.item.code}`">
              <b-icon-file-earmark-text
                style="color: darkcyan"
                font-scale="2"></b-icon-file-earmark-text>
            </nuxt-link>
            <nuxt-link
              class="btn btn-link"
              :to="{
                name: 'biometricsType-create',
                query: { code: `${row.item.code}` }
              }">
              <b-icon-pencil-square
                v-if="row.item.deleted_at === 'null'"
                style="color: orange"
                font-scale="2"></b-icon-pencil-square>
            </nuxt-link>
            <b-icon-trash
              v-if="row.item.deleted_at === 'null'"
              style="color: red"
              font-scale="2"
              @click="deleteBioType(row.item.code)"></b-icon-trash>
            <b-icon-arrow-clockwise
              v-else
              style="color: green"
              font-scale="2"
              @click="deleteBioType(row.item.code)"></b-icon-arrow-clockwise>
          </template>
        </b-table>
      </div>
      <div class="spaceBetween">
        <nuxt-link to="/">
          <b-button variant="danger">BACK</b-button>
        </nuxt-link>
        <div class="float-right">
          <nuxt-link to="biometricsType/create">
            <b-button variant="success">NEW</b-button>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="middleCard">
      <form @submit.prevent="importCSV">
        <b-form-file
          v-model="file"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          accept=".csv"></b-form-file>
        <div class="flex-row d-flex flex-row-reverse mt-3">
          <b-button
            variant="info"
            class="float-right"
            type="submit"
            :disabled="!hasFile"
            >IMPORT CSV</b-button
          >
        </div>
      </form>
    </div>
  </b-container>
</template>
<script>
export default {
  middleware({ redirect, store }) {
    if (
      store.state.auth.user.groups &&
      (store.state.auth.user.groups.includes('Patient') ||
        store.state.auth.user.groups.includes('Doctor'))
    ) {
      return redirect('/forbiden')
    }
  },
  data() {
    return {
      fields: [
        'code',
        { sortable: true, key: 'name' },
        'description',
        {
          sortable: true,
          key: 'valueMin'
        },
        { sortable: true, key: 'valueMax' },
        'unity',
        'admin',
        {
          key: 'details',
          label: '',
          tdClass: 'text-center'
        }
      ],
      biometricsTypes: [],
      file: null
    }
  },
  computed: {
    hasFile() {
      return this.file != null
    },
    formData() {
      const formData = new FormData()
      formData.append('username', this.$auth.user.sub)
      if (this.file) {
        formData.append('file', this.file)
      }
      return formData
    },
    coloredBiometricType() {
      if (!this.biometricsTypes || this.biometricsTypes.length < 1) return []
      return this.biometricsTypes.map((biometrictype) => {
        biometrictype._rowVariant =
          biometrictype.deleted_at !== 'null' ? 'danger' : ''
        return biometrictype
      })
    }
  },
  created() {
    this.fetchBiometricTypes()
  },
  methods: {
    importCSV() {
      if (!this.hasFile) {
        return
      }
      this.$axios
        .$post('/api/biometricsType/upload', this.formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          this.file = null
          this.$toast.success(response).goAway(3000)
          this.fetchBiometricTypes()
        })
        .catch(() => {
          this.$toast
            .error('Some error occurred while loading csv')
            .goAway(3000)
        })
    },
    deleteBioType(code) {
      this.$axios
        .$delete('/api/biometricsType/' + code)
        .then(() => {
          this.fetchBiometricTypes()
        })
        .catch((error) => {
          this.errorMsg = error.response.data.split(":")[1]
        })
    },
    fetchBiometricTypes() {
      this.$axios.$get('/api/biometricsType/').then((response) => {
        this.biometricsTypes = response
      })
    }
  }
}
</script>
