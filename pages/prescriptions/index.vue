<template>
  <b-container>
    <div class="middleCard">
      <b-table striped over :items="prescriptions" :fields="fields">
        <template #cell(details)="row">
          <nuxt-link class="btn btn-link align-self-auto" :to="`/prescriptions/${row.item.id}`">
            <b-button variant="info">Details</b-button>
          </nuxt-link>
          <nuxt-link
            class="btn btn-link"
            :to="{
              name: 'prescriptions-create',
              query: { id: `${row.item.id}` }
            }"
          >
            <b-button variant="info">Update</b-button>
          </nuxt-link>
          <b-button variant="danger" @click="deletePrescription(row)">DELETE</b-button>
        </template>
      </b-table>
      <div class="spaceBetween">
        <nuxt-link to="/">
          <b-button variant="danger">BACK</b-button>
        </nuxt-link>
        <nuxt-link to="prescriptions/create" style="float: right">
          <b-button variant="success">CREATE NEW PRESCRIPTION</b-button>
        </nuxt-link>
      </div>
    </div>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      fields: ['id', {sortable: true, key: 'doctor'}, {sortable: true, key: 'patient'}, 'description', {
        sortable: true,
        key: 'startDate'
      }, {sortable: true, key: 'endDate'}, {
        key: 'details',
        tdClass: 'text-center',
        label: ''
      }],
      prescriptions: []
    }
  },
  created() {
    this.$axios.$get('/api/prescriptions/').then((prescriptions) => {
      this.prescriptions = prescriptions
    })
  },
  methods: {
    deletePrescription(row) {
      this.$axios.$delete('/api/prescriptions/' + row.item.id).then(() => {
        this.$toast.success("Transaction #" + row.item.id + " deleted successfully")
        this.prescriptions.splice(row.index, 1)
      }).catch(() => {
        this.$toast.danger("Transaction #" + row.item.id + " was not deleted")
      })
    },
  }
}
</script>
