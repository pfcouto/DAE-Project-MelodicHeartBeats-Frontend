<template>
  <b-container>
    <div class="middleCard">
      <b-table striped over :items="observations" :fields="fields">
        <template #cell(patient)="row">
          <nuxt-link class="btn btn-link" :to="`/patients/${row.item.patient}`">
            {{ row.item.patient }}
          </nuxt-link>
        </template>

        <template #cell(details)="row">
          <nuxt-link
            class="btn btn-link"
            :to="{
              name: 'observations-create',
              query: { code: `${row.item.code}` }
            }"
          >
            <b-button variant="info"> Update</b-button>
          </nuxt-link>
        </template>
      </b-table>
      <div class="spaceBetween">
        <nuxt-link to="/">
          <b-button variant="danger"> Back</b-button>
        </nuxt-link>
        <nuxt-link to="observations/create" style="float: right">
          <b-button variant="success"> Insert New Observation</b-button>
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
        { sortable: true, key: 'date' },
        'patient',
        'biometricType',
        { sortable: true, key: 'quantitativeValue' },
        'qualitativeValue',
        'what',
        'local',
        {
          key: 'details',
          label: '',
          tdClass: 'text-center'
        }
      ],
      observations: []
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
      this.$axios.$get('/api/observations/').then((response) => {
        this.observations = response
      })
    }
  }
}
</script>
