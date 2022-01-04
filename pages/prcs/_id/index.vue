<template>
  <b-container>
    <b-container class="middleCard text-center flex-row">
      <a>
        <b-button variant="danger" @click="routeBack">BACK</b-button>
      </a>
      <h2 class="font-weight-bold">PRC #{{ prc.id }}</h2>
      <nuxt-link :to="{
                name: 'prcs-create',
                query: { id: prc.id }
              }">
        <b-button variant="info">EDIT</b-button>
      </nuxt-link>
    </b-container>
    <div class="middleCard">
      <p>Patient: {{ prc.patient }}</p>
      <p>Start Date: {{ prc.startDate }}</p>
      <p>End Date: {{ prc.endDate }}</p>
      <p>Status: {{ prc.active ? "Active" : "Not Active" }}</p>
    </div>
    <b-container class="middleCard">
      <h4>{{ prc.prescriptions.length ? "Prescriptions" : "No Prescriptions" }}</h4>
    </b-container>
    <b-container class="middleCard">
      <div v-if="prc && prc.prescriptions && prc.prescriptions.length" class="xOverflow">
        <b-table
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
      </div>
    </b-container>
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
