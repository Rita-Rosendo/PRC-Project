<template>
  <div class="container">
    <header class="jumbotron">
        <h2>
            Welcome <strong>{{ currentUser.username }}</strong>.
        </h2>
        <h6>
            Your email: <strong>{{ currentUser.email }}</strong>
        </h6>
    </header>

    <div v-for="(triplo,i) in dados"
            v-bind:key="i">
        <h3 v-if="triplo.p != 'type' && triplo.p == 'url'"><a class="text-link" target="_blank" :href="triplo.o">Hotel</a></h3>        
    </div>


    <table class="tableH1">
            <tr v-for="(triplo,i) in dados"
                v-bind:key="i">
                <th v-if="triplo.p != 'type' && triplo.p !== 'url'">{{triplo.p}}</th>
                <td v-if="triplo.p != 'type' && triplo.p !== 'url'">{{triplo.o}}</td>
                <th v-if="triplo.p != 'type' && triplo.p == 'url'">{{triplo.p}}</th>
                <td v-if="triplo.p != 'type' && triplo.p == 'url'"><a class="text-link" target="_blank" :href="triplo.o">{{triplo.o}}</a></td>
            </tr>
    </table>
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
            dados: null,
            dadosRooms : null,
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
                    this.dados = response.data;
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