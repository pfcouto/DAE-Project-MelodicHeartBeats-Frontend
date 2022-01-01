<template>
  <b-container>
    <h4>Biometric Type Details</h4>
    <p>Code: {{ biometricType.code }}</p>
    <p>Description: {{ biometricType.name }}</p>
    <p>Max Value: {{ biometricType.valueMax }}</p>
    <p>Min Value: {{ biometricType.valueMin }}</p>
    <p>Unity: {{ biometricType.unity }}</p>
    <p>Created by: {{ biometricType.admin }}</p>

    <h4>Qualitatives</h4>
    <b-table
      v-if="qualitativeValues.length"
      striped
      hover
      :items="qualitativeValues"
      :fields="qualitativeValuesFields" />
    <p v-else>No Qualitative Values Created.</p>
    <b-button @click="routeBack">BACK</b-button>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      biometricType: {},
      qualitativeValuesFields: ['value', 'meaning']
    }
  },
  computed: {
    code() {
      return this.$route.params.code
    },
    qualitativeValues() {
      return this.biometricType.qualitatives || []
    }
  },
  created() {
    this.$axios.$get(`/api/biometricsType/${this.code}`).then((response) => {
      this.biometricType = response || {}
    })
  },
  methods: {
    routeBack() {
      this.$router.back()
    }
  }
}
</script>
