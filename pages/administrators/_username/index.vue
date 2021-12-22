<template>
  <b-container>
    <h4>Administrator Details</h4>
    <p>Username: {{ patient.username }}</p>
    <p>Name: {{ patient.name }}</p>
    <p>BirthDate: {{ patient.birthDate }}</p>
    <p>Email: {{ patient.email }}</p>
    <p>PhoneNumber: {{ patient.phoneNumber }}</p>

    <!-- <h4>BiometricTypes</h4>
    <b-table
      v-if="biometricTypes.length"
      striped
      over
      :items="biometricTypes"
      :fields="biometricTypeFields"
    />
    <p v-else>No Biometric Types passed.</p> -->

    <!-- <h4>Documents</h4>
    <b-table
      v-if="documents.length"
      striped
      over
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
    <nuxt-link to="/administrators">Back</nuxt-link>
    <!-- &nbsp;
    <nuxt-link :to="`/patients/${username}/send-email`">Send e-mail</nuxt-link>
    &nbsp;
    <nuxt-link :to="`/patients/upload`">Upload</nuxt-link> -->
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      administrator: {}
      //   biometricTypeFields: [
      //     //
      //   ]
      //   documentsFields: ['filename', 'actions']
    }
  },
  computed: {
    username() {
      return this.$route.params.username
    }
    // biometricTypes() {
    //   return this.patient.biometricTypeDTOS || []
    // }
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
    // download(fileToDownload) {
    //   const documentId = fileToDownload.id
    //   this.$axios
    //     .$get('/api/documents/download/' + documentId, {
    //       responseType: 'arraybuffer'
    //     })
    //     .then((file) => {
    //       const url = window.URL.createObjectURL(new Blob([file]))
    //       const link = document.createElement('a')
    //       link.href = url
    //       link.setAttribute('download', fileToDownload.filename)
    //       document.body.appendChild(link)
    //       link.click()
    //     })
    // }
  }
}
</script>
