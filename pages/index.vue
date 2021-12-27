<template>
  <b-container class="major">
    <b-container class="userContainer">
      <b-card-img style="border-radius: 0" src="~/assets/homePage.jpg">
      </b-card-img>
      <b-container class="userInfoContainer">
        <div class="spaceBetween">
          <h4 style="flex: 1">{{ role + ": " + username }}</h4>
          <a @click="updatePassword">
            <b-icon-key variant="info" font-scale="2"></b-icon-key>
          </a>
        </div>
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
      <b-container class="headerCard">
        <nuxt-link to="/administrators" class="headerCardComponent">
          <h6>Administrators</h6>
        </nuxt-link>
        <nuxt-link to="/biometricsType" class="headerCardComponent">
          <h6>Biometric Types</h6>
        </nuxt-link>
        <nuxt-link to="/observations" class="headerCardComponent">
          <h6>Observations</h6>
        </nuxt-link>
        <nuxt-link to="/doctors" class="headerCardComponent">
          <h6>Doctors</h6>
        </nuxt-link>
        <nuxt-link to="/patients" class="headerCardComponent">
          <h6>Patients</h6>
        </nuxt-link>
        <nuxt-link to="/prescriptions" class="headerCardComponent">
          <h6>Prescriptions</h6>
        </nuxt-link>
      </b-container>
      <div class="gridCustom">
        <b-container v-if="isAdmin" class="customCard">
          <nuxt-link to="prescriptions">
            <h2>Total Prescriptions: {{ prescriptions.length }}</h2>
          </nuxt-link>
          <pie-chart :data="chartdata" :options="options"></pie-chart>
        </b-container>
        <b-container v-if="isAdmin" class="customCard">
          <nuxt-link to="prescriptions">
            <h2>Total Prescriptions: {{ prescriptions.length }}</h2>
          </nuxt-link>
          <pie-chart :data="chartdata" :options="options"></pie-chart>
        </b-container>
        <b-container v-if="isAdmin" class="customCard">
          <nuxt-link to="prescriptions">
            <h2>Total Prescriptions: {{ prescriptions.length }}</h2>
          </nuxt-link>
          <pie-chart :data="chartdata" :options="options"></pie-chart>
        </b-container>
        <b-container v-if="isAdmin" class="customCard">
          <nuxt-link to="prescriptions">
            <h2>Total Prescriptions: {{ prescriptions.length }}</h2>
          </nuxt-link>
          <pie-chart :data="chartdata" :options="options"></pie-chart>
        </b-container>
      </div>
    </b-container>
  </b-container>
</template>
<script>
import PieChart from "~/components/BarChart"

export default {
  components: {PieChart},
  data() {
    return {
      role: this.$auth.user.groups[0],
      username: this.$auth.user.sub,
      prescriptions: [],
      chartdata: {
        labels: ["EXPIRED", "ACTIVE", "WAITING"],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)', 'rgba(75, 200, 125, 0.2)', 'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)', 'rgb(75, 200, 125)', 'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          }]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            }
          }],
        }
      }
    }
  },
  computed: {
    isAdmin() {
      return this.$auth.user.groups[0] === 'Administrator';
    },
  },
  async beforeMount() {
    if (this.role === 'Administrator') {
      await this.$axios.get("api/prescriptions").then((response) => {
        this.prescriptions = response.data
        const clone = {...this.chartdata}
        clone.datasets[0].data[0] = this.prescriptionsNumByStatus("EXPIRED");
        clone.datasets[0].data[1] = this.prescriptionsNumByStatus("ACTIVE");
        clone.datasets[0].data[2] = this.prescriptionsNumByStatus("WAITING");
        this.chartdata = clone;
      }).catch(() => {
        // console.log(error)
      })
    }
  },
  methods: {
    prescriptionsNumByStatus(status) {
      if (!this.prescriptions || this.prescriptions.length < 1) return []
      let counter = 0
      this.prescriptions.forEach((item) => {
        if (this.getStatus(item) === status) {
          counter++
        }
      })
      return counter
    },
    getStatus(prescription) {
      const now = new Date()
      const today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
      if (prescription.startDate > today) {
        return 'WAITING'
      } else if (prescription.endDate > today) {
        return 'ACTIVE'
      } else {
        return 'EXPIRED'
      }
    },
    updatePassword() {
      this.$router.push("/password")
    },
    logout() {
      this.$auth.logout()
      this.$toast.success("Logged out successfully").goAway(3000)
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

.gridCustom {
  display: grid;
  margin-top: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 12px;
  row-gap: 12px;
  grid-auto-rows: 1fr;
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
  display: grid;
  padding: 0px;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  column-gap: 12px;
  row-gap: 12px;
  grid-auto-rows: 1fr;
}

hr {
  margin-bottom: 20px;
}

.cardGroup .customCard h2 {
  margin-bottom: 25px;
  margin-left: 0;
  margin-top: 0;
}

.headerCardComponent {
  display: flex;
  justify-content: center;
  padding: 12px !important;
  background-color: white;
  flex-direction: row;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  align-items: center;
  color: #757575;
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
  flex: 9;
}

h1,
h2,
h3,
h4,
h5,
h6 {
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
  border-width: 0px;
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
