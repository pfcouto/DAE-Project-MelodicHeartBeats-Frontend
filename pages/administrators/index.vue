<template>
  <div>
    <b-container>
      <div class="middleCard">
        <b-table striped over :items="administrators" :fields="fields">
          <template #cell(actions)="row">
            <nuxt-link
              class="btn btn-link"
              :to="`/administrators/${row.item.username}`"
            >
              <b-button variant="info"> Details</b-button>
            </nuxt-link>
            <nuxt-link
              class="btn btn-link"
              :to="{
                name: 'administrators-create',
                query: { username: `${row.item.username}` }
              }"
            >
              <b-button variant="info"> Update</b-button>
            </nuxt-link>
            <b-button variant="danger" @click="deleteAdministrator(row)"
              >DELETE</b-button
            >
          </template>
        </b-table>
        <div class="spaceBetween">
          <nuxt-link to="/">
            <b-button variant="danger">BACK</b-button>
          </nuxt-link>
          <nuxt-link to="administrators/create" style="float: right">
            <b-button variant="success">CREATE NEW ADMINISTRATOR</b-button>
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
        { key: 'actions', tdClass: 'text-center', label: '' }
      ],
      administrators: []
    }
  },
  created() {
    this.$axios.$get('/api/administrators/').then((administrators) => {
      this.administrators = administrators
    })
  },
  methods: {
    deleteAdministrator(row) {
      this.$axios
        .$delete('/api/administrators/' + row.item.username)
        .then(() => {
          this.$toast
            .success(
              'Administrator #' + row.item.username + ' deleted successfully'
            )
            .goAway(3000)
          this.administrators.splice(row.index, 1)
        })
        .catch(() => {
          this.$toast
            .error('Administrator #' + row.item.username + ' was not deleted')
            .goAway(3000)
        })
    }
  }
}
</script>
<style></style>
