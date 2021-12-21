<template>
  <div>
    <b-container>
      <b-table striped over :items="prescriptions" :fields="fields">
        <template #cell(details)="row">
          <nuxt-link class="btn btn-link" :to="`/prescriptions/${row.item.id}`">
            Details
          </nuxt-link>
        </template>
      </b-table>
      <nuxt-link to="/">
        <b-button variant="danger"> Back</b-button>
      </nuxt-link>
      <nuxt-link to="prescriptions/create" style="float: right">
        <b-button variant="success"> Create New Prescription</b-button>
      </nuxt-link>
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fields: ['id', {sortable: true, key: 'doctor'}, {sortable: true, key: 'patient'}, 'description', {
        sortable: true,
        key: 'startDate'
      }, {sortable: true, key: 'endDate'}, {
        key: 'details',
        label: ''
      }],
      prescriptions: []
    }
  },
  created() {
    this.$axios.$get('/api/prescriptions/').then((prescriptions) => {
      this.prescriptions = prescriptions
    })
  }
}
</script>
<style></style>
