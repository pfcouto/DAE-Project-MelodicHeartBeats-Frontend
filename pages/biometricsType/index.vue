<template>
  <b-container>
    <div class="middleCard">
      <b-table striped over :items="biometricsTypes" :fields="fields">
        <template #cell(admin)="row">
          <nuxt-link
            class="btn btn-link"
            :to="`/administrators/${row.item.admin}`"
          >
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
            <b-button v-if="`${row.item.delete}` == 'false'" variant="info">
              Update</b-button
            >
          </nuxt-link>
          <b-button
            :variant="`${row.item.delete}` == 'false' ? 'danger' : 'success'"
            @click="deleteBioType(`${row.item.code}`)"
          >
            {{
              `${row.item.delete}` == 'false' ? 'Delete' : 'Restore'
            }}</b-button
          >
        </template>
      </b-table>
      <div class="spaceBetween">
        <nuxt-link to="/">
          <b-button variant="danger"> Back</b-button>
        </nuxt-link>
        <nuxt-link to="biometricsType/create" style="float: right">
          <b-button variant="success"> Create New Prescription</b-button>
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
        { sortable: true, key: 'name' },
        'description',
        { sortable: true, key: 'valueMax' },
        {
          sortable: true,
          key: 'valueMin'
        },
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
