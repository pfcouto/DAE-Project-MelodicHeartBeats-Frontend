<template>
  <b-container>
    <div class="middleCard">
      <b-table striped over :items="biometricsTypes" :fields="fields">
        <template #cell(details)="row">
          <nuxt-link class="btn btn-link" :to="`/prescriptions/${row.item.id}`">
            <b-button variant="info"> Details</b-button>
          </nuxt-link>
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
        { sortable: true, key: 'type' },
        { sortable: true, key: 'max' },
        {
          sortable: true,
          key: 'min'
        },
        'unity',
        'admin',
        {
          key: 'details',
		  label:'',
		  tdClass:'text-center'
        },
      ],
      biometricsTypes: []
    }
  },
  created() {
    this.$axios.$get('/api/biometricsType/').then((response) => {
      this.biometricsTypes = response
    })
  }
}
</script>
