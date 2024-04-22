import React from 'react';
import { Text , View , Button } from 'react-native';

const SelectCourse = ({ navigation }) => {
      return (
        <View>
        <Text>Select Your Course</Text>
          <Button
            title="next"
            onPress={() => navigation.navigate('Final')} />
        </View>
      );
    }
export default SelectCourse;