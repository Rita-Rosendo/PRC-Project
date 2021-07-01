<template>
<div class="container">

        <h2>
            Welcome <strong>{{ currentUser.username }}</strong>.
        </h2>
        <h6>
            Your email: <strong>{{ currentUser.email }}</strong>
        </h6>
  <table class="center">
    <thead><th>Hotel</th><th>Room</th><th>From</th><th>To</th></thead>
    <tbody><tr v-for="r in reservations"      v-bind:key="r.from">
      <td><RouterLink :to="{path: '/hotel/' + r.hotelId}">{{r.hotelName}}</RouterLink></td>
      <td>{{r.roomType}}</td>
      <td>{{r.from}}</td>
      <td>{{r.to}}</td>
      <td></td>
    </tr>
    <tr>
      <td>
        <RouterLink :to="{path: '/hoteis/'}">New Reservation</RouterLink></td>
    <td></td> <td></td> <td></td>
    </tr></tbody>


</table>
</div>
</template>

<script>
import UserService from '../services/user.service';
export default {

    name: 'Profile',
  data() {
    return {
      reservations: [],
    };
  },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    },

    methods: {
      goPageHotels: function(){
          this.$router.push('/hoteis');
      },
      goPageRooms: function(){
        this.$router.push('/rooms');
      }
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push('/');
        }
      UserService.getReservations().then(
          (response) => {
            this.reservations = response.data;
            console.log(this.reservations)
          },
          (error) => {
            this.content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },
};
</script>

<style>

.mainCont {
  padding-right:100px;
  padding-left:100px;
}
h3,h2,h3,h4,h1,h5,h6 {
  text-align: center;
}

.btn-group .button {
  margin-left: 40%;
  background-color: white;
  border: 1px solid #2f7aae;
  color: #191919;
  padding: 20px 70px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  width: 500px;
  display: block;
}

.center {
  margin-left: auto;
  margin-right: auto;
}

.btn-group .button:not(:last-child) {
  border-bottom: none; /* Prevent double borders */
}

.btn-group .button:hover {
  background-color: #2f7aae;
}
h2{
  padding-top: 50px;
  padding-bottom: 5px;
}
h6{
  padding-bottom: 45px;
}
table{
  width: 80%;
}
</style>