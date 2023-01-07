import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "@rneui/themed";
import { GLOBAL_STYLES } from "../../styles/Style.js";
import uuid from "react-native-uuid";
import cloneDeep from "lodash/cloneDeep";

import Workout from "./Workout.jsx";

export default function WorkoutList({ workoutList, setWorkoutList }) {
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join(".");
  }

  /* WORKOUT */
  function addWorkout() {
    const newWorkout = {
      day: formatDate(new Date()),
      id: uuid.v4(),
      workout: [],
    };
    setWorkoutList((currentWorkoutList) => {
      return cloneDeep([newWorkout, ...currentWorkoutList]);
    });
  }
  function deleteWorkout(workoutIndex) {
    setWorkoutList((curWorkout) => {
      curWorkout.splice(workoutIndex, 1);
      console.log("deleteWorkout", curWorkout)
      return cloneDeep(curWorkout);
    })
  }

  const [exerciseList, setExerciseList] = useState([
    {
      value: "Pushup",
      key: 0,
    },
    {
      value: "Pullup",
      key: 1,
    },
    {
      value: "Leg Raises",
      key: 2,
    },
  ]);
  return (
    <View style={GLOBAL_STYLES.pageContainer}>
      <Text h1>Workout List</Text>
      <Button
        onPress={addWorkout}
        title="Add Workout"
        buttonStyle={{ backgroundColor: GLOBAL_STYLES.COLORS.foreground }}
        titleStyle={{ color: GLOBAL_STYLES.COLORS.text }}
      />
      <View>
        {workoutList?.map((workout, index) => {
          // Only show last 7/14 days or last month
          return (
            <Workout
              key={workout.id}
              currentWorkout={workout}
              exerciseList={exerciseList}
              deleteWorkout={deleteWorkout}
              workoutIndex={index}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
