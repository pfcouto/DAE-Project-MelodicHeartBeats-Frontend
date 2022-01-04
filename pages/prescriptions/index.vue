<template>
  <b-container>
    <div class="middleCard">
      <div class="xOverflow">
        <b-table hover :items="coloredPrescriptions" :fields="fields">
          <template #cell(patient)="row">
            <nuxt-link :to="`/patients/${row.item.patient}`">
              {{ row.item.patient }}
            </nuxt-link>
          </template>
          <template #cell(details)="row">
            <nuxt-link
              class="btn btn-link align-self-auto"
              :to="`/prescriptions/${row.item.id}`">
              <b-icon-file-earmark-text
                style="color: darkcyan"
                font-scale="2"></b-icon-file-earmark-text>
            </nuxt-link>
            <nuxt-link
              class="btn btn-link"
              :to="{
                name: 'prescriptions-create',
                query: { id: `${row.item.id}` }
              }">
              <b-icon-pencil-square
                style="color: orange"
                font-scale="2"></b-icon-pencil-square>
            </nuxt-link>
            <b-icon-trash
              style="color: red"
              font-scale="2"
              @click="deletePrescription(row)"></b-icon-trash>
          </template>
        </b-table>
      </div>
      <div class="spaceBetween">
        <nuxt-link to="/">
          <b-button variant="danger">BACK</b-button>
        </nuxt-link>
        <nuxt-link to="prescriptions/create" style="float: right">
          <b-button variant="success">NEW</b-button>
        </nuxt-link>
      </div>
    </div>
    <b-container
      v-if="suggestedPrescriptions && suggestedPrescriptions.length > 0"
      class="middleCard">
      <h4>Suggested Prescriptions</h4>
    </b-container>
    <b-container class="gridCustomSuggested">
      <div
        v-for="(item, idx) in suggestedPrescriptions"
        :key="idx"
        class="gridCustomSuggestedCard">
        <p>Patient: {{ item.patient }}</p>
        <p>Start Date: {{ item.startDate }}</p>
        <p>End Date: {{ item.endDate }}</p>
        <p>Prescription: {{ item.description }}</p>
        <b-button
          class="float-right"
          variant="outline-success"
          @click="createSuggestedPrescription(item, idx)"
          >CREATE
        </b-button>
      </div>
    </b-container>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      fields: [
        'id',
        { sortable: true, key: 'doctor' },
        { sortable: true, key: 'patient' },
        {
          key: 'description',
          tdClass: 'customDesc'
        },
        {
          sortable: true,
          key: 'startDate'
        },
        { sortable: true, key: 'endDate' },
        {
          key: 'details',
          tdClass: 'text-center',
          label: ''
        }
      ],
      prescriptions: [],
      suggestedPrescriptions: []
    }
  },
  computed: {
    dataAtualFormatada() {
      const data = new Date()
      const dia = data.getDate().toString()
      const diaF = dia.length === 1 ? '0' + dia : dia
      const mes = (data.getMonth() + 1).toString()
      const mesF = mes.length === 1 ? '0' + mes : mes
      const anoF = data.getFullYear()
      return anoF + '-' + mesF + '-' + diaF
    },
    coloredPrescriptions() {
      if (!this.prescriptions || this.prescriptions.length < 1) return []
      return this.prescriptions.map((prescription) => {
        prescription._rowVariant = this.getVariant(prescription)
        return prescription
      })
    }
  },
  created() {
    if (this.$auth.user.groups.includes('Doctor')) {
      this.$axios
        .$get('/api/doctors/' + this.$auth.user.sub + '/prescriptions')
        .then((prescriptions) => {
          this.prescriptions = prescriptions
        })
      this.$axios
        .$get('/api/prescriptions/suggestedPrescriptions')
        .then((response) => {
          this.suggestedPrescriptions = response
        })
    } else if (this.$auth.user.groups.includes('Patient')) {
      this.$axios
        .$get('/api/patients/' + this.$auth.user.sub + '/prescriptions')
        .then((prescriptions) => {
          this.prescriptions = prescriptions
        })
    } else {
      this.$axios.$get('/api/prescriptions/').then((prescriptions) => {
        this.prescriptions = prescriptions
      })
    }
  },
  methods: {
    getVariant(prescription) {
      const today = this.dataAtualFormatada
      if (prescription.startDate > today) {
        return 'secondary'
      } else if (prescription.endDate < today) {
        return 'danger'
      } else {
        return 'success'
      }
    },
    createSuggestedPrescription(item, idx) {
      item.doctor = this.$auth.user.sub
      this.$axios
        .$post('/api/prescriptions', item)
        .then(() => {
          this.$toast
            .success('Prescription was created successfully')
            .goAway(3000)
          this.suggestedPrescriptions.splice(idx, 1)
          this.prescriptions.push(item)
        })
        .catch(() => {
          this.$toast
            .error(
              'Prescription was not created! Maybe patient dont have an active prc'
            )
            .goAway(3000)
        })
    },
    deletePrescription(row) {
      this.$axios
        .$delete('/api/prescriptions/' + row.item.id)
        .then(() => {
          this.$toast
            .success('Prescription #' + row.item.id + ' deleted successfully')
            .goAway(3000)
          this.prescriptions.splice(row.index, 1)
        })
        .catch(() => {
          this.$toast
            .error('Prescription #' + row.item.id + ' was not deleted')
            .goAway(3000)
        })
    }
  }
}
</script>
<style></style>
