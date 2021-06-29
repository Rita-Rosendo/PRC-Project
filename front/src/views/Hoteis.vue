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
    <h2><strong>Hotels</strong></h2>

    <table class="tableH">
        <thead>
            <tr>
                <th>Name</th>
              <th>Type</th>
                <th>Adress</th>
                <th>City</th>
              <th>Country</th>
              <th>Rating</th>
            </tr>
        </thead>
        <tbody>
        <tr>
          <td><input
              type="text"
              class="form-control"
              v-model="searchName"
              @input="onChange"
          /></td>
          <td></td>
          <td><input
              type="text"
              class="form-control"
              v-model="searchAddress"
              @input="onChange"
          /></td>
          <td><input
              type="text"
              class="form-control"
              v-model="searchCity"
              @input="onChange"
          /></td>
          <td><input
              type="text"
              class="form-control"
              v-model="searchCountry"
              @input="onChange"
          /></td>
          <td></td>
        </tr>
            <tr v-for="hotel in this.hoteis" :key="hotel.name">
                <td scope="row">
                    <button @click="goHotelID(hotel.id)" class="button" >{{hotel.name}} </button>
                </td>
              <td scope="row">
                {{hotel.property_type}}
              </td>
              <td scope="row">
                {{hotel.address}}
              </td>
              <td scope="row">
                {{hotel.city}}
              </td>
              <td scope="row">
                {{hotel.country}}
              </td>
              <td scope="row">
                {{hotel.star_rating}}
              </td>
            </tr>
        </tbody>
    </table>
    <div class="end">
      <button  type="button">Page : {{page}}/{{pages}}</button>
      <button @click="previousPage" v-if="page>1"  type="button">Previous page</button>
      <button  @click="nextPage" v-if="page !==pages" type="button">Next Page</button>
    </div>
</div>
</template>

<script>
import UserService from '../services/user.service';
export default {
    name: 'Hoteis',
    data() {
        return {
            hoteis: [],
            pages : 0,
            page: 1,
          searchCity: '',
          searchCountry: '',
          searchName: '',
          searchAddress: ''
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
  methods: {
    goHotelID(id){
        this.$router.push('/hotel/' + id);
    },
    redirectToProfile(){
            this.$router.push('/profile');
    },
    onChange() {
      this.page = 1
      UserService.getHotels(this.page, this.searchName, this.searchAddress, this.searchCity, this.searchCountry).then(
          (response) => {
            this.hoteis = response.data;
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
      UserService.getHotelPages(this.searchName, this.searchAddress, this.searchCity, this.searchCountry).then(
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

      UserService.getHotels(this.page, this.searchName, this.searchAddress, this.searchCity, this.searchCountry).then(
          (response) => {
            this.hoteis = response.data;
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

      UserService.getHotels(this.page, this.searchName, this.searchAddress, this.searchCity, this.searchCountry).then(
          (response) => {
            this.hoteis = response.data;
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
        
        UserService.getHotels(this.page, this.searchName, this.searchAddress, this.searchCity, this.searchCountry).then(
            (response) => {
                this.hoteis = response.data;
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

        UserService.getHotelPages(this.searchName, this.searchAddress, this.searchCity, this.searchCountry).then(
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

.tableH tr, .tableH td {  
  border: 1px solid #ddd;
  text-align: left;
  padding: 15px;
  width: 80%;
}

.tableH tr:first-child {
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

.button {
  background-color: #7096ba ;
  border: none;
  color: #191919;
  padding: 20px 50px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  width: 250px;
}
.end {
  position: fixed;
  bottom: -4px;
  right: 10px;
  padding: 40px 70px;
  font-size: 20px;
}
</style>