<template>
  <b-container>
    <div class="middleCard">
      <b-table striped over :items="patients" :fields="fields">
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
          <b-button variant="danger" @click="deletePatient(row)"
            >DELETE</b-button
          >
        </template>
      </b-table>
      <div class="spaceBetween">
        <nuxt-link to="/">
          <b-button variant="danger">BACK</b-button>
        </nuxt-link>
        <nuxt-link to="patients/create" style="float: right">
          <b-button variant="success">CREATE NEW PATIENT</b-button>
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
        { sortable: true, key: 'name' },
        { sortable: true, key: 'birthDate' },
        'email',
        'phoneNumber',
        { key: 'actions', tdClass: 'text-center', label: '' }
      ],
      patients: []
    }
  },
  created() {
    this.$axios.$get('/api/patients/').then((patients) => {
      this.patients = patients
    })
  },
  methods: {
    deletePatient(row) {
      this.$axios
        .$delete('/api/patients/' + row.item.username)
        .then(() => {
          this.$toast
            .success('Patient #' + row.item.username + ' deleted successfully')
            .goAway(3000)
          this.patients.splice(row.index, 1)
        })
        .catch(() => {
          this.$toast
            .error('Patient #' + row.item.username + ' was not deleted')
            .goAway(3000)
        })
    }
  }
}
</script>
<style></style>
