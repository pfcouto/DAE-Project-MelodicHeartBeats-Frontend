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
        </template>
      </b-table>
      <div class="spaceBetween">
        <nuxt-link to="/">
          <b-button variant="danger"> Back</b-button>
        </nuxt-link>
        <nuxt-link to="prescriptions/create" style="float: right">
          <b-button variant="success"> Create New Prescription</b-button>
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
    delete(id) {
      console.log("Here:" + id)
      this.$axios.$delete('/api/prescriptions/' + id).then((response) => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
