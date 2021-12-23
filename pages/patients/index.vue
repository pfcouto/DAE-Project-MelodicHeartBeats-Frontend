<template>
  <b-container>
    <div class="middleCard">
      <div class="xOverflow">
        <b-table striped hover :items="patients" :fields="fields">
          <template #cell(actions)="row">
            <nuxt-link
              class="btn btn-link"
              :to="`/patients/${row.item.username}`"
            >
              <b-button variant="info"> Details</b-button>
            </nuxt-link>
            <nuxt-link
              class="btn btn-link"
              :to="{
              name: 'patients-create',
              query: { username: `${row.item.username}` }
            }"
            >
              <b-button variant="info"> Update</b-button>
            </nuxt-link>
          </template>
        </b-table>
      </div>
      <div class="spaceBetween">
        <nuxt-link to="/">
          <b-button variant="danger">BACK</b-button>
        </nuxt-link>
        <nuxt-link to="patients/create" style="float: right">
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
        'username',
        'name',
        'birthDate',
        'email',
        'phoneNumber',
        {key: 'actions', tdClass: 'text-center', label: ''}
      ],
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
