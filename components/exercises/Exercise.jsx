import { useRef, useState } from "react";
import { View, Text } from "react-native";
import { ListItem, Overlay, Button, Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";
import ColorPicker from "react-native-wheel-color-picker";

import { GLOBAL_STYLES } from "../../styles/Style";

export default function Exercise({ exercise, exerciseIndex, updateExercise }) {
  const [visible, setVisible] = useState(false);

  const exerciseColor = useRef(exercise.color);
  const exerciseIcon = useRef(exercise.icon);
  const exerciseName = useRef(exercise.name);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <ListItem
      key={exercise.id}
      topDivider={exerciseIndex === 0}
      bottomDivider={true}
      containerStyle={{
        backgroundColor: GLOBAL_STYLES.COLORS.background,
        paddingVertical: 10,
      }}
      onPress={toggleOverlay}>
      <View
        style={{
          backgroundColor: exerciseColor.current,
          borderRadius: 50,
          paddingLeft: 1.5,
          justifyContent: "center",
          alignItems: "center",
          width: 50,
          height: 50,
        }}>
        <Icon
          name={exerciseIcon.current}
          size={24}
          color={GLOBAL_STYLES.COLORS.foreground}
        />
      </View>
      <ListItem.Content>
        <ListItem.Title style={{ color: GLOBAL_STYLES.COLORS.foreground }}>
          {exerciseName.current}
        </ListItem.Title>
      </ListItem.Content>
      <Icon
        name="ellipsis-horizontal"
        size={24}
        color={GLOBAL_STYLES.COLORS.foreground}
      />
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          width: 250,
          backgroundColor: GLOBAL_STYLES.COLORS.background,
        }}>
        <Input
          inputStyle={{ color: GLOBAL_STYLES.COLORS.foreground }}
          defaultValue={exerciseName.current}
          onChangeText={(input) => {
            exerciseName.current = input;
          }}
          placeholder="Exercise name"
        />
        <View>
          <ColorPicker
            gapSize={4}
            color={exerciseColor.current}
            onColorChangeComplete={(newColor) => {
              exerciseColor.current = newColor;
            }}
            style={{
              marginTop: 0,
            }}
          />
        </View>

        <Button
          title="Update"
          type="clear"
          titleStyle={{ color: GLOBAL_STYLES.COLORS.accent }}
          onPress={() => {
            toggleOverlay();
            updateExercise(exerciseIndex, {
              name: exerciseName.current,
              color: exerciseColor.current,
              icon: exerciseIcon.current,
            });
          }}
        />
      </Overlay>
    </ListItem>
  );
}
