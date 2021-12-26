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
            <b-button variant="danger" @click="blockOrUnblockPatient(row)"
              >DELETE</b-button
            >
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
    if (this.$auth.user.groups[0] === 'Administrator') {
      this.$axios.$get('/api/patients/all').then((patients) => {
        this.fields.push({ key: 'blocked', label: 'Is Blocked' })

        this.patients = patients
      })
    }

    if (this.$auth.user.groups[0] === 'Doctor') {
      this.$axios.$get('/api/patients/').then((patients) => {
        this.patients = patients
        // console.log(this.patients)
      })
    }

    // this.$axios.$get('/api/patients/all').then((patients) => {
    //   this.patients = patients
    // })
  },
  methods: {
    blockOrUnblockPatient(row) {
      this.$axios
        .$patch('/api/patients/' + row.item.username)
        .then(() => {
          if (!this.patients[row.index].blocked) {
            this.$toast
              .success(
                'Patient #' + row.item.username + ' blocked successfully'
              )
              .goAway(3000)
            this.patients[row.index].blocked = true
          } else {
            this.$toast
              .success(
                'Patient #' + row.item.username + ' unblock successfully'
              )
              .goAway(3000)
            this.patients[row.index].blocked = false
          }
        })
        .catch(() => {
          this.$toast
            .error('Patient #' + row.item.username + ' was not blocked')
            .goAway(3000)
        })
    }
  }
}
</script>
<style></style>
