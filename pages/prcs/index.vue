<template>
  <b-container>
    <b-container class="middleCard text-center flex-row">
      <a class="float-left" @click="routeBack">
        <b-button variant="danger">BACK</b-button>
      </a>
      <h2 class="font-weight-bold">PRCs</h2>
      <nuxt-link v-if="isDoctor" to="prcs/create" class="float-right">
        <b-button variant="success">NEW</b-button>
      </nuxt-link>
    </b-container>
    <div class="middleCard">
      <div class="xOverflow">
        <b-table hover :items="coloredPRCs" :fields="fields">
          <template #cell(details)="row">
            <nuxt-link class="btn btn-link align-self-auto" :to="`/prcs/${row.item.id}`">
              <b-icon-file-earmark-text style="color: darkcyan;" font-scale="2"></b-icon-file-earmark-text>
            </nuxt-link>
            <nuxt-link
              class="btn btn-link"
              :to="{
              name: 'prcs-create',
              query: { id: `${row.item.id}` }
            }"
            >
              <b-icon-pencil-square v-if="isDoctor" style="color: orange;" font-scale="2"></b-icon-pencil-square>
            </nuxt-link>
            <b-icon-shield-lock v-if="isDoctor && row.item.active" style="color: red;" font-scale="2"
                                @click="toggleActive(row)"></b-icon-shield-lock>
            <b-icon-key v-if="isDoctor && !row.item.active" style="color: green;" font-scale="2"
                        @click="toggleActive(row)"></b-icon-key>
          </template>
        </b-table>
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
      },
        {
          key: 'details',
          tdClass: 'text-center',
          label: ''
        }],
      PRCs: []
    }
  },
  computed: {
    isAdmin() {
      return this.$auth.user.groups && this.$auth.user.groups.includes('Administrator');
    },
    isDoctor() {
      return this.$auth.user.groups && this.$auth.user.groups.includes('Doctor');
    },
    isPatient() {
      return this.$auth.user.groups.includes("Patient")
    },
    coloredPRCs() {
      if (!this.PRCs || this.PRCs.length < 1) return []
      return this.PRCs.map(prc => {
        prc._rowVariant = prc.active ? "success" : null
        return prc
      })
    }
  },
  created() {
    if (!this.$auth.user.groups.includes("Patient")) {
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
    routeBack() {
      this.$router.back()
    },
    toggleActive(row) {
      this.$axios.$patch('/api/prcs/' + row.item.id + '/active', {active: !row.item.active}).then(() => {
        this.$toast.success("PRC #" + row.item.id + " updated successfully").goAway(3000)
        this.PRCs[row.index].active = !row.item.active
      }).catch(() => {
        this.$toast.error("PRC #" + row.item.id + " was not updated").goAway(3000)
      })
    },
  }
}
</script>
