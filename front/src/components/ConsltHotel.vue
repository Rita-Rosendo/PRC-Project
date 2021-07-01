<template>
  <div class="container">

    <h3> <a class="text-link" target="_blank" :href="this.hotel.url">{{hotel.name}}</a></h3>
    <h4>{{this.hotel.property_type}} {{this.starsStr}}</h4>
    <h4><a class="text-link" target="_blank" :href="this.mapsUrl">{{hotel.address}}  {{hotel.city}} {{hotel.country}}</a> </h4>

    <div v-if="dadosRooms != ''"> 
        <h4 style="color: darkblue">Rooms of {{idH}}</h4>
        <div class="boxH">
            <div class="btn-group">
                <table>
                        <tr v-for="(triplo,i) in dadosRooms"
                            v-bind:key="i">
                            <button @click="goRoomID(triplo.room.split('_')[1])" class="button" >{{triplo.room}}</button>
                        </tr>
                </table>
            </div>
        </div>
    </div>
    <div class="end">
      <button @click="$router.go(-1)" style="background-color: #2f7aae; color: #191919 " >Go Back</button>
      <button @click="redirectToProfile()" style="background-color: #2f7aae; color: #191919 " >Go to Profile</button>
    </div>
  </div> 
</template>

<script>
import UserService from '../services/user.service';
export default {
    name: 'Hotel',

    props: ["idH", "mensagem"],

    data() {
      return {
            hotel: {},
            mapsUrl: "https://www.google.com/maps/search/?api=1&query=",
            starsStr :"",
            dadosRooms : null
        };
    },

    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    },

    methods: {
        goRoomID(id){
            this.$router.push('/room/' + id);
        },
        redirectToProfile(){
            this.$router.push('/profile');
        }
    },

    mounted() {
        if (!this.currentUser) {
            this.$router.push('/');
        }
        UserService.getHotel(this.idH).then(
                (response) => {
                    this.hotel = response.data[0];
                    this.starsStr = "*".repeat(this.hotel.star_rating)
                    this.mapsUrl += (this.hotel.name+this.hotel.address+ this.hotel.city+ this.hotel.country).replace(" ", "+")
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

        UserService.getRoomsFromHotel(this.idH).then(
            (response) => {
                this.dadosRooms = response.data;
                console.log(this.dadosRooms)
            },
            (error) => {
                this.content = 
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            }
        )
    },
}
</script>

<style>
h3 {
    margin-bottom: 5%;
    text-align: center;
}

h4 {
    text-align: center;
    margin-top: 5%;
}

.tableH1 {
  margin-left: auto;
  margin-right: auto;
}

.tableH1 th {
    text-align: center;
    width: 100px;
}

.tableH1 tr, .tableH1 td {  
  border: 1px solid #2f7aae;
  text-align: left;
  padding: 15px;
  width: 60%;
}

.end {
  position: fixed;
  bottom: -4px;
  right: 10px;
  padding: 40px 70px;
  font-size: 20px;
}

.boxH {
  margin-top: 5%;
}

.btn-group .button:not(:last-child) {
  border-bottom: 1px solid #2f7aae;
}

.btn-group .button:hover {
  background-color: 1px solid #2f7aae;
} 

</style>