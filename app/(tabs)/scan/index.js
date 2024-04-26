import { Camera, CameraType, AutoFocus } from 'expo-camera';
import { useState, useEffect, useCallback, React, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Platform, Dimensions } from 'react-native';
import * as BarCodeScanner from "expo-barcode-scanner";
import { useNavigation, useFocusEffect, useRouter } from "expo-router";
import { Icon } from '@rneui/themed';
import { COLORS } from '../../../constants';
import { useIsFocused } from '@react-navigation/native';

const Scan = () => {

  const [type, setType] = useState(CameraType.back);
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [focusSquare, setFocusSquare] = useState({ visible: false, x: 0, y: 0 });
  const [prevFocusDistance, setPrevFocusDistance] = useState(null);
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

  useEffect(() => {
    if (isRefreshing) {
      setIsRefreshing(false);
    }
  }, [isRefreshing]);

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

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const onCodeScanned = ({ type, data }) => {
    setScanned(true);
    const newCode = { type: type, data: data };
    navigation.navigate('product', { code: newCode.data });
  };

  // Function to handle touch events
  const handleTouch = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    setFocusSquare({ visible: true, x: locationX, y: locationY });

    // Hide the square after 1 second
    setTimeout(() => {
      setFocusSquare((prevState) => ({ ...prevState, visible: false }));
    }, 1000);

    setIsRefreshing(true);
  };

  return (
    <View style={styles.container}>
      {isFocused && Platform.OS === "android" && <Camera style={[styles.camera, {}]} type={type}
        ref={cameraRef}
        ratio={ratio}
        onCameraReady={setCameraReady}
        onBarCodeScanned={scanned ? null : onCodeScanned}
        autoFocus={!isRefreshing ? AutoFocus.on : AutoFocus.off}
        onTouchEnd={handleTouch} // Handle touch to set focus point
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.ean13, BarCodeScanner.Constants.BarCodeType.ean8, BarCodeScanner.Constants.BarCodeType.upc_ean, BarCodeScanner.Constants.BarCodeType.qr],
          barCodeSize: { height: 10, width: 10 }
        }}>
        <View style={styles.rectangleContainer}>
          <Text style={styles.focus}>Cliquer pour effectuer un focus</Text>
          <View style={styles.rectangle} />
          <Text style={styles.vrrroum}>Vrrroum Scan</Text>
        </View>

        <TouchableOpacity style={{ padding: 10, backgroundColor: COLORS.darkgray, alignSelf: 'center', marginBottom: 30, borderRadius: 15 }} onPress={toggleCameraType}>
          <Icon name='cameraswitch' type='material' color={COLORS.yellow} size={30} />
        </TouchableOpacity>
      </Camera>}

      {isFocused && Platform.OS === "ios" && < Camera style={styles.camera} type={type}
        ref={cameraRef}
        onBarCodeScanned={scanned ? null : onCodeScanned}
        autoFocus={!isRefreshing ? AutoFocus.on : AutoFocus.off}
        onTouchEnd={handleTouch} // Handle touch to set focus point
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.ean13, BarCodeScanner.Constants.BarCodeType.ean8, BarCodeScanner.Constants.BarCodeType.upc_ean, BarCodeScanner.Constants.BarCodeType.qr],
          barCodeSize: { height: 10, width: 10 }
        }}>
        <View style={styles.rectangleContainer}>
          <Text style={styles.focus}>Cliquer pour effectuer un focus</Text>
          <View style={styles.rectangle} />
          <Text style={styles.vrrroum}>Vrrroum Scan</Text>
        </View>

        <TouchableOpacity style={{ padding: 10, backgroundColor: COLORS.darkgray, alignSelf: 'center', marginBottom: 30, borderRadius: 15 }} onPress={toggleCameraType}>
          <Icon name='cameraswitch' type='material' color={COLORS.yellow} size={30} />
        </TouchableOpacity>
      </Camera>}
    </View >
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
    alignItems: 'center',
    fontSize: 16,
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
});

export default Scan;