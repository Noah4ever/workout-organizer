import { useRef, useState } from "react";
import { View, Text } from "react-native";
import { ListItem, Overlay, Button, Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";
import ColorPicker from "react-native-wheel-color-picker";

import { GLOBAL_STYLES } from "../../styles/Style";
import ExerciseModal from "./ExerciseModal";

export default function Exercise({
  exercise,
  exerciseIndex,
  updateExercise,
  deleteExercise,
}) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <ListItem
      key={exercise.id}
      topDivider={exerciseIndex === 0}
      bottomDivider={true}
      containerStyle={{
        backgroundColor: GLOBAL_STYLES.COLORS.foreground,
        paddingVertical: 10,
      }}
      onPress={toggleOverlay}>
      <View
        style={{
          backgroundColor: exercise.color,
          borderRadius: 50,
          paddingLeft: 1.5,
          justifyContent: "center",
          alignItems: "center",
          width: 24,
          height: 24,
        }}>
        <Icon
          name={exercise.icon}
          size={15}
          color={GLOBAL_STYLES.COLORS.background}
        />
      </View>
      <ListItem.Content>
        <ListItem.Title style={{ color: GLOBAL_STYLES.COLORS.background }}>
          {exercise.name}
        </ListItem.Title>
      </ListItem.Content>
      <Icon
        name="ellipsis-horizontal"
        size={24}
        color={GLOBAL_STYLES.COLORS.background}
      />
      <ExerciseModal
        visible={visible}
        toggleOverlay={toggleOverlay}
        updateExercise={updateExercise}
        deleteExercise={deleteExercise}
        exerciseIndex={exerciseIndex}
        exercise={exercise}
      />
    </ListItem>
  );
}
