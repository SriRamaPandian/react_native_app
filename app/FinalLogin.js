import React from 'react';
import { View , Text , Button , StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const FinalLogin = ({ navigation }) => {
  return (
      <View style={styles.container}>
          <Text style={styles.input}>
              FinalLogin
          </Text>
          <Button
              title="next"
              onPress={() => navigation.replace("Landing")} />
      </View>
  )
}

export default FinalLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 500,
    width: 500,
    backgroundColor:'blue',
    overflow: 'scroll',
  },
  input: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
  },
});