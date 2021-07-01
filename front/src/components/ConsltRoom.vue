<template>
    <div class="container">
      <form name="form" @submit.prevent="handleRegister">
      <h2>New reservation at <RouterLink :to="{path: '/hotel/' + hotel.id}">{{hotel.name}}</RouterLink></h2>
      <h4><B>{{this.dadosRoom.room_type}}</B></h4>
      <h4>{{this.dadosRoom.room_features}}</h4>
      <h6>{{this.dadosRoom.room_amenities}}</h6>
      <div class="form-group">
        <table class="center">
          <tbody>
          <tr>
            <td><label for="from">From</label>
              <input v-model="dates.from" type="date" id="from" class="form-control" name="from">
            </td>
            <td><label for="to">To</label>
              <input v-model="dates.to" type="date" id="to" class="form-control" name="to"></td>
          </tr>

          </tbody>
        </table>
        <table class="center">
          <tbody>
          <tr>
            <td>
              <div class="form-group">
                <button class="btn btn-primary btn-block" style="background-color: #9cc297; color: #505050 ">Register</button>
              </div>
            </td>
          </tr>

          </tbody>
        </table>


      </div>
      </form>
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
          hotel: null,
          dates : {}
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
        },
      handleRegister() {
        this.message = '';
        this.submitted = true;

          UserService.newReservation(this.dates.from,this.dates.to,this.dadosRoom.room,this.dadosRoom.room_type,this.hotel.id,this.hotel.name).then(
              () => {
                this.$router.push('/profile');
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
    },

    mounted() {
        if (!this.currentUser) {
            this.$router.push('/');
        }
        UserService.getRoom(this.idR).then(
                (response) => {
                    this.dadosRoom = response.data[0];
                  UserService.getHotel(this.dadosRoom.hotel.split("_")[1]).then(
                      (response) => {
                        this.hotel = response.data[0];

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
h3,h2,h3,h4,h1,h5,h6 {
  text-align: center;
}
h2{
  padding-top: 50px;
  padding-bottom: 20px;
}
h4{
  padding-bottom: 20px;
}
.tableRoom {
  margin-left: auto;
  margin-right: auto;
}
.center {
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
