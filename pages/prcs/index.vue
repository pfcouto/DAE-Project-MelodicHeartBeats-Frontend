<template>
  <b-container>
    <div class="middleCard">
      <div class="xOverflow">
        <b-table hover :items="coloredPRCs" :fields="fields">
          <template #cell(patient)="row">
            <nuxt-link :to="`/patients/${row.item.patient}`">
              {{ row.item.patient }}
            </nuxt-link>
          </template>
          <template #cell(details)="row">
            <nuxt-link class="btn btn-link align-self-auto" :to="`/PRCs/${row.item.id}`">
              <b-icon-file-earmark-text style="color: darkcyan;" font-scale="2"></b-icon-file-earmark-text>
            </nuxt-link>
            <nuxt-link
              class="btn btn-link"
              :to="{
              name: 'PRCs-create',
              query: { id: `${row.item.id}` }
            }"
            >
              <b-icon-pencil-square style="color: orange;" font-scale="2"></b-icon-pencil-square>
            </nuxt-link>
            <b-icon-trash style="color: red;" font-scale="2" @click="deletePRC(row)"></b-icon-trash>
          </template>
        </b-table>
      </div>
      <div class="spaceBetween">
        <nuxt-link to="/">
          <b-button variant="danger">BACK</b-button>
        </nuxt-link>
        <nuxt-link to="PRCs/create" style="float: right">
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
      fields: ['id', {sortable: true, key: 'patient'}, {sortable: true, key: 'startDate'}, {
        sortable: true,
        key: 'endDate'
      }],
      PRCs: []
    }
  },
  computed: {
    coloredPRCs() {
      if (!this.PRCs || this.PRCs.length < 1) return []
      return this.PRCs.map(prc => {
        prc._rowVariant = prc.active ? "success" : null
        return prc
      })
    }
  },
  created() {
    if (this.$auth.user.groups[0] !== "Patient") {
      this.$axios.$get('/api/prcs/').then((PRCs) => {
        this.PRCs = PRCs
      })
    } else {
      this.$axios.$get('/api/patients/' + this.$auth.user.sub + '/prcs').then((PRCs) => {
        this.PRCs = PRCs
      })
    }
  },
  methods: {
    deletePRC(row) {
      this.$axios.$delete('/api/PRCs/' + row.item.id).then(() => {
        this.$toast.success("PRC #" + row.item.id + " deleted successfully").goAway(3000)
        this.PRCs.splice(row.index, 1)
      }).catch(() => {
        this.$toast.error("PRC #" + row.item.id + " was not deleted").goAway(3000)
      })
    },
  }
}
</script>
