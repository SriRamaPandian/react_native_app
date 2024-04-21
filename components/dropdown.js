import React, { useState } from 'react';
import { View, Picker } from 'react-native';

const DropdownExample = () => {
  const [selectedValue, setSelectedValue] = useState('java');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
        <Picker.Item label="Python" value="python" />
        <Picker.Item label="C#" value="csharp" />
      </Picker>
    </View>
  );
};

export default DropdownExample;