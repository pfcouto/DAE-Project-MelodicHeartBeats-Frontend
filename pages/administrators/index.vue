<template>
  <div>
    <b-container>
      <div class="middleCard">
        <div class="xOverflow">
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
                @click="blockOrUnblockAdministrator(row)"
                >DELETE</b-button
              >
            </template>
          </b-table>
        </div>
        <div class="spaceBetween">
          <nuxt-link to="/">
            <b-button variant="danger">BACK</b-button>
          </nuxt-link>
          <nuxt-link to="administrators/create" style="float: right">
            <b-button variant="success">NEW</b-button>
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
        // { key: 'blocked', label: 'Is Blocked' }
      ],
      administrators: []
    }
  },
  created() {
    this.$axios.$get('/api/administrators/').then((administrators) => {
      if (this.$auth.user.groups[0] === 'Administrator') {
        this.fields.push({ key: 'blocked', label: 'Is Blocked' })
        this.administrators = administrators
      }
    })
  },
  methods: {
    blockOrUnblockAdministrator(row) {
      this.$axios
        .$patch('/api/administrators/' + row.item.username)
        .then(() => {
          if (!this.administrators[row.index].blocked) {
            this.$toast
              .success(
                'Administrator #' + row.item.username + ' blocked successfully'
              )
              .goAway(3000)
            this.administrators[row.index].blocked = true
          } else {
            this.$toast
              .success(
                'Administrator #' + row.item.username + ' unblock successfully'
              )
              .goAway(3000)
            this.administrators[row.index].blocked = false
          }
        })
        .catch(() => {
          this.$toast
            .error('Administrator #' + row.item.username + ' was not blocked')
            .goAway(3000)
        })
    }
  }
}
</script>
<style></style>
