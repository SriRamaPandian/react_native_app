import React from 'react';
import { View , Text , Button } from 'react-native';

const FinalLogin = ({ navigation }) => {
  return (
    <View>
        <Text>
            FinalLogin
        </Text>
        <Button
            title="next"
            onPress={() => navigation.navigate('Landing')} />
    </View>
  )
}

export default FinalLogin;