import React from 'react';
import { View, Text, Button , StyleSheet , ScrollView } from 'react-native';
//import { useNavigation } from '@react-navigation/native';

const SelectCourse = ({ navigation }) => {
  //const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.input}>Select Your Course</Text>
      <Button
        title="Next"
        onPress={() => navigation.replace("Final")}/>
    </View>
  );
};

export default SelectCourse;

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