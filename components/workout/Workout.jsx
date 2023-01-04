import { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import uuid from "react-native-uuid";
import cloneDeep from "lodash/cloneDeep";
import Exercise from "./Exercise.jsx";

export default function Workout({ currentWorkout, exerciseList }) {
  const [workout, setWorkout] = useState(currentWorkout);

  /* EXERCISE */
  function addExercise() {
    setWorkout((curWorkout) => {
      let newExercise = {
        id: uuid.v4(),
        exercise: "",
        set: [],
      };
      if (curWorkout.workout) {
        curWorkout.workout.unshift(newExercise);
      } else {
        curWorkout.workout = [newExercise];
      }
      console.log("unshift", curWorkout);
      return cloneDeep(curWorkout);
    });
  }
  function deleteExercise(exerciseIndex) {
    setWorkout((curWorkout) => {
      curWorkout.workout.splice(exerciseIndex, 1);
      return cloneDeep(curWorkout);
    });
  }
  function updateExercise(exerciseIndex, newExercise) {
    setWorkout((curWorkout) => {
      console.log(curWorkout);
      if (curWorkout.workout) {
        curWorkout.workout[exerciseIndex] = newExercise;
      }
      return cloneDeep(curWorkout);
    });
  }

  /*
   * -----===< REPETITION >===-----
   */

  /**
   * Adds a new repetition to exercise state
   * @param {number} exerciseIndex
   */
  function addRepetition(exerciseIndex) {
    setWorkout((curWorkout) => {
      // Creates empty repetition
      const newRepetition = {
        id: uuid.v4(),
        value: {
          repetitions: "",
          weight: "",
        },
      };
      // Pushes new repetition in exercise set
      curWorkout.workout[exerciseIndex].set.push(newRepetition);
      return cloneDeep(curWorkout);
    });
  }
  /**
   * Deletes a repetition from exercise
   * @param {number} exerciseIndex
   * @param {number} repIndex
   */
  function deleteRepetition(exerciseIndex, repIndex) {
    setWorkout((curWorkout) => {
      // Removes exercise in set array with splice()
      curWorkout.workout[exerciseIndex].set.splice(repIndex, 1);
      return cloneDeep(curWorkout);
    });
  }
  /**
   * Updates a repetition
   * @param {number} exerciseIndex
   * @param {number} repIndex
   * @param {object} newRep
   */
  function updateRepetition(exerciseIndex, repIndex, newRep) {
    setWorkout((curWorkout) => {
      // Updates exercise in set
      curWorkout.workout[exerciseIndex].set[repIndex].value = newRep;
      return cloneDeep(curWorkout);
    });
  }

  return (
    <View style={styles.workoutContainer}>
      <Text style={styles.workoutDay}>{workout.day}</Text>
      <View style={styles.exerciseContainer}>
        <Button onPress={addExercise} title="Add Exercise" color="#000" />
        {workout?.workout?.map((exercise, exerciseIndex) => {
          return (
            <Exercise
              key={exercise.id}
              exerciseList={exerciseList}
              exercise={exercise}
              exerciseIndex={exerciseIndex}
              deleteExercise={deleteExercise}
              updateExercise={updateExercise}
              addRepetition={addRepetition}
              updateRepetition={updateRepetition}
              deleteRepetition={deleteRepetition}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  workoutContainer: {
    marginTop: 5,
  },
  exerciseContainer: {
    padding: 5,
    marginBottom: 10,
    borderRadius: 3,
    borderTopLeftRadius: 0,
    backgroundColor: "#000",
    color: "#FFF",
  },
  workoutDay: {
    width: 100,
    textAlign: "center",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    color: "#EEE",
    backgroundColor: "#000",
  },
  exerciseIcon: {
    width: 25,
    height: 25,
  },
});
