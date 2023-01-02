import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import globalStyles from "../../styles/Style.js";
import uuid from "react-native-uuid";

import Exercise from "./Exercise.jsx";

export default function Workout({ currentWorkout, exerciseList }) {
  const [workout, setWorkout] = useState({});

  const [count, setCount] = useState(0);
  function updateCount() {
    setCount((currentCount) => {
      return currentCount + 1;
    });
  }

  /* EXERCISE */
  function addExercise() {
    setWorkout((curWorkout) => {
      const newExercise = {
        id: uuid.v4(),
        exercise: "",
        set: [],
      };
      curWorkout.workout.push(newExercise);
      return curWorkout;
    });
  }
  function deleteExercise(exerciseIndex) {
    setWorkout((curWorkout) => {
      curWorkout.workout.splice(exerciseIndex, 1);
      return curWorkout;
    });
  }
  function updateExercise(exerciseIndex, newExercise) {
    setWorkout((curWorkout) => {
      curWorkout.workout[exerciseIndex] = newExercise;
      return curWorkout;
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
      return curWorkout;
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
      return curWorkout;
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
      return curWorkout;
    });
  }

  return (
    <View style={styles.workoutContainer}>
      <Text style={globalStyles.h2Light}>{count}</Text>
      <Button title="Add Count" onPress={updateCount} />
      <Text style={globalStyles.h2Light}>{currentWorkout.day}</Text>
      <Button onPress={addExercise} title="Add Exercise" color="#000" />
      {currentWorkout?.workout?.map((exercise, exerciseIndex) => {
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
  );
}

const styles = StyleSheet.create({
  workoutContainer: {
    padding: 5,
    marginTop: 10,
    borderRadius: 7,
    backgroundColor: "#000",
    color: "#FFF",
  },
  exerciseIcon: {
    width: 25,
    height: 25,
  },
});
