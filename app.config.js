export default {
  "expo": {
    "scheme": "vrrroum",
    "version" : "1.3",
    "platforms": [
      "ios",
      "android",
      "web"
    ],
    "web": {
      "bundler": "metro"
    },
    "icon": "./assets/images/logo/vrrroum_logo.png",
    // "splash": {
    //   "image": "./assets/images/logo/vrrroum_logo.png",
    //   "resizeMode": "cover",
    //   "backgroundColor": "#1d1f1e"
    // },
    "plugins": [
      "expo-router",
      [
        "expo-build-properties",
        {
          "android": {
            "minSdkVersion": 24,
            "compileSdkVersion": 34,
            "targetSdkVersion": 34,
            "buildToolsVersion": "34.0.0"
          },
          "ios": {
            "deploymentTarget": "14.0"
          }
        }
      ],
      "expo-apple-authentication",
      [
        "expo-secure-store",
        {
          "faceIDPermission": "Autoriser $(PRODUCT_NAME) à accéder à vos données biométriques Face ID."
        }
      ],
      [
        "expo-camera",
        {
          "cameraPermission": "$(PRODUCT_NAME) souhaite accéder à votre appareil photo uniquement pour scanner des produits en lisant leur code barre. Aucune capture vidéo ou photo ne sera effectuée."
        }
      ],
      ["@react-native-google-signin/google-signin"]
    ],
    "name": "Vrrroum",
    "slug": "Vrrroum",
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "88009317-e61c-4734-89a8-8121a6aa3f96"
      }
    },
    "ios": {
      "bundleIdentifier": "miraixscapVrrroum",
      "usesAppleSignIn": true,
      "config": {
        "usesNonExemptEncryption": false
      }
    },
    "android": {
      "versionCode": 3,
      "versionName": "1.0.0",
      "permissions": [
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "INTERNET"
      ],
      "package": "com.miraixscap.Vrrroum",
    }
  }
}