<template>
  <div>
    <b-container>
      <b-table striped over :items="doctors" :fields="fields">
        <template #cell(actions)="row">
          <nuxt-link class="btn btn-link" :to="`/doctors/${row.item.username}`">
            Details
          </nuxt-link>
          <!-- <nuxt-link
            class="btn btn-link"
            :to="`/doctors/${row.item.username}/send-email`"
          >
            Send Email
          </nuxt-link> -->
        </template>
      </b-table>
      <nuxt-link to="/">
        <b-button variant="danger"> Back </b-button>
      </nuxt-link>
      <nuxt-link to="doctors/create" style="float: right">
        <b-button variant="success"> Create New Doctor </b-button>
      </nuxt-link>
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fields: ['username', 'name', 'email','birthDate', 'phoneNumber', 'office'],
      doctors: []
    }
  },
  created() {
    this.$axios.$get('/api/doctors/').then((doctors) => {
      this.doctors = doctors
    })
  }
}
</script>
<style></style>
