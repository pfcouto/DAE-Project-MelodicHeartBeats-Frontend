<template style="">
  <b-container style="padding: 12px !important; display: flex; flex-direction: row">
    <b-container class="userInfoContainer">
      <b-card-img src="~/assets/homePage.jpg">
      </b-card-img>
      <h4 style="padding:15px">Americo Sousa</h4>
    </b-container>
    <b-container style="padding: 0; margin-left: 6px; flex: 9">
      <b-container
        class="card" style="margin-top: 0">
        <h1 style="margin-bottom: 50px">Welcome to Academics Management</h1>
        <nuxt-link to="/administrators" class="btn btn-link">
          <b-button variant="primary"> Administrators</b-button>
        </nuxt-link>
        <nuxt-link to="/doctors" class="btn btn-link">
          <b-button variant="success"> Doctors</b-button>
        </nuxt-link>
        <nuxt-link to="/patients" class="btn btn-link">
          <b-button variant="danger"> Patients</b-button>
        </nuxt-link>
        <nuxt-link to="/prescriptions" class="btn btn-link">
          <b-button variant="warning"> Prescriptions</b-button>
        </nuxt-link>
      </b-container>
      <b-container
        class="card">
        <h1 style="margin-bottom: 50px">Welcome to Academics Management</h1>
        <nuxt-link to="/administrators" class="btn btn-link">
          <b-button variant="primary"> Administrators</b-button>
        </nuxt-link>
        <nuxt-link to="/doctors" class="btn btn-link">
          <b-button variant="success"> Doctors</b-button>
        </nuxt-link>
        <nuxt-link to="/patients" class="btn btn-link">
          <b-button variant="danger"> Patients</b-button>
        </nuxt-link>
        <nuxt-link to="/prescriptions" class="btn btn-link">
          <b-button variant="warning"> Prescriptions</b-button>
        </nuxt-link>
      </b-container>
    </b-container>
  </b-container>
</template>
<style>
.userInfoContainer {
  margin-right: 6px;
  display: flex;
  flex: 4;
  flex-direction: column;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 4px 14px 0 rgba(0, 0, 0, 0.2);
  align-items: flex-start;
}

.card {
  display: flex;
  margin-top: 14px;
  flex-direction: column;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 4px 14px 0 rgba(0, 0, 0, 0.2);
  justify-content: center
}
</style>
