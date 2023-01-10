import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, Button } from "@rneui/themed";
import { GLOBAL_STYLES } from "../../styles/Style.js";
import uuid from "react-native-uuid";
import cloneDeep from "lodash/cloneDeep";

import Workout from "./Workout.jsx";

export default function WorkoutList({
  workoutList,
  setWorkoutList,
  exerciseList,
}) {
  useEffect(() => {
    console.log("useEffect workoutList (saving Workoutlist)");
    saveWorkoutList();
  }, [workoutList]);

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
      if (currentWorkoutList === null) {
        return [newWorkout];
      }
      return cloneDeep([newWorkout, ...currentWorkoutList]);
    });
  }
  function deleteWorkout(workoutIndex) {
    setWorkoutList((curWorkoutList) => {
      curWorkoutList.splice(workoutIndex, 1);
      return cloneDeep(curWorkoutList);
    });
  }
  function updateWorkout(workoutIndex, newWorkout) {
    setWorkoutList((curWorkoutList) => {
      curWorkoutList[workoutIndex] = newWorkout;
      return cloneDeep(curWorkoutList);
    });
  }

  async function saveWorkoutList() {
    try {
      if (!workoutList) {
        return;
      }
      await AsyncStorage.setItem(
        "workoutList",
        JSON.stringify(workoutList)
      ).then(() => {});
    } catch (error) {
      console.log("Error while saving data with AsyncStorage! ERROR: ", error);
    }
  }

  return (
    <View style={[GLOBAL_STYLES.pageContainer, { paddingHorizontal: 10 }]}>
      <Text h1>Workout List</Text>
      <Button
        onPress={addWorkout}
        title="Add Workout"
        buttonStyle={{ backgroundColor: GLOBAL_STYLES.COLORS.foreground }}
        titleStyle={{ color: GLOBAL_STYLES.COLORS.text }}
      />
      {workoutList != null ? (
        <FlatList
          ListFooterComponent={<View style={{ height: 100 }}></View>}
          data={workoutList}
          renderItem={({ item, index }) => (
            <Workout
              key={item.id}
              currentWorkout={item}
              exerciseList={exerciseList}
              deleteWorkout={deleteWorkout}
              updateWorkout={updateWorkout}
              workoutIndex={index}
              saveWorkoutList={saveWorkoutList}
            />
          )}
        />
      ) : (
        ""
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
