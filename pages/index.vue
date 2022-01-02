<template>
  <b-container class="major">
    <b-container class="userContainer">
      <b-card-img style="border-radius: 0" src="~/assets/homePage.jpg">
      </b-card-img>
      <b-container class="userInfoContainer">
        <div class="spaceBetween">
          <h4 style="flex: 1; color: darkcyan; font-weight: bold">{{ role + ": " + username }}</h4>
          <a @click="updatePassword">
            <b-icon-key variant="info" font-scale="2"></b-icon-key>
          </a>
        </div>
        <hr/>
        <div v-if="isPatient" class="text-center">
          {{ activePRC ? ("PRC #" + activePRC.id + "  -  " + daysRemaining + " days left!") : "No active PRC" }}
        </div>

        <div v-if="isPatient && activePRC" class="progress percentExternal">
          <div id="pInternal" class="progress-bar percentInternal" role="progressbar" style="width: 100%"
               aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <b-container v-if="!isAdmin" class="headerCardUser">
          <nuxt-link to="/observations" class="headerCardComponent">
            <h6>Observations</h6>
          </nuxt-link>
          <nuxt-link v-if="isDoctor" to="/doctors" class="headerCardComponent">
            <h6>Doctors</h6>
          </nuxt-link>
          <nuxt-link v-if="isDoctor" to="/patients" class="headerCardComponent">
            <h6>Patients</h6>
          </nuxt-link>
          <nuxt-link to="/prescriptions" class="headerCardComponent">
            <h6>Prescriptions</h6>
          </nuxt-link>
          <nuxt-link v-if="isDoctor" to="/prcs" class="headerCardComponent">
            <h6>PRCs</h6>
          </nuxt-link>
        </b-container>

        <br/>
        <br/>
        <br/>
        <br/>
        <b-button class="logout" @click="logout">Logout</b-button>
      </b-container>
    </b-container>
    <b-container class="cardGroup">
      <b-container v-if="isAdmin" class="headerCard">
        <nuxt-link v-if="isAdmin" to="/administrators" class="headerCardComponent">
          <h6>Administrators</h6>
        </nuxt-link>
        <nuxt-link v-if="isAdmin" to="/biometricsType" class="headerCardComponent">
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
        <nuxt-link to="/prcs" class="headerCardComponent">
          <h6>PRCs</h6>
        </nuxt-link>
      </b-container>
      <div class="gridCustom gridMiddle">
        <b-container class="customCard">
          <nuxt-link to="observations">
            <h2>{{ observations.length }} Observation{{ observations.length === 1 ? "" : "s" }} </h2>
          </nuxt-link>
          <b-form-group v-if="!isPatient"
                        id="patientLine"
                        class="align-self-center w-50"
                        label="Choose a Patient"
          >
            <b-form-select id="patientLine" v-model="lineChartUserObs">
              <option
                v-for="patient in patients"
                :key="patient.username"
                :value="patient.username"
              >
                {{ patient.name }}
              </option>
            </b-form-select>
          </b-form-group>
          <line-chart :data="lineChartData" :options="optionsLineChart"></line-chart>
        </b-container>
      </div>
      <div class="gridCustom">
        <b-container v-if="isAdmin" class="customCard">
          <nuxt-link to="administrators">
            <h2>{{ administrators.length }} Administrator{{ administrators.length === 1 ? "" : "s" }} </h2>
          </nuxt-link>
        </b-container>
        <b-container v-if="isAdmin" class="customCard">
          <nuxt-link to="doctors">
            <h2>{{ doctors.length }} Doctor{{ doctors.length === 1 ? "" : "s" }} </h2>
          </nuxt-link>
        </b-container>
        <b-container v-if="isAdmin" class="customCard">
          <nuxt-link to="patients">
            <h2>{{ patients.length }} Patient{{ patients.length === 1 ? "" : "s" }} </h2>
          </nuxt-link>
        </b-container>
        <b-container class="customCard">
          <nuxt-link to="prescriptions">
            <h2>{{ prescriptions.length }} Prescription{{ prescriptions.length === 1 ? "" : "s" }} </h2>
          </nuxt-link>
          <pie-chart :data="barChartData" :options="options"></pie-chart>
        </b-container>
      </div>
    </b-container>
  </b-container>
</template>
<script>
import PieChart from "~/components/BarChart"
import LineChart from "~/components/LineChart"

export default {
  components: {PieChart, LineChart},
  data() {
    return {
      role: this.$auth.user.groups[0],
      username: this.$auth.user.sub,
      prescriptions: [],
      activePRC: null,
      patients: [],
      doctors: [],
      lineChartUserObs: null,
      administrators: [],
      observations: [],
      barChartData: {
        labels: ["EXPIRED", "ACTIVE", "WAITING"],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)', 'rgba(75, 255, 125, 0.2)', 'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)', 'rgb(75, 255, 125)', 'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          }]
      },
      lineChartData: {
        labels: [],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
      },
      optionsLineChart: {
        responsive: true,
        maintainAspectRatio: false,
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
    daysRemainingToPRC() {
      return this.daysRemaining + " from " + this.totalDays
    },
    percentDaysRemaining() {
      if (this.totalDays === 0)
        return 0
      const percent = this.daysRemaining * 100 / this.totalDays
      return Math.floor(100 - percent)
    },
    daysRemaining() {
      if (!this.activePRC) {
        return 0
      }
      const today = new Date()
      const dateEnd = new Date(this.activePRC.endDate)
      const timeDiff = dateEnd.getTime() - today.getTime();
      const daysLeftNow = timeDiff / (1000 * 3600 * 24);
      return Math.ceil(daysLeftNow)
    },
    totalDays() {
      if (!this.activePRC) {
        return 0
      }
      const dateEnd = new Date(this.activePRC.endDate)
      const dateStart = new Date(this.activePRC.startDate)
      const timeDiff = dateEnd.getTime() - dateStart.getTime();
      const daysLeftStart = timeDiff / (1000 * 3600 * 24);
      return Math.ceil(daysLeftStart + 1)
    },
    isAdmin() {
      return this.$auth.user.groups && this.$auth.user.groups.includes('Administrator');
    },
    isDoctor() {
      return this.$auth.user.groups && this.$auth.user.groups.includes('Doctor');
    },
    isPatient() {
      return this.$auth.user.groups && this.$auth.user.groups.includes('Patient');
    },
  },
  watch: {
    lineChartUserObs() {
      this.refreshLineChartUserObs(this.lineChartUserObs)
    }
  },
  beforeMount() {
    if (this.isAdmin) {
      // Admins
      this.$axios.get("/api/administrators").then((response) => {
        this.administrators = response.data
      })
    }

    if (!this.isPatient) {
      // Doctors
      this.$axios.get("/api/doctors").then((response) => {
        this.doctors = response.data
      })

      // Patients
      this.$axios.get("/api/patients").then((response) => {
        this.patients = response.data
      })

      // Observations
      this.$axios.get("/api/observations/").then((response) => {
        this.observations = response.data
      })
    }

    if (this.isPatient) {
      // Observations
      this.$axios.get("/api/patients/" + this.$auth.user.sub + "/observations").then((response) => {
        this.observations = response.data
        this.refreshLineChartUserObs(this.$auth.user.sub)
      })
    }

    // prescriptions chart
    if (this.$auth.user.groups.includes('Doctor')) {
      this.$axios.$get('/api/doctors/' + this.$auth.user.sub + "/prescriptions").then((prescriptions) => {
        this.prescriptions = prescriptions
        this.refreshPrescriptionsGraph()
      })
    } else if (this.$auth.user.groups.includes('Patient')) {
      this.$axios.$get('/api/patients/' + this.$auth.user.sub + "/prescriptions").then((prescriptions) => {
        this.prescriptions = prescriptions
        this.refreshPrescriptionsGraph()
      })
      this.$axios.$get('/api/patients/' + this.$auth.user.sub + "/prc").then((prc) => {
        this.activePRC = prc
      }).then(() => {
        if(!this.activePRC)
          return
        document.getElementById("pInternal").style.width = this.percentDaysRemaining + "%";
      })
    } else {
      this.$axios.$get('/api/prescriptions/').then((prescriptions) => {
        this.prescriptions = prescriptions
        this.refreshPrescriptionsGraph()
      })
    }
  },
  methods: {
    refreshLineChartUserObs(username) {
      // refresh graph for selected user (this.lineChartUserObs)
      const formatedObs = new Map()
      const bTypes = []
      this.observations.forEach((obs) => {
        if (obs.patient === username) {
          if (formatedObs.has(obs.date)) {
            const o = formatedObs.get(obs.date)
            o.set(obs.biometricTypeName, obs.quantitativeValue)
            if (!bTypes.includes(obs.biometricTypeName)) {
              bTypes.push(obs.biometricTypeName)
            }
            formatedObs.set(obs.date, o)
          } else {
            const newMap = new Map()
            newMap.set(obs.biometricTypeName, obs.quantitativeValue)
            if (!bTypes.includes(obs.biometricTypeName)) {
              bTypes.push(obs.biometricTypeName)
            }
            formatedObs.set(obs.date, newMap)
          }
        }
      })
      this.lineChartData.labels = Array.from(formatedObs.keys())
      this.lineChartData.datasets = []

      bTypes.forEach((bType) => {
        const dataForBType = []
        this.lineChartData.labels.forEach((dateAsLabel) => {
          if (formatedObs.has(dateAsLabel) && formatedObs.get(dateAsLabel).has(bType)) {
            dataForBType.push({x: dateAsLabel, y: formatedObs.get(dateAsLabel).get(bType)})
          }
        })
        this.lineChartData.datasets.push({
          label: bType,
          data: dataForBType,
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1
        })
      })
      this.lineChartData = {...this.lineChartData}
    },
    refreshPrescriptionsGraph() {
      const clone = {...this.barChartData}
      clone.datasets[0].data[0] = this.prescriptionsNumByStatus("EXPIRED");
      clone.datasets[0].data[1] = this.prescriptionsNumByStatus("ACTIVE");
      clone.datasets[0].data[2] = this.prescriptionsNumByStatus("WAITING");
      this.barChartData = clone;
    },
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

.gridMiddle {
  grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
}

.gridCustom:first-child {
  margin-top: 0;
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
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 12px;
  row-gap: 12px;
  grid-auto-rows: 1fr;
}

.headerCardUser {
  display: grid;
  padding: 0px;
  margin-top: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
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

div {
  color: #656565;
}

.percentExternal {
  border-radius: 12px;
  background-color: lightgrey;
}

.percentInternal {
  border-radius: 12px;
  background-color: darkcyan;
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
