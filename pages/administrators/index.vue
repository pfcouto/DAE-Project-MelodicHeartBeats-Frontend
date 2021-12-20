<template>
  <div>
    <b-container>
      <b-table striped over :items="administrators" :fields="fields">
        <template #cell(actions)="row">
          <nuxt-link
            class="btn btn-link"
            :to="`/administrators/${row.item.username}`"
          >
            Details
          </nuxt-link>
          <!-- <nuxt-link
            class="btn btn-link"
            :to="`/administrators/${row.item.username}/send-email`"
          >
            Send Email
          </nuxt-link> -->
        </template>
      </b-table>
      <nuxt-link to="/">
        <b-button variant="danger"> Back </b-button>
      </nuxt-link>
      <nuxt-link to="administrators/create" style="float: right">
        <b-button variant="success"> Create New administrator </b-button>
      </nuxt-link>
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fields: ['username', 'name', 'birthDate', 'email', 'phoneNumber'],
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
