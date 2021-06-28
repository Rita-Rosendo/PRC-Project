<template>
  <div class="container login-container ">
    <div class="row">
      <div class="col-md-3 login-form-2">
        <h3>Welcome!</h3>
        <img src="homePage.jpg" width="200" height="170"/>
          <p class="" style="color:#191919">If you don't have an account, you can create it here</p>
           <div class="center bt ">
          <router-link to="/register" class="center btnSubmit">Register</router-link>
        </div>
      </div>
     <div class="col-md-6 login-form-1">
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group " >
          <input
            autocomplete="off"
            v-model="user.username"
            v-validate="'required'"
            type="text"
            class="form-control"
            name="username"
            placeholder="Username"
          />
          <div
            v-if="errors.has('username')"
            class="alert alert-danger"
            role="alert"
          >
            Username is required!
          </div>
        </div>
        <div class="form-group">
          <input
            autocomplete="off"
            v-model="user.password"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="password"
            placeholder="Password"
          />
          <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >
            Password is required!
          </div>
        </div>
        <div class="form-group">
          <button class="btn  btn-block " style="background-color: #2f7aae; color: #191919 " :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </form>
    </div>
    </div>
  </div>
</template>

<script>
import User from '../models/user';


export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: '',
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/profile');
            },
            (error) => {
              this.loading = false;
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    },
  },
  dat(){
    
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 450px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.center {
  margin: auto;
  width: 50%;
  padding: 10px;
}
.login-container{
    margin-left: 10%;
    margin-right:5%;
    margin-top: 5%;
    margin-bottom: 5%;
  
}
.login-form-1{
    padding: 5%;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-1 h3{
    text-align: center;
    color: #191919;
}
.login-form-2{
    padding: 5%;
    background: #2f7aae;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-2 h3{
    text-align: center;
    color: #191919;
}
.login-container form{
    padding: 10%;
}
.btnSubmit
{
    width: 50%;
    padding: 10%;
    border-radius: 15rem;
    border:  2px solid;
    cursor: pointer;
    color: #191919;
    background-color: #2f7aae;
  
}
.login-form-1 .btnSubmit{
    font-weight: 40;
    color: #fff;
    background-color: #2f7aae;
}
.login-form-2 .btnSubmit{
    font-weight: 600;
    color:#191919;
    background-color:#2f7aae;
}
.login-form-2 .ForgetPwd{
    color: #191919;
    font-weight: 600;
    text-decoration: none;
}
.login-form-1 .ForgetPwd{
    color: #2f7aae;
    font-weight: 600;
    text-decoration: none;
}
p{
  color: #191919;
  text-align: center;

}


</style>