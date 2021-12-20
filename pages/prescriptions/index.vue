<template>
  <div>
    <b-container>
      <b-table striped over :items="prescriptions" :fields="fields">
        <template #cell(actions)="row">
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
      fields: ['id', 'doctor', 'patient', 'description', 'startDate', 'endDate'],
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
