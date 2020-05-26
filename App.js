import React, { useState, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  let cameraRef = useRef(null)

  useEffect(() => {
    this.getPermissionAsync();
  }, []);

  getPermissionAsync = async () => {
    // Camera roll Permission 
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasPermission(status === 'granted')
  }

  handleCameraType = () => {
    setType(type === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back);
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  }

  takePicture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.current.takePictureAsync();
      console.log(photo.uri);  
    }
  }

  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>No access to camera, cheese</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 20 }}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
              onPress={() => this.pickImage()}>
              <Ionicons
                name="ios-photos"
                style={{ color: "#fff", fontSize: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
              onPress={() => this.takePicture()}>
              <FontAwesome
                name="camera"
                style={{ color: "#fff", fontSize: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
              onPress={() => this.handleCameraType()}>
              <MaterialCommunityIcons
                name="camera-switch"
                style={{ color: "#fff", fontSize: 40 }}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }

}

export default App