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
            }"
            >
              <b-icon-pencil-square v-if="row.item.delete === false" style="color: orange;"
                                    font-scale="2"></b-icon-pencil-square>

            </nuxt-link>
            <b-icon-trash v-if="row.item.delete === false" style="color: red;" font-scale="2"
                          @click="deleteBioType(row.item.code)"></b-icon-trash>
            <b-icon-arrow-clockwise v-else style="color: red;" font-scale="2"
                                    @click="deleteBioType(row.item.code)"></b-icon-arrow-clockwise>
          </template>
        </b-table>
      </div>
      <div class="spaceBetween">
        <nuxt-link to="/">
          <b-button variant="danger"> Back</b-button>
        </nuxt-link>
        <nuxt-link to="biometricsType/create" style="float: right">
          <b-button variant="success">NEW</b-button>
        </nuxt-link>
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
        {sortable: true, key: 'name'},
        'description',
        {
          sortable: true,
          key: 'valueMin'
        },
        {sortable: true, key: 'valueMax'},
        'unity',
        'admin',
        'delete',
        {
          key: 'details',
          label: '',
          tdClass: 'text-center'
        }
      ],
      biometricsTypes: []
    }
  },
  computed: {
    coloredBiometricType() {
      if (!this.biometricsTypes || this.biometricsTypes.length < 1) return []
      return this.biometricsTypes.map((biometrictype) => {
        biometrictype._rowVariant =
          biometrictype.delete === true ? 'danger' : ''
        return biometrictype
      })
    }
  },
  created() {
    this.fetchBiometricTypes()
  },
  methods: {
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
