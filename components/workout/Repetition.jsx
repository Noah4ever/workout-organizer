import React, { useRef } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import globalStyles from "../../styles/Style";

export default function WorkoutExerciseRepetition({
  rep,
  repIndex,
  exerciseIndex,
  updateRepetition,
  deleteRepetition,
}) {
  const reps = useRef(rep.value.repetitions);
  const weight = useRef(rep.value.weight);

  function updateReps(value) {
    reps.current = value;
  }
  function updateWeight(value) {
    weight.current = value;
  }
  function deleteRep() {
    deleteRepetition(exerciseIndex, repIndex);
  }
  console.log(rep);
  function updateRep() {
    const newRep = {
      repetition: reps.current,
      weight: weight.current,
    };
    updateRepetition(exerciseIndex, repIndex, newRep);
  }

  return (
    <View style={styles.repetitionContainer}>
      <Text style={globalStyles.h2Light}>{repIndex + 1}.</Text>
      <View style={styles.repetition}>
        <TextInput
          style={styles.TextInput}
          defaultValue={rep.value.repetitions + ""}
          onChangeText={updateReps}
          maxLength={4}
          keyboardType="numeric"
          placeholder="Reps"
          placeholderTextColor="#777"
          textAlign="center"
          cursorColor={"white"}
        />
        <Icon name="close-outline" size={20} color="#FFF" />
        <TextInput
          style={styles.TextInput}
          defaultValue={rep.value.weight + ""}
          onChangeText={updateWeight}
          maxLength={5}
          keyboardType="numeric"
          placeholder="Weight"
          placeholderTextColor="#777"
          textAlign="center"
          cursorColor={"white"}
        />
        <Text style={globalStyles.h2Light}>kg</Text>
      </View>
      <Button title="Delete" onPress={deleteRep} color={"black"} />
      <Button title="Save" onPress={updateRep} color={"black"} />
    </View>
  );
}

const styles = StyleSheet.create({
  repetitionContainer: {
    marginLeft: 35,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  repetition: {
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  TextInput: {
    color: "#FFF",
    borderBottomColor: "#FFF",
    borderBottomWidth: 1,
    marginHorizontal: 5,
    height: 25,
    padding: 0,
    paddingHorizontal: 15,
    placeholder: "#FFF",
  },
});
