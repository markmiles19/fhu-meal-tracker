import { RefreshControl, StyleSheet, View } from 'react-native';

import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';

import { Text } from 'react-native';
import { useState } from 'react';

const clubs = [
  { id: "1", title: "EP", description: "21!21!21!" },
  { id: "2", title: "XBX", description: "opening prayer" },
  { id: "3", title: "PKA", description: "country" },
  { id: "4", title: "XCD", description: "too cool for school" },
  { id: "5", title: "OX", description: "izzie's club" },
  { id: "6", title: "EP", description: "21!21!21!" },
  { id: "7", title: "XBX", description: "opening prayer" },
  { id: "8", title: "PKA", description: "country" },
  { id: "9", title: "XCD", description: "too cool for school" },
  { id: "10", title: "OX", description: "izzie's club" }];

export default function FlatListScreen() {

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = () => {
        setRefreshing(true)
        setTimeout( ()=> setRefreshing(false), 2000)
    }

    const renderItem = ({item} : 
        {
            item: {
                id:string,
                title:string,
                description:string
            }
        }) => {
        <View>
            <Text>{item.title}</Text>
        </View>}

  return (
    <FlatList
        data={clubs}
        keyExtractor={ (item)=> item.id }
        renderItem={renderItem}
        ListHeaderComponent={: "center"}
        ItemSeparatorComponent={ ()=> <View style={styles.separator}}
        ListEmptyComponent={ <Text> No clubs were found </Text>}
        refreshControl=<RefreshControl onRefresh={onRefresh} refreshing={refreshing}></RefreshControl>
        />);}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    height: 1,
    backgroundColor: "#444"
  },
  item: {
    padding: 20,
    backgroundColor: "#714f70"
  },
  itemTitle: {
    color: "#eee",
    fontSize: 16,
    fontWeight: 800,
    paddingBottom: 8
  },
  itemDescription: {
    color: "#ddd"
  }
});