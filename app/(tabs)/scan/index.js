import { useState, useEffect, React, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform, Dimensions, Linking, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect, useRouter } from "expo-router";
import { COLORS } from '../../../constants';
import { useIsFocused } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from "expo-camera/next";
import commonStyles from '../../../styles/common';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Scan = () => {
  const [facing, setFacing] = useState("back");
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const navigation = useNavigation();
  const cameraRef = useRef();

  const isFocused = useIsFocused();

  // Screen Ratio and image padding
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState('4:3');  // default is 4:3
  const { height, width } = Dimensions.get('window');
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Mettre à jour la variable ici lorsque l'écran devient visible à nouveau
      setScanned(false);
    });

    // Nettoyer l'écouteur lors du démontage de l'écran
    return unsubscribe;
  }, [navigation]);

  // set the camera ratio and padding.
  // this code assumes a portrait mode screen
  const prepareRatio = async () => {
    let desiredRatio = '4:3';  // Start with the system default
    // This issue only affects Android
    if (Platform.OS === 'android') {
      const ratios = await cameraRef.current.getSupportedRatiosAsync();

      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(':');
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio;
        distances[ratio] = distance;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set the best match
      desiredRatio = minDistance;
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      // set the preview padding and preview ratio
      setImagePadding(remainder);
      setRatio(desiredRatio);

      // Set a flag so we don't do this 
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }
  };

  // the camera must be loaded in order to access the supported ratios
  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };


  const AskPermission = () => {
    return (
      <View style={commonStyles.body}>
        <SafeAreaView style={commonStyles.flexSafeArea}>
          <View style={styles.container}>
            <View style={{ padding: 10 }}>
              <Text style={commonStyles.textCenter}>Vrrroum a besoin de votre permission pour accéder à votre appareil photo.</Text>
              <View style={{ marginTop: 20 }}>
                <TouchableOpacity style={commonStyles.buttonYellowCenter}
                  onPress={async () => {
                    const p = await requestPermission();
                    if (p.granted == false)
                      Linking.openSettings();
                  }
                  }>
                  <Text style={{ textAlign: 'center' }}>Donner la permission</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }


  const onCodeScanned = ({ data, bounds }) => {
    const { origin, size } = bounds;

    const barCodeX1 = origin.y * screenWidth; // Inversé
    const barCodeY1 = origin.x * screenHeight; // Inversé
    const barCodeX2 = (origin.y + size.height) * screenWidth; // Inversé
    const barCodeY2 = (origin.x + size.width) * screenHeight; // Inversé

    // Définir les dimensions du rectangle de scan
    const scanAreaWidth = screenWidth * 0.9;
    const scanAreaHeight = screenHeight * 0.2;
    const scanAreaX = (screenWidth - scanAreaWidth) / 2;
    const scanAreaY = (screenHeight - scanAreaHeight) / 2;

    const isInsideScanArea =
      barCodeX1 >= scanAreaX &&
      barCodeX2 <= scanAreaX + scanAreaWidth &&
      barCodeY1 >= scanAreaY &&
      barCodeY2 <= scanAreaY + scanAreaHeight;

    if (isInsideScanArea) {
      setScanned(true);
      navigation.navigate('product', { code: data });
    }
  };

  const onCodeScannedAndroid = ({ data, cornerPoints }) => {
    // Convertir les cornerPoints en coordonnées pixels
    const points = cornerPoints.map(point => ({
      x: point.y, // Inversé
      y: point.x // Inversé
    }));

    const barCodeX1 = Math.min(...points.map(point => point.y));
    const barCodeY1 = Math.min(...points.map(point => point.x));
    const barCodeX2 = Math.max(...points.map(point => point.y));
    const barCodeY2 = Math.max(...points.map(point => point.x));

    const scanAreaWidth = screenWidth * 0.9;
    const scanAreaHeight = screenHeight * 0.2;
    const scanAreaX = (screenWidth - scanAreaWidth) / 2;
    const scanAreaY = (screenHeight - scanAreaHeight) / 2;

    const isInsideScanArea =
      barCodeX1 >= scanAreaX &&
      barCodeX2 <= scanAreaX + scanAreaWidth &&
      barCodeY1 >= scanAreaY &&
      barCodeY2 <= scanAreaY + scanAreaHeight;

    if (isInsideScanArea) {
      setScanned(true);
      navigation.navigate('product', { code: data });
    }
  };

  const AndroidCamera = () => {
    if (isFocused && Platform.OS === "android") {
      return (
        <CameraView style={styles.camera} facing={facing}
          ref={cameraRef}
          onBarcodeScanned={scanned ? null : onCodeScannedAndroid}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "qr"],
          }
          }
        >
          <View style={styles.scanArea} />
        </CameraView>
      );
    }
    return (<View />)
  }

  const IOSCamera = () => {
    if (isFocused && Platform.OS === "ios") {
      return (
        <CameraView style={styles.camera} facing={facing}
          ref={cameraRef}
          onBarcodeScanned={scanned ? null : onCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "qr"],
          }
          }
        >
          <View style={styles.scanArea} />
        </CameraView>
      );
    }
    return (<View />)
  }

  const CameraComponent = () => {
    if (Platform.OS === "ios") return IOSCamera();
    return AndroidCamera();
  }

  return (
    <SafeAreaView style={commonStyles.flexSafeArea} edges={['left', 'right']}>
      <View style={styles.container}>
        {!permission ? <ActivityIndicator /> : (permission && permission.granted ? <CameraComponent /> : <AskPermission />)}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0.05 * Dimensions.get('window').width
  },
  rectangle: {
    height: '20%',
    width: '90%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },

  vrrroum: {
    marginTop: 10,
    color: COLORS.lightwhite,
    fontSize: 16,
    alignItems: 'center'
  },

  focus: {
    marginBottom: 10,
    color: COLORS.lightwhite,
    alignItems: 'center',
    fontSize: 16,
  },

  focusSquare: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },

  scanArea: {
    position: 'absolute',
    left: (screenWidth * 0.05),
    top: (screenHeight * 0.4),
    width: (screenWidth * 0.9),
    height: (screenHeight * 0.2),
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10
  },
});

export default Scan;