<template>
  <b-container>
    <b-container class="middleCard text-center flex-row">
      <a>
        <b-button variant="danger" @click="routeBack">BACK</b-button>
      </a>
      <h2 class="font-weight-bold">Rule #{{ rule.id }}</h2>
      <nuxt-link :to="{
                name: 'rules-create',
                query: { id: rule.id }
              }">
        <b-button variant="info">EDIT</b-button>
      </nuxt-link>
    </b-container>
    <div class="middleCard">
      <p>Biometric Type: {{ rule.biometricTypeName }}</p>
      <p>When: {{ "value " + rule.exp + " " + rule.value }}</p>
      <p>Days: {{ rule.days }}</p>
      <p>Description: {{ rule.description }}</p>
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
      rule: {},
    }
  },
  async created() {
    await this.$route
    this.$axios.$get(`/api/rules/${this.$route.params.id}`).then((response) => {
      this.rule = response
    })
  },
  methods: {
    routeBack() {
      this.$router.back();
    }
  },
}
</script>
