<template>
  <b-container>
    <div class="middleCard">
      <h1>Prescription #{{ prescription.id }}</h1>
      <p>Doctor: {{ prescription.doctor }}</p>
      <p>Patient {{ prescription.patient }}</p>
      <p>Description: {{ prescription.description }}</p>
      <p>Start Date: {{ prescription.startDate }}</p>
      <p>End Date: {{ prescription.endDate }}</p>

      <div class="spaceBetween">
        <b-button variant="danger" @click="routeBack">BACK</b-button>
        <nuxt-link :to="{
                name: 'prescriptions-create',
                query: { id: prescription.id }
              }">
          <b-button variant="info">EDIT</b-button>
        </nuxt-link>
      </div>
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
  methods: {
    routeBack() {
      this.$router.back();
    }
  },
}
</script>
