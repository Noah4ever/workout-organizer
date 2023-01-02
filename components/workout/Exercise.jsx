import { useRef } from "react";
import { View, Button, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SelectList } from "react-native-dropdown-select-list";

import globalStyles from "../../styles/Style.js";
import Repetition from "./Repetition.jsx";

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

  function deleteEx() {
    deleteExercise(exerciseIndex);
  }
  function updateEx() {
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
            data={exerciseList}
            placeholder={"Select exercise"}
            placeholderTextColor={"#999"}
            save="value"
            search={true}
            searchPlaceholder={"Search"}
            boxStyles={{ width: 300, borderRadius: 5, borderColor: "gray" }}
            dropdownStyles={{ borderRadius: 5, borderColor: "gray" }}
            dropdownTextStyles={{ color: "white" }}
            inputStyles={{ color: "white", textAlignVertical: "center" }}
            searchicon={
              <Icon
                name="search-outline"
                size={20}
                color={"#FFF"}
                style={{ marginRight: 7 }}
              />
            }
            closeicon={
              <Icon name="close-outline" size={20} color={"#FFF"} style={{}} />
            }
            arrowicon={
              <Icon name="chevron-down-outline" size={20} color={"#FFF"} />
            }
          />
        </View>
        <View>
          <Button onPress={deleteEx} title="Delete" color={"black"} />
        </View>
      </View>

      <View>
        {exercise?.set?.map((rep, index) => {
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
        <Button title="Add rep" color={"black"} onPress={addRep} />
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
