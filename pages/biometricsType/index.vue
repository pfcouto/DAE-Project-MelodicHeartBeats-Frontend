<template>
  <b-container>
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
          <input id="file-input" type="file" accept=".csv"/>
          <b-button variant="info" @click="importCSV">IMPORT CSV</b-button>
          <nuxt-link to="biometricsType/create">
            <b-button variant="success">NEW</b-button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </b-container>
</template>
<script>
export default {
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
      csv: null,
    }
  },
  computed: {
    isCSVSelected() {
      return document.getElementById("file-input") ? document.getElementById("file-input").value : false
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
      if (!this.isCSVSelected) {
        this.$toast.error("Select a csv file first").goAway(3000);
        return;
      }
      const formData = new FormData();
      const file = document.querySelector('#file-input');
      formData.append("file", file.files[0]);
      this.$axios.post('/api/biometricsType/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        document.getElementById("file-input").value = null
        this.$toast.success(response).goAway(3000);
        this.fetchBiometricTypes()
      }).catch(() => {
        this.$toast.error("Some error occurred while loading csv").goAway(3000);
      })
    },
    deleteBioType(code) {
      this.$axios
        .$delete('/api/biometricsType/' + code)
        .then(() => {
          this.fetchBiometricTypes()
        })
        .catch((error) => {
          this.errorMsg = error.response.data
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
