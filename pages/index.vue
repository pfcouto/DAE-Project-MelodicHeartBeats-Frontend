<template>
  <b-container>
    <h1 style="margin-bottom: 50px">Welcome to Academics Management</h1>
    <nuxt-link to="/administrators" class="btn btn-link">
      <b-button variant="primary"> Administrators </b-button>
    </nuxt-link>
    <nuxt-link to="/doctors" class="btn btn-link">
      <b-button variant="success"> Doctors </b-button>
    </nuxt-link>
    <nuxt-link to="/patients" class="btn btn-link">
      <b-button variant="danger"> Patients </b-button>
    </nuxt-link>
    <!-- <script src="https://unpkg.com/vee-validate@next"></script> -->
  </b-container>
</template>
