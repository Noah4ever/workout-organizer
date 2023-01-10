import { useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";
import { SelectList } from "react-native-dropdown-select-list";

import Repetition from "./Repetition.jsx";
import { GLOBAL_STYLES } from "../../styles/Style.js";

export default function WorkoutExercise({
  exerciseList,
  exercise,
  exerciseIndex,
  deleteExercise,
  updateExercise,
  addRepetition,
  updateRepetition,
  deleteRepetition,
}) {
  const selected = useRef(exercise.exercise);
  function updateSelected(value) {
    selected.current = value;
  }

  // console.log("exercise:", exercise)
  const selectListData = [];
  if (exerciseList.length > 0) {
    // All exercises from exercise list
    exerciseList.forEach((ex) => {
      selectListData.push({
        key: ex.id,
        value: ex.name,
      });
    });
  }

  function deleteEx() {
    deleteExercise(exerciseIndex);
  }
  function updateEx() {
    // console.log("updateEx", exercise);
    updateExercise(exerciseIndex, exercise);
  }
  function addRep() {
    addRepetition(exerciseIndex);
  }
  function optionDefault() {
    return { key: exercise.exercise, value: exercise.exercise };
  }

  return (
    <View style={styles.exerciseContainer}>
      <View style={styles.exerciseHeader}>
        <View>
          <SelectList
            setSelected={(val) => {
              updateSelected(val);
              exercise.exercise = val;
              updateEx();
            }}
            defaultOption={optionDefault()}
            data={selectListData}
            placeholder={"Select exercise"}
            placeholderTextColor={"#999"}
            save="value"
            search={true}
            searchPlaceholder={"Search"}
            boxStyles={{
              width: 300,
              borderRadius: 3,
              borderColor: "gray",
              marginBottom: 3,
            }}
            dropdownStyles={{ borderRadius: 5, borderColor: "gray" }}
            dropdownTextStyles={{ color: GLOBAL_STYLES.COLORS.text }}
            inputStyles={{
              color: GLOBAL_STYLES.COLORS.text,
              textAlignVertical: "center",
            }}
            searchicon={
              <Icon
                name="search-outline"
                size={20}
                color={GLOBAL_STYLES.COLORS.text}
                style={{ marginRight: 7 }}
              />
            }
            closeicon={
              <Icon
                name="close-outline"
                size={20}
                color={GLOBAL_STYLES.COLORS.text}
                style={{}}
              />
            }
            arrowicon={
              <Icon
                name="chevron-down-outline"
                size={20}
                color={GLOBAL_STYLES.COLORS.text}
              />
            }
          />
        </View>
        <View>
          <Button
            onPress={deleteEx}
            type="clear"
            icon={{ name: "trash-outline", type: "ionicon", color: "black" }}
          />
        </View>
      </View>

      <View>
        {exercise.set.map((rep, index) => {
          return (
            <Repetition
              key={index}
              rep={rep}
              repIndex={index}
              exerciseIndex={exerciseIndex}
              updateRepetition={updateRepetition}
              deleteRepetition={deleteRepetition}
            />
          );
        })}
        <Button
          title="Add rep"
          onPress={addRep}
          buttonStyle={{ backgroundColor: GLOBAL_STYLES.COLORS.foreground }}
          titleStyle={{ color: GLOBAL_STYLES.COLORS.text }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
  exerciseHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
