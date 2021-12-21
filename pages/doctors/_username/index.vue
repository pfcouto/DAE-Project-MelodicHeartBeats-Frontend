<template>
  <b-container>
    <h4>Doctor Details</h4>
    <p>Username: {{ doctor.username }}</p>
    <p>Name: {{ doctor.name }}</p>
    <p>BirthDate {{ doctor.birthDate }}</p>
    <p>Email: {{ doctor.email }}</p>
    <p>Phone Number: {{ doctor.courseName }}</p>
    <p>Office: {{ doctor.courseName }}</p>
    <h4>Prescriptions</h4>
    <b-table
      v-if="prescriptions.length"
      striped
      over
      :items="prescriptions"
      :fields="prescriptionsFields"
    />
    <p v-else>No prescriptions passed.</p>
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
    <nuxt-link to="/doctors">Back</nuxt-link>
    &nbsp;
    <!-- <nuxt-link :to="`/doctors/${username}/send-email`">Send e-mail</nuxt-link> -->
    &nbsp;
    <nuxt-link :to="`/doctors/upload`">Upload</nuxt-link>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      doctor: {},
      prescriptionFields: [
        'id',
        'doctor',
        'patient',
        'description',
        'startDate',
        'endDate'
      ]
      //   documentsFields: ['filename', 'actions']
    }
  },
  computed: {
    username() {
      return this.$route.params.username
    },
    prescriptions() {
      return this.doctor.prescriptions || []
    }
    // documents() {
    //   return this.doctor.documents || []
    // }
  },
  created() {
    this.$axios.$get(`/api/doctors/${this.username}`).then((doctor) => {
      this.doctor = doctor || {}
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
