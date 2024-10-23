# Meteo App

## Goal

The Meteo app is designed to provide users with weather information based on their location. It displays weather conditions for various locations and different times of the day, enhancing the user experience with visually appealing color representations.

## Getting Started

To start using the Meteo app, follow these steps:

### Prerequisites

- Node.js installed on your machine
- Expo CLI installed globally (`npm install -g expo-cli`)

### Env

- Add the following variables to your `.env` file: `BASE_URL` and `API_KEY` (for OpenWeather).

### Installation

1. Clone the repository to your local machine:
   git clone <https://github.com/Mateo-Abribat/React-Native-Weather-App.git>
2. Get inside the repository:
   cd meteo_app
3. Install dependencies:
   `yarn`

### Running the App

You can run the app on iOS, Android, or web using Expo.

### Expo

`yarn start`

#### iOS

`yarn ios`

#### Android

`yarn android`

#### Web

`yarn web`

### Note

Ensure that you have an Expo client installed on your iOS or Android device to run the app on mobile. For web, you can view it in your browser.

## Expo Configuration

The app is configured using the Expo framework. Below are some key configurations:

```json
{
  "expo": {
    "name": "meteo",
    "slug": "meteo",
    "version": "1.0.0"
    // Other configurations...
  }
}
```
