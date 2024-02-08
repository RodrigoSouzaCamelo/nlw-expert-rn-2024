import { Platform, ToastAndroid, Alert } from "react-native";

export function toast(title: string, message: string) {
  if(Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert(title, message)
  }
}