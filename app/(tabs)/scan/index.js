import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect, useCallback, React } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import * as BarCodeScanner from "expo-barcode-scanner";
import { useNavigation, useFocusEffect, useRouter } from "expo-router";
import { COLORS } from '../../../constants';

const Scan = () => {

  const [type, setType] = useState(CameraType.back);
  const [scanned, setScanned] = useState(false);
  const [code, setCode] = useState();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Mettre à jour la variable ici lorsque l'écran devient visible à nouveau
      setScanned(false);
    });

    // Nettoyer l'écouteur lors du démontage de l'écran
    return unsubscribe;
  }, [navigation]);

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
    console.log("barcode scanned !");
    console.log(newCode);
    // navigation.push('product', {
    //   code: newCode
    // });

    navigation.navigate('product', { code: newCode.data });

    // router.push({ pathname: `/scan/product/${newCode.data}`, params: newCode });

    // navigation.push({pathname : '/product', params : {code : newCode}});

    // navigation.push('product', {
    //   params: { code: newCode },
    // });
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}
        onBarCodeScanned={scanned ? null : onCodeScanned}
        // zoom={Platform.OS === 'ios' ? 0.015 : 0}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.ean13, BarCodeScanner.Constants.BarCodeType.ean8, BarCodeScanner.Constants.BarCodeType.upc_ean, BarCodeScanner.Constants.BarCodeType.qr],
          barCodeSize: { height: 10, width: 10 }
        }}>
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle} />
          <Text style={styles.vrrroum}>Vrrroum Scan</Text>
        </View>
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Tourner Camera</Text>
          </TouchableOpacity>
        </View> */}
      </Camera>
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
});

export default Scan;