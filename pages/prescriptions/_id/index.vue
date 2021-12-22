<template>
  <b-container>
    <div class="middleCard">
      <h1>Prescription #{{ prescription.id }}</h1>
      <p>Doctor: {{ prescription.doctor }}</p>
      <p>Patient {{ prescription.patient }}</p>
      <p>Description: {{ prescription.description }}</p>
      <p>Start Date: {{ prescription.startDate }}</p>
      <p>End Date: {{ prescription.endDate }}</p>

      <nuxt-link to="/prescriptions">
        <b-button variant="info">RETURN</b-button>
      </nuxt-link>
    </div>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      prescription: {},
    }
  },
  async created() {
    await this.$route
    this.$axios.$get(`/api/prescriptions/${this.$route.params.id}`).then((response) => {
      this.prescription = response
    })
  },
}
</script>
