<template>
  <div>
    <b-container>
      <b-table striped over :items="patients" :fields="fields">
        <template #cell(actions)="row">
          <nuxt-link
            class="btn btn-link"
            :to="`/patients/${row.item.username}`"
          >
            Details
          </nuxt-link>
          <!-- <nuxt-link
            class="btn btn-link"
            :to="`/patients/${row.item.username}/send-email`"
          >
            Send Email
          </nuxt-link> -->
        </template>
      </b-table>
      <nuxt-link to="/">
        <b-button variant="danger"> Back </b-button>
      </nuxt-link>
      <!-- <nuxt-link to="patients/create" style="float: right">
        <b-button variant="success"> Create New Doctor </b-button>
      </nuxt-link> -->
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fields: ['username', 'name', 'birthDate', 'email', 'phoneNumber'],
      patients: []
    }
  },
  created() {
    this.$axios.$get('/api/patients/').then((patients) => {
      this.patients = patients
    })
  }
}
</script>
<style></style>
