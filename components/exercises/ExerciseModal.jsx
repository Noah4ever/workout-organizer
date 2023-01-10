import { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Overlay, Input, Button, ListItem } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";
import { GLOBAL_STYLES } from "../../styles/Style";
import ColorPicker from "react-native-wheel-color-picker";

export default function ExerciseModal({
  visible,
  toggleOverlay,
  exercise,
  updateExercise,
  deleteExercise,
  exerciseIndex,
}) {
  const [colorpickerVisible, setColorpickerVisible] = useState(false);
  const toggleColorpickerOverlay = () => {
    setColorpickerVisible(!colorpickerVisible);
  };

  const exerciseColor = useRef(exercise.color);
  const exerciseIcon = useRef(exercise.icon);
  const exerciseName = useRef(exercise.name);

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      overlayStyle={{
        width: 250,
        backgroundColor: GLOBAL_STYLES.COLORS.foreground,
      }}>
      <ListItem containerStyle={styles.ListItemContainer}>
        <ListItem.Content>
          <Input
            inputStyle={{
              color: GLOBAL_STYLES.COLORS.background,
            }}
            containerStyle={{
              marginTop: 0,
              marginBottom: -15,
              paddingHorizontal: 0,
            }}
            defaultValue={exerciseName.current}
            onChangeText={(input) => {
              exerciseName.current = input;
            }}
            placeholder="Exercise name"
          />
        </ListItem.Content>
      </ListItem>

      <ListItem containerStyle={styles.ListItemContainer}>
        <View
          style={{
            backgroundColor: exerciseColor.current,
            width: 32,
            height: 32,
            borderRadius: 50,
          }}></View>
        <ListItem.Content>
          <View>
            <Button
              title={"Change color"}
              type="clear"
              containerStyle={{}}
              titleStyle={{ color: GLOBAL_STYLES.COLORS.background }}
              onPress={toggleColorpickerOverlay}
            />
          </View>
        </ListItem.Content>
      </ListItem>

      <Overlay
        isVisible={colorpickerVisible}
        onBackdropPress={toggleColorpickerOverlay}
        overlayStyle={{
          width: 300,
          height: 400,
          padding: 25,
          backgroundColor: GLOBAL_STYLES.COLORS.foreground,
        }}>
        <View
          style={{
            marginTop: -30,
            height: 300,
          }}>
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
          titleStyle={{ color: GLOBAL_STYLES.COLORS.accent }}
          containerStyle={{ marginTop: 25 }}
          onPress={toggleColorpickerOverlay}
        />
      </Overlay>

      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Button
          title={"Delete"}
          type="clear"
          containerStyle={{ marginTop: 10 }}
          titleStyle={{ color: GLOBAL_STYLES.COLORS.danger }}
          onPress={() => {
            toggleOverlay();
            if (exerciseIndex === null) {
              return;
            }
            deleteExercise(exerciseIndex);
          }}
        />
        <Button
          title={exerciseIndex === null ? "Add" : "Update"}
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
            // clear useRefs?
          }}
        />
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  ListItemContainer: {
    backgroundColor: GLOBAL_STYLES.COLORS.foreground,
    paddingVertical: 10,
  },
});
