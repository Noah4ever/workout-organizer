import { Text, Button } from "@rneui/themed";
import { View } from "react-native";
import { GLOBAL_STYLES } from "../../styles/Style";
import Icon from "react-native-vector-icons/Ionicons";
import { sUtils } from "./SettingsUtils";

export default function Settings() {
  return <View style={GLOBAL_STYLES.pageContainer}>
    <Text h1>Settings</Text>
    <View>
      <Button
        title={"Clear data"}
        color={GLOBAL_STYLES.COLORS.foreground}
        titleStyle={{ color: GLOBAL_STYLES.COLORS.text }}
        onPress={sUtils.clearData}
        icon={
          <Icon
            name="refresh-outline"
            color={GLOBAL_STYLES.COLORS.text}
            size={20}
          />
        }
      />
    </View>
  </View>
}
