<template>
  <b-container>
    <h4>Doctor Details</h4>
    <p>Username: {{ doctor.username }}</p>
    <p>Name: {{ doctor.name }}</p>
    <p>BirthDate {{ doctor.birthDate }}</p>
    <p>Email: {{ doctor.email }}</p>
    <p>Phone Number: {{ doctor.phoneNumber }}</p>
    <p>Office: {{ doctor.office }}</p>
    <h4>Prescriptions</h4>
    <div class="xOverflow">
      <b-table
        v-if="prescriptions.length"
        striped
        hover
        :items="prescriptions"
        :fields="prescriptionsFields"
      />
      <p v-else>No prescriptions passed.</p>
    </div>
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
    <nuxt-link to="/doctors">BACK</nuxt-link>
    &nbsp;
    <!-- <nuxt-link :to="`/doctors/${username}/send-email`">Send e-mail</nuxt-link>
    &nbsp;
    <nuxt-link :to="`/doctors/upload`">Upload</nuxt-link> -->
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      doctor: {},
      prescriptionsFields: [
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
      return this.doctor.prescriptionDTOS || []
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
