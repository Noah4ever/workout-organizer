import { useRef, useState } from "react";
import { View, Text } from "react-native";
import { ListItem, Overlay, Button, Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";
import ColorPicker from "react-native-wheel-color-picker";

import { GLOBAL_STYLES } from "../../styles/Style";
import ExerciseModal from "./ExerciseModal";

// <View>
//   <ColorPicker
//     gapSize={4}
//     color={exerciseColor.current}
//     onColorChangeComplete={(newColor) => {
//       exerciseColor.current = newColor;
//     }}
//     style={{
//       marginTop: 0,
//     }}
//   />
// </View>

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
      onPress={toggleOverlay}
    >
      <View
        style={{
          backgroundColor: exerciseColor.current,
          borderRadius: 50,
          paddingLeft: 1.5,
          justifyContent: "center",
          alignItems: "center",
          width: 50,
          height: 50,
        }}
      >
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
      <ExerciseModal
        visible={visible}
        toggleOverlay={toggleOverlay}
        exerciseName={exerciseName}
        exerciseIcon={exerciseIcon}
        exerciseColor={exerciseColor}
        updateExercise={updateExercise}
        exerciseIndex={exerciseIndex}
      />
    </ListItem>
  );
}
