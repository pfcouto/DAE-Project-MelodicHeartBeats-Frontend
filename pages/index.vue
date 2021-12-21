<template>
  <b-container class="major">
    <b-container class="userInfoContainer">
      <b-card-img style="border-radius: 0" src="~/assets/homePage.jpg">
      </b-card-img>
      <h4 style="padding:15px">Americo Sousa</h4>
    </b-container>
    <b-container class="cardGroup">
      <b-container
        class="headerCard">
        <nuxt-link to="/administrators" class="headerCardComponent">
          <h6> Administrators</h6>
        </nuxt-link>
        <nuxt-link to="/doctors" class="headerCardComponent">
          <h6> Doctors</h6>
        </nuxt-link>
        <nuxt-link to="/patients" class="headerCardComponent">
          <h6> Patients</h6>
        </nuxt-link>
        <nuxt-link to="/prescriptions" class="headerCardComponent">
          <h6> Prescriptions</h6>
        </nuxt-link>
      </b-container>
      <b-container
        class="customCard">
        <h2 style="margin-bottom: 50px">Welcome to Academics Management</h2>
      </b-container>
    </b-container>
  </b-container>
</template>
<style>
.major {
  padding: 12px !important;
  display: flex;
  flex-direction: row;
}

.userInfoContainer {
  padding: 0 !important;
  margin-right: 6px;
  display: flex;
  flex: 4;
  flex-direction: column;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  align-items: flex-start;
  background-color: white;
}

.headerCard {
  display: flex;
  flex-direction: row;
  padding: 0px;
}

.headerCardComponent:last-child {
  margin-right: auto;
}

.headerCardComponent {
  margin-right: 12px;
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 10px;
  background-color: cyan;
  flex-direction: row;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  align-items: center;
  color: #757575 !important;
  flex-shrink: inherit;
  box-sizing: content-box;
  filter: grayscale(90%);
}

.headerCardComponent:hover {
  text-decoration: none;
  filter: none;
}

.customCard {
  padding: 20px;
  display: flex;
  margin-top: 12px;
  flex-direction: column;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  justify-content: center;
  background-color: white;
  color: #757575 !important;
}

.cardGroup {
  padding: 0;
  margin-left: 6px;
  flex: 9
}

h1, h2, h3, h4, h5, h6 {
  margin: auto;
}

@media (max-width: 576px) {
  .userInfoContainer {
    margin-right: auto;
    margin-bottom: 12px;
  }

  .cardGroup {
    margin-left: auto;
  }
}
</style>
