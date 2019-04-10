import React from 'react';
import { FlatList, View, Text } from 'react-native';

const HistoryResult = ({ data }) => {
  return (
    <View style={{ margin: 20 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.date}</Text>}
      />
    </View>
  );
};

export default HistoryResult;
