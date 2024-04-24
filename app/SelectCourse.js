import React from 'react';
import { Text , View , Button } from 'react-native';
import { useRoute } from '@react-navigation/native';


const SelectCourse = ({ navigation }) => {
  const route = useRoute();
  const {rollno} = route.params || {};

      return (
        <View>
        <Text>Select Your Course and your rollno is {rollno}</Text>
          <Button
            title="next"
            onPress={() => navigation.navigate('Final',)} />
        </View>
      );
    }
export default SelectCourse;