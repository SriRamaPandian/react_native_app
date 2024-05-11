import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import SearchBar from 'react-native-search-bar';

const SearchComponent = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (text) => {
    setSearchText(text);

    // Perform search logic here, for example fetch data from an API
    // For simplicity, let's just filter an array
    const filteredResults = dummyData.filter(item =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <View>
      <SearchBar
        placeholder="Search..."
        onChangeText={handleSearch}
        onCancel={() => handleSearch('')}
        value={searchText}
      />
      <FlatList
        data={searchResults}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

// Dummy data for testing
const dummyData = [
  'Apple',
  'Banana',
  'Orange',
  'Mango',
  'Pineapple',
  'Strawberry',
  'Grapes',
  'Watermelon',
];

export default SearchComponent;