import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

// Navigation param list
type RootStackParamList = {
  Planner: { selectedItems: Item[] } | undefined;
};

export type Item = {
  id: string;
  label: string;
  price: number;
};
// Data with hotels, restaurants, attractions
const initialItems: Item[] = [
  { id: "1", label: "Holiday Inn", price: 120 },
  { id: "2", label: "Marriott", price: 150 },
  { id: "3", label: "Comfort Inn", price: 90 },
  { id: "4", label: "Sleep Inn", price: 80 },
  { id: "5", label: "La Quinta", price: 100 },
  { id: "6", label: "Best Western", price: 110 },
  { id: "7", label: "Days Inn", price: 70 },
  { id: "8", label: "Hampton Inn", price: 130 },
  { id: "9", label: "Hilton Garden Inn", price: 140 },
  { id: "10", label: "Four Seasons", price: 300 },
  { id: "11", label: "Olive Garden", price: 50 },
  { id: "12", label: "Cheesecake Factory", price: 60 },
  { id: "13", label: "P.F. Chang's", price: 55 },
  { id: "14", label: "Red Lobster", price: 65 },
  { id: "15", label: "Outback Steakhouse", price: 70 },
  { id: "16", label: "TGI Friday's", price: 45 },
  { id: "17", label: "Buffalo Wild Wings", price: 40 },
  { id: "18", label: "Applebee's", price: 50 },
  { id: "19", label: "Chili's", price: 55 },
  { id: "20", label: "Denny's", price: 35 },
  { id: "21", label: "Hurricane Harbor", price: 80 },
  { id: "22", label: "Universal Studios Hollywood", price: 120 },
  { id: "23", label: "Disneyland Park or Magic Kingdom", price: 150 },
  { id: "24", label: "Knott's Berry Farm", price: 90 },
  { id: "25", label: "Legoland Resort", price: 100 },
  { id: "26", label: "SeaWorld", price: 110 },
  { id: "27", label: "Cedar Point", price: 85 },
  { id: "28", label: "Hersheypark", price: 95 },
  { id: "29", label: "Busch Gardens", price: 130 },
  { id: "30", label: "Six Flags", price: 75 },
  { id: "31", label: "Alcatraz Island Tour", price: 40 },
  { id: "32", label: "Statue of Liberty Tour", price: 50 },
  { id: "33", label: "Grand Canyon Helicopter Tour", price: 200 },
  { id: "34", label: "New York City Sightseeing Cruise", price: 60 },
  { id: "35", label: "San Francisco City Tour", price: 70 },
  { id: "36", label: "Washington D.C. Monuments Tour", price: 80 },
  { id: "37", label: "Chicago Architecture River Cruise", price: 55 },
  { id: "38", label: "Boston Freedom Trail Tour", price: 45 },
  { id: "39", label: "Miami Beach Boat Tour", price: 65 },
  { id: "40", label: "Seattle City Tour", price: 75 }
];

const SelectionExample: React.FC = () => {
  const [availableItems, setAvailableItems] = useState<Item[]>(initialItems);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Adds itesm to selected list
  const addItem = (item: Item) => {
    setAvailableItems(prev => prev.filter(i => i.id !== item.id));
    setSelectedItems(prev => [...prev, item]);
  };
  // Removes items from selected list
  const removeItem = (item: Item) => {
    setSelectedItems(prev => prev.filter(i => i.id !== item.id));
    setAvailableItems(prev => [...prev, item]);
  };
  // Renders each item with appropriate button
  const renderItem = (
    item: Item,
    onPress: () => void,
    buttonLabel: string
  ) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text>{item.label}</Text>
      <Text style={styles.button}>{buttonLabel}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Items</Text>
      <FlatList
        data={availableItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => renderItem(item, () => addItem(item), "ADD")}
      />

      <Text style={styles.title}>Selected Items</Text>
      <FlatList
        data={selectedItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          renderItem(item, () => removeItem(item), "DELETE")
        }
      />

    <Text style={styles.title}>Total Price: ${selectedItems.reduce((sum, item) => sum + item.price, 0)}</Text>
      <Button
        title="Go to Planner"
        onPress={() => navigation.navigate("Planner", { selectedItems })}
      />
    </View>
  );
};

export default SelectionExample;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginVertical: 5,
    borderRadius: 5,
  },
  button: { fontWeight: "bold", color: "blue" },
});