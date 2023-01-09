import { useState } from "react";
import { View } from "react-native";
import { Overlay, Input, Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";
import { GLOBAL_STYLES } from "../../styles/Style";
import ColorPicker from "react-native-wheel-color-picker";

export default function ExerciseModal({
  visible,
  toggleOverlay,
  exerciseName,
  exerciseIcon,
  exerciseColor,
  updateExercise,
  exerciseIndex,
}) {
  const [colorpickerVisible, setColorpickerVisible] = useState(false);
  const toggleColorpickerOverlay = () => {
    setColorpickerVisible(!colorpickerVisible);
  };
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      overlayStyle={{
        width: 250,
        backgroundColor: GLOBAL_STYLES.COLORS.background,
      }}
    >
      <Input
        inputStyle={{ color: GLOBAL_STYLES.COLORS.foreground }}
        defaultValue={exerciseName.current}
        onChangeText={(input) => {
          exerciseName.current = input;
        }}
        placeholder="Exercise name"
      />
      <Button
        title={"Change color"}
        type="clear"
        onPress={toggleColorpickerOverlay}
        titleStyle={{ color: "white" }}
        icon={
          <Icon
            name="color-palette-outline"
            style={{ marginRight: 10 }}
            color={"white"}
            size={24}
          />
        }
        containerStyle={{ marginTop: -10 }}
      />
      <Overlay
        isVisible={colorpickerVisible}
        onBackdropPress={toggleColorpickerOverlay}
        overlayStyle={{
          width: 300,
          height: 400,
          padding: 25,
          backgroundColor: GLOBAL_STYLES.COLORS.background,
        }}
      >
        <View
          style={{
            marginTop: -30,
            height: 300,
          }}
        >
          <ColorPicker
            gapSize={4}
            color={exerciseColor.current}
            onColorChangeComplete={(newColor) => {
              exerciseColor.current = newColor;
            }}
          />
        </View>
        <Button
          title="Save color"
          type="clear"
          onPress={toggleColorpickerOverlay}
          containerStyle={{ marginTop: 25 }}
        />
      </Overlay>
      <Button
        title="Update"
        type="clear"
        containerStyle={{ marginTop: 10 }}
        titleStyle={{ color: GLOBAL_STYLES.COLORS.accent }}
        onPress={() => {
          const newExercise = {
            name: exerciseName.current,
            color: exerciseColor.current,
            icon: exerciseIcon.current,
          };
          toggleOverlay();
          updateExercise(exerciseIndex, newExercise);
        }}
      />
    </Overlay>
  );
}
