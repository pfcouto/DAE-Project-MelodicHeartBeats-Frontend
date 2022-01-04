<template>
  <b-container>
    <div class="middleCard">
      <div class="xOverflow">
        <b-table hover :items="rules" :fields="fields">
          <template #cell(patient)="row">
            <nuxt-link :to="`/patients/${row.item.patient}`">
              {{ row.item.patient }}
            </nuxt-link>
          </template>
          <template #cell(details)="row">
            <nuxt-link class="btn btn-link align-self-auto" :to="`/rules/${row.item.id}`">
              <b-icon-file-earmark-text style="color: darkcyan;" font-scale="2"></b-icon-file-earmark-text>
            </nuxt-link>
            <nuxt-link
              class="btn btn-link"
              :to="{
              name: 'rules-create',
              query: { id: `${row.item.id}` }
            }"
            >
              <b-icon-pencil-square style="color: orange;" font-scale="2"></b-icon-pencil-square>
            </nuxt-link>
            <b-icon-trash style="color: red;" font-scale="2" @click="deleteRule(row)"></b-icon-trash>
          </template>
        </b-table>
      </div>
      <div class="spaceBetween">
        <nuxt-link to="/">
          <b-button variant="danger">BACK</b-button>
        </nuxt-link>
        <nuxt-link to="rules/create" style="float: right">
          <b-button variant="success">NEW</b-button>
        </nuxt-link>
      </div>
    </div>
  </b-container>
</template>
<script>
export default {
  middleware({redirect, store}) {
    if (
      !store.state.auth.user.groups ||
      store.state.auth.user.groups.includes('Patient')
    ) {
      return redirect('/forbiden')
    }
  },
  data() {
    return {
      fields: ['id', 'biometricTypeName', 'exp', 'value', 'days', {
        key: 'details',
        tdClass: 'text-center',
        label: ''
      }],
      rules: []
    }
  },
  computed: {
    dataAtualFormatada() {
      const data = new Date();
      const dia = data.getDate().toString();
      const diaF = (dia.length === 1) ? '0' + dia : dia;
      const mes = (data.getMonth() + 1).toString();
      const mesF = (mes.length === 1) ? '0' + mes : mes;
      const anoF = data.getFullYear();
      return anoF + "-" + mesF + "-" + diaF;
    },
  },
  created() {
    this.$axios.$get('/api/rules/').then((rules) => {
      this.rules = rules
    })
  },
  methods: {
    deleteRule(row) {
      this.$axios.$delete('/api/rules/' + row.item.id).then(() => {
        this.$toast.success("Rule #" + row.item.id + " deleted successfully").goAway(3000)
        this.rules.splice(row.index, 1)
      }).catch(() => {
        this.$toast.error("Rule #" + row.item.id + " was not deleted").goAway(3000)
      })
    },
  }
}
</script>
