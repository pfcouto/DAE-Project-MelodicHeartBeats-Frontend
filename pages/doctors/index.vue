<template>
  <div>
    <b-container>
      <div class="middleCard">
        <b-table striped over :items="doctors" :fields="fields">
          <template #cell(actions)="row">
            <nuxt-link class="btn btn-link" :to="`/doctors/${row.item.username}`">
              <b-button variant="info"> Details</b-button>
            </nuxt-link>
            <nuxt-link
              class="btn btn-link"
              :to="{
              name: 'doctors-create',
              query: { username: `${row.item.username}` }
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
          <nuxt-link to="doctors/create" style="float: right">
            <b-button variant="success"> Create New Doctor</b-button>
          </nuxt-link>
        </div>
      </div>
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fields: [
        'username',
        'name',
        'email',
        'birthDate',
        'phoneNumber',
        'office',
        {key: 'actions', tdClass: 'text-center', label: ''}
      ],
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
