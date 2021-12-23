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
            <b-button
              variant="danger"
              @click="deleteOrUndeleteAdministrator(row)"
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
        { key: 'actions', tdClass: 'text-center', label: '' },
        { key: 'deleted', label: 'Is Deleted' }
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
    deleteOrUndeleteAdministrator(row) {
      this.$axios
        .$patch('/api/administrators/' + row.item.username)
        .then(() => {
          if (!this.administrators[row.index].deleted) {
            this.$toast
              .success(
                'Administrator #' + row.item.username + ' deleted successfully'
              )
              .goAway(3000)
            this.administrators[row.index].deleted = true
          } else {
            this.$toast
              .success(
                'Administrator #' + row.item.username + ' brought back to life'
              )
              .goAway(3000)
            this.administrators[row.index].deleted = false
          }
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
