import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import globalStyles from "../../styles/Style.js";

import Workout from "./Workout.jsx";
/*
  * workoutList =
  [
   {
     "day": "",
     "workout": [
        {
          "exercise": "",
          "set": [
            {
              "repetitions": 0,
              "weight": 0
           }
          ]
        }
      ]
    }
  ]
  *
*/

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
      id: workoutList.length,
      workout: [],
    };
    setWorkoutList((currentWorkoutList) => [newWorkout, ...currentWorkoutList]);
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
    <View style={globalStyles.pageContainer}>
      <Text style={globalStyles.h1}>Workout List</Text>
      <Button onPress={addWorkout} title="Add Workout" color="#000" />
      <View>
        {workoutList?.map((workout) => {
          // Only show last 7/14 days or last month
          return (
            <Workout
              key={workout.id}
              currentWorkout={workout}
              exerciseList={exerciseList}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
