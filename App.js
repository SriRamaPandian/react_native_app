import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , ScrollView , SafeAreaView } from 'react-native';
import UserDetailsForm from './app/in';

export default function App() {
  return (
    <ScrollView>
      <SafeAreaView>  
        <View  style={styles.container}>
          <UserDetailsForm/>
          <Text style={styles.back}>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 250,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  back:{
    backgroundColor: '#9130D4',
    textDecorationColor: '#fff',
    textShadowColor: '#fff',
  },
});
