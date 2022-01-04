<template>
  <b-container>
    <b-container class="middleCard text-center flex-row">
      <h2 class="font-weight-bold">Observations</h2>
    </b-container>
    <div class="middleCard">
      <div class="xOverflow">
        <b-table striped hover :items="observations" :fields="fields">
          <template #cell(biometricTypeName)="row">
            <nuxt-link :to="`/biometricsType/${row.item.biometricType}`">
              {{ row.item.biometricTypeName }}
            </nuxt-link>
          </template>
          <template #cell(patient)="row">
            <nuxt-link :to="`/patients/${row.item.patient}`">
              {{ row.item.patient }}
            </nuxt-link>
          </template>
          <template #cell(doctor)="row">
            {{
              row.item.doctor === 'null' ? row.item.patient : row.item.doctor
            }}
          </template>

          <template #cell(details)="row">
            <nuxt-link
              v-if="row.item.doctor === 'null' || !isPatient"
              class="btn btn-link"
              :to="{
                name: 'observations-create',
                query: { code: `${row.item.code}` }
              }">
              <b-icon-pencil-square
                v-if="!isAdmin"
                style="color: orange"
                font-scale="2"></b-icon-pencil-square>
            </nuxt-link>
          </template>
        </b-table>
      </div>
      <div class="spaceBetween">
        <b-button variant="danger" @click="routeBack">BACK</b-button>
        <nuxt-link
          v-if="!isAdmin"
          to="observations/create"
          style="float: right">
          <b-button variant="success">NEW</b-button>
        </nuxt-link>
      </div>
    </div>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      fields: [
        'code',
        { sortable: true, key: 'date' },
        'patient',
        'biometricTypeName',
        { sortable: true, key: 'quantitativeValue' },
        'qualitativeValue',
        'what',
        'local',
        {
          key: 'doctor',
          label: 'Created by'
        },
        {
          key: 'details',
          label: '',
          tdClass: 'text-center'
        }
      ],
      observations: []
    }
  },
  computed: {
    isAdmin() {
      return this.$auth.user.groups.includes('Administrator')
    },
    isPatient() {
      return (
        this.$auth.user.groups && this.$auth.user.groups.includes('Patient')
      )
    }
  },
  created() {
    this.fetchBiometricTypes()
  },
  methods: {
    routeBack() {
      this.$router.back()
    },
    deleteBioType(code) {
      this.$axios
        .$delete('/api/biometricsType/' + code)
        .then(() => {
          this.fetchBiometricTypes()
        })
        .catch((error) => {
          this.errorMsg = error.response.data.split(':')[1]
        })
    },
    fetchBiometricTypes() {
      this.$axios
        .$get(
          '/api/' +
            (this.$auth.user.groups.includes('Patient')
              ? 'patients/' + this.$auth.user.sub + '/observations'
              : 'observations/')
        )
        .then((response) => {
          this.observations = response
        })
    }
  }
}
</script>
