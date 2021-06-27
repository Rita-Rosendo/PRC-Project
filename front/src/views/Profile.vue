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
    <h3><strong>Hotels</strong></h3>

    <table class="table table-striped">
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
                    {{hotel.name}}
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
          <td></td>
          <td></td>
          <td></td>
        </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import UserService from '../services/user.service';
export default {
    name: 'Profile',
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
            console.log(this.pages)
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
              console.log(this.pages)
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
.jumbotron {
    padding: 1rem 1rem;
    color: #505050;
  background-color:#9cc297 !important;
}
</style>