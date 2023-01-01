import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function Header() {
  return (
    <View style={styles.container}>
      <Icon name="menu-outline" size={30} color="#FFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    justifyContent: "center",
    paddingHorizontal: 10,
    height: 40,
  },
  text: {
    color: "white",
  },
});
