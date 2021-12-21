<template>
  <div>
    <b-container>
      <div class="middleCard">
        <b-table striped over :items="administrators" :fields="fields">
          <template #cell(actions)="row">
            <nuxt-link
              class="btn btn-link"
              :to="`/administrators/${row.item.username}`"
            >
              <b-button variant="info"> Details</b-button>
            </nuxt-link>
          </template>
        </b-table>
        <div class="spaceBetween">
          <nuxt-link to="/">
            <b-button variant="danger"> Back</b-button>
          </nuxt-link>
          <nuxt-link to="administrators/create" style="float: right">
            <b-button variant="success"> Create New administrator</b-button>
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
        'name',
        'birthDate',
        'email',
        'phoneNumber',
        {key: 'actions', label: ''}
      ],
      administrators: []
    }
  },
  created() {
    this.$axios.$get('/api/administrators/').then((administrators) => {
      this.administrators = administrators
    })
  }
}
</script>
<style></style>
