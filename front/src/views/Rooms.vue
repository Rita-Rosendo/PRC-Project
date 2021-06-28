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
    <h2><strong>Rooms</strong></h2>

    <table class="tableR">
        <thead>
            <tr>
                <th>Id</th>
                <th>Room Type</th>
                <th>Room Amenities</th>
                <th>Room Features</th>
                <th>Belongs to Hotel</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td></td>
            <td><input
                type="text"
                class="form-control"
                v-model="searchType"
                @input="onChange"
            /></td>
            <td></td>
            <td></td>
            <td></td>
            </tr>
            <tr v-for="room in this.rooms" :key="room.id">
                <td scope="row">
                    <button @click="goRoomID(room.id)" class="button" >{{room.id}} </button>
                </td>
                <td scope="row">
                    {{room.room_type}}
                </td>
                <td scope="row">
                    {{room.room_amenities}}
                </td>
                <td scope="row">
                    {{room.room_features}}
                </td>
                <td scope="row">
                    {{room.belongs_to}}
                </td>
            </tr>
        </tbody>
    </table>
    <table class="table2">
        <tr>
          <td>
            Page : {{page}}/{{pages}}
          </td>
         <td>
           <button @click="previousPage" v-if="page>1"  type="button">Previous page</button>
         </td>
          <td>
            <button  @click="nextPage" v-if="page !==pages" type="button">Next Page</button>
          </td>
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
export default {
    name: 'Rooms',
    data() {
        return {
            rooms: [],
            pages : 0,
            page: 1,
            searchType: ''
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
    onChange() {
      this.page = 1
      UserService.getRooms(this.page, this.searchType).then(
          (response) => {
            this.rooms = response.data;
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
      UserService.getRoomsPage(this.searchType).then(
          (response) => {
            this.pages = parseInt(response.data.bindings[0].triples.value/20)+1;
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
    previousPage: function(){
      this.page = this.page -1
      if (this.page < 1)
        this.page = 1

      UserService.getRooms(this.page, this.searchType).then(
          (response) => {
            this.rooms = response.data;
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

    nextPage: function(){
      this.page = this.page +1
      if (this.page > this.pages)
        this.page = this.pages

      UserService.getRooms(this.page, this.searchType).then(
          (response) => {
            this.rooms = response.data;
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
      UserService.getRooms(this.page, this.searchType).then(
            (response) => {
                this.rooms = response.data;
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

        UserService.getRoomsPage(this.searchType).then(
            (response) => {
              this.pages = parseInt(response.data.bindings[0].triples.value/20)+1;
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
.table2 {
  border: none;
  width: 100%;
}
.tableR tr, .tableR td {  
  border: 1px solid #ddd;
  text-align: left;
  padding: 15px;
  width: 10%;
}
.tableR tr:first-child {
    text-align: center;
}
.jumbotron {
  padding: 1rem 1rem;
  color: #191919;
  background-color:#5482ac !important;
}
tbody tr:nth-child(odd){
  background-color: #e0e9f0;
  color: #191919;
}
.end {
  position: fixed;
  bottom: -4px;
  right: 10px;
  padding: 40px 70px;
  font-size: 20px;
}
</style>