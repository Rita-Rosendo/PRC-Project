<template>
    <div>
        <header class="jumbotron">
            <h2>
                Welcome <strong>{{ currentUser.username }}</strong>.
            </h2>
            <h6>
                Your email: <strong>{{ currentUser.email }}</strong>
            </h6>
        </header>

        <div style="max-width: 800px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between">
            <div>
                <h1>Your coordinates:</h1>
                <p><input v-model="latitudeC" placeholder="Insert Latitude" @input="onChange"></p>
                <p><input v-model="longitudeC" placeholder="Insert Longitude" @input="onChange"></p>

                <p>{{ myCoordinates.lat }} Latitude, {{ myCoordinates.lng }} Longitude</p>
            </div>
            <div>
                <h1>Map coordinates:</h1>
                <p>{{ mapCoordinates.lat }} Latitude, {{ mapCoordinates.lng }} Longitude</p>
            </div>
        </div>
        
        <google-map
            :center="myCoordinates"
            :zoom="zoom"
            style="width:640px; height:360px; margin: 32px auto;"
            ref="mapRef"
            @dragend="handleDrag"
        ></google-map>

        <div class="end">
            <button @click="$router.go(-1)" style="background-color: #2f7aae; color: #191919 " >Go Back</button>
            <button @click="redirectToProfile()" style="background-color: #2f7aae; color: #191919 " >Go to Profile</button>
        </div>
    </div>
</template>

<script>

export default ({
    name: 'Maps',
    data() {
        return {
            map: null,
            myCoordinates: {
                latitudeC: 0,
                longitudeC: 0,
            },
            zoom: 7
        }
    },
    created() {
        
        if(localStorage.center){
            this.myCoordinates = JSON.parse(localStorage.center);
        } else{
            this.$getLocation({})
            .then(coordinates => {
                this.myCoordinates = coordinates;
            })
            .catch(error => alert(error));
        }

        if(localStorage.zoom){
            this.zoom = parseInt(localStorage.zoom);
        }

    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push('/');
        };

        this.$refs.mapRef.$mapPromise.then(map => this.map = map);

    },
    methods: {
        redirectToProfile(){
            this.$router.push('/profile');
        },
        onChange() {
            this.myCoordinates.lng = this.longitudeC;
            this.myCoordinates.lat = this.latitudeC;
        }
        ,
        handleDrag() {
            let center = {
                lat: this.map.getCenter().lat(),
                lng: this.map.getCenter().lng()
            };
            let zoom = this.map.getZoom();
            localStorage.center = JSON.stringify(center);
            localStorage.zoom = zoom;
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        mapCoordinates() {
            if(!this.map) {
                return {
                    lat: 0,
                    lng: 0
                    };
            }
            return {
                lat: this.map.getCenter().lat().toFixed(4),
                lng: this.map.getCenter().lng().toFixed(4)
                }
            }
    }
})
</script>

<style>
.end {
  position: fixed;
  bottom: -4px;
  right: 10px;
  padding: 40px 70px;
  font-size: 20px;
}
</style>
