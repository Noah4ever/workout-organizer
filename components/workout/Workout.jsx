import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "@rneui/themed";
import uuid from "react-native-uuid";
import cloneDeep from "lodash/cloneDeep";
import Exercise from "./Exercise.jsx";
import { GLOBAL_STYLES } from "../../styles/Style.js";

export default function Workout({
  currentWorkout,
  exerciseList,
  deleteWorkout,
  workoutIndex,
  saveWorkoutList,
  updateWorkout,
}) {
  const [workout, setWorkout] = useState(currentWorkout);

  useEffect(() => {
    // console.log("workout", workout);
    updateWorkout(workoutIndex, workout);
    saveWorkoutList();
  }, [workout]);

  function deleteWork() {
    deleteWorkout(workoutIndex);
  }

  /* EXERCISE */
  function addExercise() {
    // console.log("addEx");
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
      return cloneDeep(curWorkout);
    });
  }
  function deleteExercise(exerciseIndex) {
    // console.log("deleteEx");
    setWorkout((curWorkout) => {
      curWorkout.workout.splice(exerciseIndex, 1);
      return cloneDeep(curWorkout);
    });
  }
  function updateExercise(exerciseIndex, newExercise) {
    // console.log("updatedEx");
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
    // console.log("addRep");
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
    // console.log("deleteRep");
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
    // console.log("updateRep");
    setWorkout((curWorkout) => {
      // Updates exercise in set
      curWorkout.workout[exerciseIndex].set[repIndex].value = newRep;
      return cloneDeep(curWorkout);
    });
  }

  return (
    <View style={styles.workoutContainer}>
      <View style={styles.workoutDayContainer}>
        <Text style={styles.workoutDay}>{workout.day}</Text>
        <Button
          onPress={deleteWork}
          type="clear"
          icon={{
            name: "trash-outline",
            type: "ionicon",
            color: "black",
            size: 18,
          }}
        />
      </View>
      <View style={styles.exerciseContainer}>
        <Button
          onPress={addExercise}
          title="Add Exercise"
          buttonStyle={{ backgroundColor: GLOBAL_STYLES.COLORS.foreground }}
          titleStyle={{ color: GLOBAL_STYLES.COLORS.text }}
        />
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
  workoutDayContainer: {
    display: "flex",
    flexDirection: "row",
    width: 150,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    color: "#666666",
    backgroundColor: GLOBAL_STYLES.COLORS.foreground,
  },
  workoutContainer: {
    marginTop: 5,
  },
  exerciseContainer: {
    padding: 5,
    marginBottom: 10,
    borderRadius: 3,
    borderTopLeftRadius: 0,
    backgroundColor: GLOBAL_STYLES.COLORS.foreground,
    color: "#202020",
  },
  workoutDay: {
    width: 100,
    textAlignVertical: "center",
    textAlign: "center",
  },
  exerciseIcon: {
    width: 25,
    height: 25,
  },
});
