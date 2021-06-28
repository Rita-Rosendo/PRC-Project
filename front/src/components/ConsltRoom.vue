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

        <div v-for="(triplo,i) in dadosRoom"
            v-bind:key="i">
            <h3 v-if="triplo.p != 'type' && triplo.p == 'url'"><a class="text-link" target="_blank" :href="triplo.o">Room</a></h3>        
        </div>
        
        <table class="tableRoom">
            <tr v-for="(triplo,i) in dadosRoom"
                v-bind:key="i">
                <th v-if="triplo.p != 'type' && triplo.p !== 'url'">{{triplo.p}}</th>
                <td v-if="triplo.p != 'type' && triplo.p !== 'url'">{{triplo.o}}</td>
                <th v-if="triplo.p != 'type' && triplo.p == 'url'">{{triplo.p}}</th>
                <td v-if="triplo.p != 'type' && triplo.p == 'url'"><a class="text-link" target="_blank" :href="triplo.o">{{triplo.o}}</a></td>
            </tr>
        </table>
        <div class="end">
            <button @click="$router.go(-1)" style="background-color: #2f7aae; color: #191919 " >Go Back</button>
            <button @click="redirectToProfile()" style="background-color: #2f7aae; color: #191919 " >Go to Profile</button>
        </div>
    </div>
</template>

<script>
import UserService from '../services/user.service';

export default ({
    name: 'Room',
    props: ["idR","mensagem"],
    data() {
        return {
            dadosRoom : null,
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
        UserService.getRoom(this.idR).then(
                (response) => {
                    this.dadosRoom = response.data;
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
})
</script>
<style>
.tableRoom {
  margin-left: auto;
  margin-right: auto;
}

.tableRoom th {
    text-align: center;
    width: 100px;
}

.tableRoom tr, .tableRoom td {  
  border: 1px solid #2f7aae;
  text-align: left;
  padding: 15px;
  width: 60%;
}
</style>
