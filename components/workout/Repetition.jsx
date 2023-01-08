import React, { useRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";
import { GLOBAL_STYLES } from "../../styles/Style.js";

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
  function updateRep() {
    const newRep = {
      repetitions: reps.current,
      weight: weight.current,
    };
    updateRepetition(exerciseIndex, repIndex, newRep);
  }

  return (
    <View style={styles.repetitionContainer}>
      <Text style={GLOBAL_STYLES.h2}>{repIndex + 1}.</Text>
      <View style={styles.repetition}>
        <TextInput
          style={styles.TextInput}
          defaultValue={rep.value.repetitions + ""}
          onChangeText={updateReps}
          onBlur={updateRep}
          maxLength={4}
          keyboardType="numeric"
          placeholder="Reps"
          placeholderTextColor={GLOBAL_STYLES.COLORS.textMuted}
          textAlign="center"
          cursorColor={GLOBAL_STYLES.COLORS.text}
        />
        <Icon
          name="close-outline"
          size={20}
          color={GLOBAL_STYLES.COLORS.text}
        />
        <TextInput
          style={styles.TextInput}
          defaultValue={rep.value.weight + ""}
          onChangeText={updateWeight}
          onBlur={updateRep}
          maxLength={5}
          keyboardType="numeric"
          placeholder="Weight"
          placeholderTextColor={GLOBAL_STYLES.COLORS.textMuted}
          textAlign="center"
          cursorColor={GLOBAL_STYLES.COLORS.text}
        />
        <Text style={GLOBAL_STYLES.h2}>kg</Text>
      </View>
      <Button
        onPress={deleteRep}
        type="clear"
        icon={{
          name: "trash-outline",
          type: "ionicon",
          color: GLOBAL_STYLES.COLORS.text,
          size: 18,
        }}
      />
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
    color: GLOBAL_STYLES.COLORS.text,
    borderBottomColor: GLOBAL_STYLES.COLORS.text,
    borderBottomWidth: 1,
    marginHorizontal: 5,
    height: 25,
    padding: 0,
    paddingHorizontal: 15,
    placeholder: GLOBAL_STYLES.COLORS.text,
  },
});
