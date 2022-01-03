<template>
  <b-container>
    <div class="middleCard">
      <h1>PRC #{{ prc.id }}</h1>
      <p>Patient: {{ prc.patient }}</p>
      <p>Start Date: {{ prc.startDate }}</p>
      <p>End Date: {{ prc.endDate }}</p>
      <p>Status: {{ prc.active ? "Active" : "Not Active" }}</p>
      <div class="xOverflow">
        <b-table
          v-if="prc && prc.prescriptions && prc.prescriptions.length>0"
          striped
          hover
          :items="prc.prescriptions"
          :fields="prescriptionsFields"
          @row-clicked="item => rowClicked(item)"
        >
          <template #cell(details)="row">
            <nuxt-link class="btn btn-link align-self-auto" :to="`/prescriptions/${row.item.id}`">
              <b-icon-file-earmark-text style="color: darkcyan;" font-scale="2"></b-icon-file-earmark-text>
            </nuxt-link>
          </template>
        </b-table>
        <p v-else>No prescriptions yet.</p>
      </div>

      <b-button variant="danger" @click="routeBack">BACK</b-button>
    </div>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      prc: {},
      prescriptionsFields: [
        'id',
        'doctor',
        'patient',
        'description',
        'startDate',
        'endDate',
        {
          key: 'details',
          tdClass: 'text-center',
          label: ''
        }
      ],
      prescriptions: null
    }
  },

  async created() {
    await this.$route
    this.$axios.$get(`/api/prcs/${this.$route.params.id}/withPrescriptions`).then((response) => {
      this.prc = response
    })
  },
  methods: {
    rowClicked(row) {
      this.$router.push('/prescriptions/' + row.id)
    },
    routeBack() {
      this.$router.back();
    }
  },
}
</script>
