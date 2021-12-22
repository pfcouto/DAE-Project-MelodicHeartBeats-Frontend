<template>
  <div>
    <b-container>
      <div class="middleCard">
        <b-table striped over :items="doctors" :fields="fields">
          <template #cell(actions)="row">
            <nuxt-link
              class="btn btn-link"
              :to="`/doctors/${row.item.username}`"
            >
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
            <b-button variant="danger" @click="deleteDoctor(row)"
              >DELETE</b-button
            >
          </template>
        </b-table>
        <div class="spaceBetween">
          <nuxt-link to="/">
            <b-button variant="danger">BACK</b-button>
          </nuxt-link>
          <nuxt-link to="doctors/create" style="float: right">
            <b-button variant="success">CREATE NEW DOCTOR</b-button>
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
        { sortable: true, key: 'name' },
        { sortable: true, key: 'birthDate' },
        'email',
        'phoneNumber',
        'office',
        { key: 'actions', tdClass: 'text-center', label: '' }
      ],
      doctors: []
    }
  },
  created() {
    this.$axios.$get('/api/doctors/').then((doctors) => {
      this.doctors = doctors
    })
  },
  methods: {
    deleteDoctor(row) {
      this.$axios
        .$delete('/api/doctors/' + row.item.username)
        .then(() => {
          this.$toast
            .success('Doctor #' + row.item.username + ' deleted successfully')
            .goAway(3000)
          this.doctors.splice(row.index, 1)
        })
        .catch(() => {
          this.$toast
            .error('Doctor #' + row.item.username + ' was not deleted')
            .goAway(3000)
        })
    }
  }
}
</script>
<style></style>
