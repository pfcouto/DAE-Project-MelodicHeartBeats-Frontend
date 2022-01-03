<template>
  <div>
    <b-container>
      <div class="middleCard">
        <div class="xOverflow">
          <b-table striped hover :items="coloredDoctors" :fields="fields">
            <template #cell(actions)="row">
              <nuxt-link
                class="btn btn-link"
                :to="`/doctors/${row.item.username}`"
              >
                <b-icon-file-earmark-text style="color: darkcyan;" font-scale="2"></b-icon-file-earmark-text>
              </nuxt-link>
              <nuxt-link
                class="btn btn-link"
                :to="{
                  name: 'doctors-create',
                  query: { username: `${row.item.username}` }
                }"
              >
                <b-icon-pencil-square v-if="!row.item.blocked" style="color: orange;" font-scale="2"></b-icon-pencil-square>
              </nuxt-link>
              <b-icon-trash v-if="isAdministrator && !row.item.blocked" style="color: red;" font-scale="2" @click="blockOrUnblockDoctor(row)"></b-icon-trash>
              <b-icon-arrow-clockwise v-if="isAdministrator && row.item.blocked" style="color: green;" font-scale="2" @click="blockOrUnblockDoctor(row)"></b-icon-arrow-clockwise>
            </template>
          </b-table>
        </div>
        <div class="spaceBetween">
          <nuxt-link to="/">
            <b-button variant="danger">BACK</b-button>
          </nuxt-link>
          <nuxt-link to="doctors/create" style="float: right">
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
        'office',
        { key: 'actions', tdClass: 'text-center', label: '' }
      ],
      doctors: []
    }
  },
  computed: {
    isDoctor() {
      return this.$auth.user.groups.includes('Doctor')
    },
    isAdministrator() {
      return this.$auth.user.groups.includes('Administrator')
    },
    coloredDoctors() {
      if (!this.isAdministrator) {
        return this.doctors
      }
      return this.doctors.map((item) => {
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
    this.$axios.$get('/api/doctors/').then((doctors) => {
      this.doctors = doctors
    })
  },
  methods: {
    blockOrUnblockDoctor(row) {
      this.$axios
        .$patch('/api/doctors/' + row.item.username)
        .then(() => {
          if (!this.doctors[row.index].blocked) {
            this.$toast
              .success('Doctor ' + row.item.username + ' blocked successfully')
              .goAway(3000)
            this.doctors[row.index].blocked = true
          } else {
            this.$toast.success('Doctor ' + row.item.username + ' unblock successfully').goAway(3000)
            this.doctors[row.index].blocked = false
          }
        })
        .catch(() => {
          this.$toast
            .error('Doctor #' + row.item.username + ' was not blocked')
            .goAway(3000)
        })
    }
  }
}
</script>
<style></style>
