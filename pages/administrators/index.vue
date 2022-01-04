<template>
  <div>
    <b-container>
      <div class="middleCard">
        <div class="xOverflow">
          <b-table
            striped
            hover
            :items="coloredAdministrators"
            :fields="fields">
            <template #cell(actions)="row">
              <nuxt-link
                class="btn btn-link"
                :to="`/administrators/${row.item.username}`">
                <b-icon-file-earmark-text
                  style="color: darkcyan"
                  font-scale="2"></b-icon-file-earmark-text>
              </nuxt-link>
              <nuxt-link
                class="btn btn-link"
                :to="{
                  name: 'administrators-create',
                  query: { username: `${row.item.username}` }
                }">
                <b-icon-pencil-square
                  style="color: orange"
                  font-scale="2"></b-icon-pencil-square>
              </nuxt-link>
              <b-icon-trash
                v-if="!row.item.blocked"
                style="color: red"
                font-scale="2"
                @click="blockOrUnblockAdministrator(row)"></b-icon-trash>
              <b-icon-arrow-clockwise
                v-else
                style="color: green"
                font-scale="2"
                @click="
                  blockOrUnblockAdministrator(row)
                "></b-icon-arrow-clockwise>
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
  middleware({ redirect, store, route }) {
    if (
      store.state.auth.user.groups &&
      !store.state.auth.user.groups.includes('Administrator')
    ) {
      return redirect('/forbiden')
    }
  },
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
  computed: {
    coloredAdministrators() {
      return this.administrators.map((item) => {
        if (item.blocked) {
          item._rowVariant = 'danger'
        } else {
          item._rowVariant = null
        }
        return item
      })
    }
  },
  created() {
    this.$axios.$get('/api/administrators/').then((administrators) => {
      this.administrators = administrators
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
                'Administrator ' + row.item.username + ' blocked successfully'
              )
              .goAway(3000)
            this.administrators[row.index].blocked = true
          } else {
            this.$toast
              .success(
                'Administrator ' + row.item.username + ' unblock successfully'
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
