import { StyleSheet, View } from "react-native";
import { Text, Button, ListItem } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";
import { GLOBAL_STYLES } from "../../styles/Style";
import { sUtils } from "./SettingsUtils";

export default function Settings() {
  const listItemIconSize = 20;
  return (
    <View style={GLOBAL_STYLES.pageContainer}>
      <Text h1>Settings</Text>
      <View>
        <ListItem
          bottomDivider
          containerStyle={styles.listItemContainer}
          onPress={sUtils.clearData}>
          <Icon
            name="refresh-outline"
            style={styles.listItemIcon}
            size={listItemIconSize}
          />
          <ListItem.Content>
            <ListItem.Title style={styles.listItemTitle}>
              Clear data
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem bottomDivider containerStyle={styles.listItemContainer}>
          <Icon
            name="color-palette-outline"
            style={styles.listItemIcon}
            size={listItemIconSize}
          />
          <ListItem.Content>
            <ListItem.Title style={styles.listItemTitle}>Theme</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: GLOBAL_STYLES.COLORS.foreground,
    paddingVertical: 20,
  },
  listItemIcon: {
    color: GLOBAL_STYLES.COLORS.background,
  },
  listItemTitle: {
    color: GLOBAL_STYLES.COLORS.background,
  },
});
