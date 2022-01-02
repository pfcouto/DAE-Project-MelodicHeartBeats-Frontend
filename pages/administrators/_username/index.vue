<template>
  <b-container>
    <h4>Administrator Details</h4>
    <p>Username: {{ administrator.username }}</p>
    <p>Name: {{ administrator.name }}</p>
    <p>BirthDate: {{ administrator.birthDate }}</p>
    <p>Email: {{ administrator.email }}</p>
    <p>PhoneNumber: {{ administrator.phoneNumber }}</p>

    <h4>BiometricTypes</h4>
    <b-table
      v-if="biometricTypes.length"
      striped
      hover
      :items="biometricTypes"
      :fields="biometricTypeFields"
    />
    <p v-else>No Biometric Types Created.</p>

    <!-- <h4>Documents</h4>
    <b-table
      v-if="documents.length"
      striped
      hover
      :items="documents"
      :fields="documentsFields"
    >
      <template #cell(actions)="row">
        <b-btn
          class="btn btn-link"
          target="_blank"
          @click.prevent="download(row.item)"
          >Download</b-btn
        >
      </template>
    </b-table>
    <p v-else>No documents.</p> -->
    <b-button variant="info" @click="routeBack">RETURN</b-button>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      administrator: {},
      biometricTypeFields: [
        'code',
        'name',
        'description',
        'valueMax',
        'valueMin',
        'unity',
        'admin',
        'delete'
      ]
      //   documentsFields: ['filename', 'actions']
    }
  },
  computed: {
    username() {
      return this.$route.params.username
    },
    biometricTypes() {
      return this.administrator.biometricsTypeDTOS || []
    }
    // documents() {
    //   return this.student.documents || []
    // }
  },
  created() {
    this.$axios
      .$get(`/api/administrators/${this.username}`)
      .then((administrator) => {
        this.administrator = administrator || {}
      })
  },
  methods: {
    routeBack() {
      this.$router.back();
    }
  }
}
</script>
