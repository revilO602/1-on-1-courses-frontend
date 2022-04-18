import { StatusBar } from 'expo-status-bar';
import {LogBox, View} from 'react-native';
import Navigation from './navigation';

export default function App() {
  LogBox.ignoreLogs([
    'Possible Unhandled Promise Rejection',
  ]);
  return (
    <>
      <Navigation/>
      <StatusBar style='auto'/>
    </>
  );
}

