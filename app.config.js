export default {
  "expo": {
    "scheme": "myapp",
    "web": {
      "bundler": "metro"
    },
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
          "cameraPermission": "Autoriser $(PRODUCT_NAME) à accéder à votre appareil photo."
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
      "permissions": [
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "INTERNET"
      ],
      "package": "com.miraixscap.Vrrroum",
      "googleServicesFile": process.env.EXPO_PUBLIC_GOOGLE_SERVICES_JSON
    }
  }
}