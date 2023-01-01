import { useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import globalStyles from "../../styles/Style.js";

import WorkoutExercise from "./WorkoutExercixe.jsx";

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

export default function Workout({ workoutList, setWorkoutList }) {
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

  function addWorkout() {
    const newWorkout = {
      day: formatDate(new Date()),
      id: workoutList.length,
      workout: [],
    };
    setWorkoutList((currentWorkoutList) => [newWorkout, ...currentWorkoutList]);
  }

  function addExercise(dayIndex) {
    setWorkoutList((currentWorkoutList) => {
      currentWorkoutList[dayIndex].workout.push({
        exercise: "pullup",
        set: [],
      });
      return [...currentWorkoutList];
    });
  }
  function deleteExercise(exercise) {}
  function updateExercise(exercise, newExercise) {}
  function addRep(rep) {}
  function deleteRep(rep) {}
  function updateRep(rep, newRep) {}

  const [exerciseList, setExerciseList] = useState([
    {
      label: "Pushup",
      value: "pushup",
      icon: () => (
        <Image
          source={require("../../assets/favicon.png")}
          style={styles.exerciseIcon}
        />
      ),
    },
    {
      label: "Pullup",
      value: "pullup",
      icon: () => (
        <Image
          source={require("../../assets/favicon.png")}
          style={styles.exerciseIcon}
        />
      ),
    },
    {
      label: "Leg Raises",
      value: "leg raises",
      icon: () => (
        <Image
          source={require("../../assets/favicon.png")}
          style={styles.exerciseIcon}
        />
      ),
    },
  ]);
  return (
    <View style={globalStyles.pageContainer}>
      <Text style={globalStyles.h1}>Workout List</Text>
      <Button onPress={addWorkout} title="Add Workout" color="#000" />
      <View>
        {workoutList?.map((day, index) => {
          // Only show last 7/14 days or last month
          return (
            <View style={styles.workoutContainer} key={index}>
              <Text style={globalStyles.h3Light}>{day.day}</Text>
              <Button
                onPress={() => {
                  addExercise(index);
                }}
                title="Add Exercise"
                color="#000"
              />
              {day?.workout?.map((exercise, index) => {
                return (
                  <WorkoutExercise
                    key={index}
                    exerciseList={exerciseList}
                    exercise={exercise}
                    index={index}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  workoutContainer: {
    padding: 5,
    marginTop: 10,
    borderRadius: 2,
    backgroundColor: "#000",
    color: "#FFF",
  },
  exerciseIcon: {
    width: 25,
    height: 25,
  },
});
