# Foody 🍔🌴☕️

Foody is a web-based application built with Vue.js. The application allows users to search for nearby places such as
restaurants, parks, and cafes within a certain radius.

## Features 🚀

Enter the desired location.
Search for places by type: restaurants, parks, or cafes.
Choose a search radius from 1, 3, 5, or 10 kilometers.
Display detailed information about the places including name, location, rating, and opening hours.
Visualize the places on a Google Map.

## How it Works 📚

The application asks for the user's geolocation when it first loads.
Users can manually enter a different location or use the current location by clicking on the circular icon on the right
side of the location input field.
Users select the type of place they are interested in and the search radius using the dropdown menus.
After clicking the "Find CloseBuy" button, a request is made to a local server endpoint to retrieve the places that
match the search criteria.
The places are then displayed in a list on the left side of the application.
Each place is also marked on the Google Map on the right side of the application. Clicking on a marker shows an info
window with details about the place.

## Code Overview 🧑‍💻

The Vue component, CloseBuy, is the heart of the application.

The data function returns the reactive data properties of the component.
The coordinates computed property returns a string representation of the latitude and longitude.
The mounted lifecycle hook initializes the Google Map and asks for the user's geolocation.
The askForUserLocation method retrieves the user's geolocation if available.
The handleLocatorButtonPress method calls the askForUserLocation method.
The handleFindCloseBuyPress method sends a POST request to a local server endpoint to retrieve nearby places based on
the search criteria.
The initMap method initializes the Google Map.
The addLocationsToGoogleMaps method adds markers to the Google Map for each place and adds an info window that shows
when a marker is clicked.

## Getting Started 🎉

To run this project locally, you need to have Node.js and npm installed on your machine.

1. Clone the repository.
2. Run npm install to install the necessary dependencies.
3. Start the local server.
4. Open the application in your web browser.