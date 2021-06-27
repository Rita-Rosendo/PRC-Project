
<template>
  <div class="container login-container ">
    <div class="row">
      <div class="col-md-3 login-form-2">
        <h3>Welcome back</h3>
        <img src="icon.png" width="170" height="170"/>
        <p class="" style="color:#505050">If you already have an account, you can login here</p>
        <div class="center form-group">
          <router-link to="/" class="center btnSubmit">Login</router-link>
        </div>
      </div>
      <div div class="col-md-6 login-form-1">
        <form name="form" @submit.prevent="handleRegister">
          <div v-if="!successful">
            <div class="form-group">
              <input
                  placeholder="Username"
                  autocomplete="off"
                  v-model="user.username"
                  v-validate="'required|min:3|max:20'"
                  type="text"
                  class="form-control"
                  name="username"
              />
              <div
                  v-if="submitted && errors.has('username')"
                  class="alert-danger"
              >
                {{ errors.first('username') }}
              </div>
            </div>
            <div class="form-group">

              <input
                  placeholder="Email"
                  autocomplete="off"
                  v-model="user.email"
                  v-validate="'required|email|max:50'"
                  type="email"
                  class="form-control"
                  name="email"
              />
              <div v-if="submitted && errors.has('email')" class="alert-danger">
                {{ errors.first('email') }}
              </div>
            </div>
            <div class="form-group">
              <input
                  placeholder="Password"
                  autocomplete="off"
                  v-model="user.password"
                  v-validate="'required|min:6|max:40'"
                  type="password"
                  class="form-control"
                  name="password"
              />
              <div
                  v-if="submitted && errors.has('password')"
                  class="alert-danger"
              >
                {{ errors.first('password') }}
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-block"  style="background-color: #9cc297; color: #505050 ">Sign Up</button>
            </div>
          </div>
        </form>

        <div
            v-if="message"
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
        >
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from '../models/user';
export default {
  "name": 'Register',
  "data"() {
    return {
      "user": new User('', '', ''),
      "submitted": false,
      "successful": false,
      "message": '',
    };
  },
  "computed": {
    "loggedIn"() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  "mounted"() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  "methods": {
    "handleRegister"() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
              (data) => {
                this.message = data.message;
                this.successful = true;
              },
              (error) => {
                this.message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                this.successful = false;
              }
          );
        }
      });
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}
.card-container.card {
  max-width: 350px !important;
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
  color: #fff;
}
.login-form-2{
  padding: 5%;
  background: #9cc297;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-2 h3{
  text-align: center;
  color: #fff;
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
  color: #505050;
  background-color: #9cc297;

}
.login-form-1 .btnSubmit{
  font-weight: 40;
  color: #fff;
  background-color: #0062cc;
}
.login-form-2 .btnSubmit{
  font-weight: 600;
  color:#505050;
  background-color:#9cc297;
}
.login-form-2 .ForgetPwd{
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}
.login-form-1 .ForgetPwd{
  color: #0062cc;
  font-weight: 600;
  text-decoration: none;
}
p{
  color: #fff;
  text-align: center;
}
.center {
  margin: auto;
  width: 50%;
  padding: 10px;
}
</style>