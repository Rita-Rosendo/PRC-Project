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
    <div class="box">
      <div class="btn-group">
        <table>
          <tr>
            <button @click="goPageHotels" class="button" >Click here to see all hotels</button>
            <button @click="goPageRooms" class="button" >Click here to see all rooms</button>
          </tr>
        </table>
      </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Profile',
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
  color: #191919;
  background-color:#5482ac !important;
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

.box {
  margin-top: 15%;
}

.btn-group .button:not(:last-child) {
  border-bottom: none; /* Prevent double borders */
}

.btn-group .button:hover {
  background-color: #2f7aae;
}
</style>