<template>
  <b-container>
    <div class="middleCard">
      <div class="xOverflow">
        <b-table striped hover :items="coloredPatients" :fields="fields">
          <template #cell(actions)="row">
            <nuxt-link
              class="btn btn-link"
              :to="`/patients/${row.item.username}`"
            >
              <b-icon-file-earmark-text style="color: darkcyan;" font-scale="2"></b-icon-file-earmark-text>
            </nuxt-link>
            <nuxt-link
              class="btn btn-link"
              :to="{
                name: 'patients-create',
                query: { username: `${row.item.username}` }
              }"
            >
              <b-icon-pencil-square style="color: orange;" font-scale="2"></b-icon-pencil-square>
            </nuxt-link>
            <b-icon-trash v-if="isAdministrator && !row.item.blocked" style="color: red;" font-scale="2"
                          @click="blockOrUnblockPatient(row)"></b-icon-trash>
            <b-icon-arrow-clockwise v-if="isAdministrator && row.item.blocked" style="color: green;" font-scale="2"
                                    @click="blockOrUnblockPatient(row)"></b-icon-arrow-clockwise>
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
        {sortable: true, key: 'name'},
        {sortable: true, key: 'birthDate'},
        'email',
        'phoneNumber',
        {key: 'actions', tdClass: 'text-center', label: ''}
      ],
      patients: []
    }
  },
  computed: {
    isDoctor() {
      return this.$auth.user.groups[0] === "Doctor"
    },
    isAdministrator() {
      return this.$auth.user.groups[0] === "Administrator"
    },
    coloredPatients() {
      if (!this.isAdministrator) {
        return this.patients
      }
      return this.patients.map((item) => {
        if (item.blocked) {
          item._rowVariant = "danger"
        } else {
          item._rowVariant = null
        }
        return item
      })
    }
  },
  created() {
    if (this.$auth.user.groups[0] === 'Administrator') {
      this.$axios.$get('/api/patients/all').then((patients) => {
        this.patients = patients
      })
    }

    if (this.$auth.user.groups[0] === 'Doctor') {
      this.$axios.$get('/api/patients/').then((patients) => {
        this.patients = patients
      })
    }
  },
  methods: {
    blockOrUnblockPatient(row) {
      this.$axios
        .$patch('/api/patients/' + row.item.username)
        .then(() => {
          if (!this.patients[row.index].blocked) {
            this.$toast
              .success(
                'Patient ' + row.item.username + ' blocked successfully'
              )
              .goAway(3000)
            this.patients[row.index].blocked = true
          } else {
            this.$toast
              .success(
                'Patient ' + row.item.username + ' unblock successfully'
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
