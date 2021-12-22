<template>
  <b-container class="major">
    <b-container class="userContainer">
      <b-card-img style="border-radius: 0" src="~/assets/homePage.jpg">
      </b-card-img>
      <b-container class="userInfoContainer">
        <h4>{{ username }}</h4>
        <hr/>
        <div class="percentExternal">
          <div class="percentInternal" style="width:75%;">75%</div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <b-button class="logout" @click="logout">Logout</b-button>
      </b-container>
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
<script>
export default {
  data() {
    return {
      username: null
    }
  },
  mounted() {
    this.$axios.$get("/api/auth/user").then((response) => {
        if (response){
          this.username = response.sub
        }else{
          this.$toast.info("Please login first")
          this.$router.push('/login')
        }
      }
    ).catch(() => {
      this.$toast.info("Please login first")
      this.$router.push('/login')
    })
  },
  methods: {
    logout() {
      delete this.$axios.defaults.headers.common.Authorization;
      this.$toast.success("User logged out successfully")
      this.$router.push('/login')
    }
  }
}
</script>
<style>
.major {
  padding: 12px !important;
  display: flex;
  flex-direction: row;
}

.userContainer {
  padding: 0 !important;
  margin-right: 6px;
  display: flex;
  flex: 4;
  flex-direction: column;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  align-items: flex-start;
  background-color: white;
}

.userInfoContainer {
  padding: 10px;
}

.headerCard {
  display: flex;
  flex-direction: row;
  padding: 0px;
  flex-wrap: wrap;
}

.headerCardComponent:last-child {
  margin-right: auto;
}

hr {
  margin-bottom: 20px;
}

.headerCardComponent {
  margin-right: 12px;
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 12px !important;
  background-color: white;
  flex-direction: row;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  align-items: center;
  color: #757575;
  flex-shrink: inherit;
  box-sizing: content-box;
}

.headerCardComponent:hover {
  text-decoration: none;
  background-color: lightcyan;
  color: darkcyan;
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

.percentExternal {
  border-radius: 16px;
  background-color: lightgrey;
  width: 100%;
  height: 18px;
}

.percentInternal {
  border-radius: 16px;
  background-color: lightcyan;
  border-width: 1px;
  border-style: solid;
  border-color: darkcyan;
  text-align: center;
  justify-content: center;
  display: flex;
  align-content: center;
  align-items: center;
  font-size: 12px;
  color: darkcyan;
  height: 100%;
}

.cardGroup {
  padding: 0;
  margin-left: 6px;
  flex: 9
}

h1, h2, h3, h4, h5, h6 {
  margin: auto;
}

.logout {
  border-radius: 4px;
  background-color: lightcyan;
  width: 40%;
  margin: auto;
  height: 28px;
  border-width: 1px;
  border-style: solid;
  border-color: darkcyan;
  color: darkcyan;
  font-weight: bold;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14px;
}

.logout:hover {
  background-color: lightcoral;
  color: cyan;
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
