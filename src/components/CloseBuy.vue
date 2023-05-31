<template>
  <div class="ui grid">
    <div class="six wide column">
      <form class="ui segment large form">
        <div class="ui segment">
          <div class="field">
            <div class="ui right icon input large">
              <input type="text" placeholder="Enter your address" v-model="coordinates" />
              <i class="dot circle link icon" @click="handleLocatorButtonPress"></i>
            </div>
          </div>
          <div class="field">
            <div class="two fields">
              <div class="field">
                <select v-model="type">
                  <option value="restaurant">Restaurant</option>
                  <option value="park">Park</option>
                  <option value="cafe">Cafe</option>
                </select>
              </div>
              <div class="field">
                <select v-model="radius">
                  <option value="1">1 KM</option>
                  <option value="3">3 KM</option>
                  <option value="5">5 KM</option>
                  <option value="10">10 KM</option>
                </select>
              </div>
            </div>
          </div>
          <button class="ui button" @click="handleFindCloseBuyPress">Find CloseBuy</button>
        </div>
      </form>
      <div class="ui segment"  style="max-height:500px;overflow:scroll">
        <div class="ui divided items">
          <div class="item" v-for="place in places" :key="place.id">
            <div class="content">
              <div class="header">{{place.name}}</div>
              <div class="meta">{{place.vicinity}}</div>
              <div class="description">
                <p>Rating: {{place.rating}}</p>
                <p>Open Now: {{place.opening_hours ? (place.opening_hours.open_now ? 'Yes' : 'No') : 'N/A'}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ten wide column">
      <div ref="map" style="height: 100vh"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
/* global google */
export default {
  name: 'CloseBuy',
  data() {
    return {
      lat: 0,
      lng: 0,
      type: "",
      radius: "restaurant",
      places: [],
      map: null,
    };
  },
  computed: {
    coordinates() {
      return `${this.lat}, ${this.lng}`;
    }
  },
  mounted() {
    this.initMap();
    this.askForUserLocation();
  },
  methods: {
    async askForUserLocation() {
      if (navigator.geolocation) {
        try {
          const position = await new Promise((resolve, reject) =>
              navigator.geolocation.getCurrentPosition(resolve, reject)
          );
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.map.setCenter({lat: this.lat, lng: this.lng});
        } catch (error) {
          console.log(error.message);
        }
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    async handleLocatorButtonPress() {
      await this.askForUserLocation();
    },
    async handleFindCloseBuyPress() {
      try {
        const response = await axios.post('http://localhost:3000/getNearbyPlaces', {
          lat: this.lat,
          lng: this.lng,
          type: this.type,
          radius: this.radius * 1000
        });
        this.places = response.data.results;
        this.addLocationsToGoogleMaps();
      } catch (error) {
        console.log(error.message);
      }
    },
    initMap() {
      this.map = new google.maps.Map(this.$refs['map'], {
        zoom: 15,
        center: new google.maps.LatLng(this.lat, this.lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    },
    addLocationsToGoogleMaps() {
      const infowindow = new google.maps.InfoWindow();

      this.places.forEach((place) => {
        const { lat, lng } = place.geometry.location;
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          map: this.map
        });
        google.maps.event.addListener(marker, "click", () => {
          infowindow.setContent(`
            <div class="ui header">${place.name}</div>
            <p>${place.vicinity}</p>
            <p>Rating: ${place.rating}</p>
            <p>Open Now: ${place.opening_hours ? (place.opening_hours.open_now ? 'Yes' : 'No') : 'N/A'}</p>
          `);
          infowindow.open(this.map, marker);
        });
      });
    }
  }
}
</script>

