import { useState, useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { Tab, TabView, Text } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ExerciseList from "./components/exercises/ExerciseList";
import WorkoutList from "./components/workout/WorkoutList";
import Settings from "./components/settings/Settings";

import { GLOBAL_STYLES } from "./styles/Style";

// TODO:
/*
 - x Delete Exercise
 - x Add scrollbar to workoutlist
 - Clean up code
 - Give name to workout and filter searchbar to workoutlist page
 - Changeable day
 - Create custom dropdown or find better one (ReactNativeElements has one)
 - ExercisePage
    - Create/Update/Delete exercises
    - Add icons to exercises
 - SettingsPage
    - Color themes
    - Language
    - x Clearing data
 - x Saving and loading data
 - New Design
*/

export default function App() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < 0) {
      setIndex(0);
    } else if (index > 2) {
      setIndex(3);
    }
    loadWorkoutList();
  }, [index]);

  async function loadWorkoutList() {
    try {
      const data = await AsyncStorage.getItem("workoutList");
      console.log("Loaded data", data);
      if (data === null) {
        return false;
      } else {
        setWorkoutList(JSON.parse(data));
      }
    } catch (error) {
      console.log("Error while loading data from AsyncStorage! ERROR: ", error);
    }
  }

  const [workoutList, setWorkoutList] = useState(null);

  const [exerciseList, setExerciseList] = useState([
    {
      name: "Pushup",
      color: "#2f9fb4",
      icon: "barbell-outline",
      id: uuid.v4(),
    },
    {
      name: "Pullup",
      color: "#a690be",
      icon: "barbell-outline",
      id: uuid.v4(),
    },
    {
      name: "Leg Raises",
      color: "#7a4d4a",
      icon: "barbell-outline",
      id: uuid.v4(),
    },
  ]);

  return (
    <>
      <StatusBar backgroundColor="#000" barStyle="light-content" />

      <TabView
        value={index}
        onChange={setIndex}
        animationType="timing"
        disableSwipe={true}
        animationConfig={{ duration: 250 }}>
        <TabView.Item
          style={{
            backgroundColor: GLOBAL_STYLES.COLORS.background,
            width: "100%",
          }}>
          <ExerciseList
            exerciseList={exerciseList}
            setExerciseList={setExerciseList}
          />
        </TabView.Item>
        <TabView.Item
          style={{
            backgroundColor: GLOBAL_STYLES.COLORS.background,
            width: "100%",
          }}>
          <WorkoutList
            workoutList={workoutList}
            setWorkoutList={setWorkoutList}
            exerciseList={exerciseList}
            setExerciseList={setExerciseList}
          />
        </TabView.Item>
        <TabView.Item
          style={{
            backgroundColor: GLOBAL_STYLES.COLORS.background,
            width: "100%",
          }}>
          <Settings />
        </TabView.Item>
      </TabView>

      <LinearGradient
        colors={["transparent", "#000000"]}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 75,
        }}
      />

      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        containerStyle={{
          backgroundColor: GLOBAL_STYLES.COLORS.foreground,
        }}
        indicatorStyle={{
          backgroundColor: GLOBAL_STYLES.COLORS.accent,
          height: 3,
        }}
        variant="default">
        <Tab.Item
          title="Exercises"
          titleStyle={styles.TabItemTitle}
          containerStyle={styles.TabItemContainer}
          icon={{
            name: "list-outline",
            type: "ionicon",
            color: GLOBAL_STYLES.COLORS.text,
          }}
        />
        <Tab.Item
          title="Workouts"
          titleStyle={styles.TabItemTitle}
          containerStyle={styles.TabItemContainer}
          icon={{
            name: "barbell-outline",
            type: "ionicon",
            color: GLOBAL_STYLES.COLORS.text,
          }}
        />
        <Tab.Item
          title="Settings"
          titleStyle={styles.TabItemTitle}
          containerStyle={styles.TabItemContainer}
          icon={{
            name: "options-outline",
            type: "ionicon",
            color: GLOBAL_STYLES.COLORS.text,
          }}
        />
      </Tab>
    </>
  );
}

const styles = StyleSheet.create({
  TabItemTitle: {
    fontSize: 12,
    color: "black",
  },
  TabItemContainer: (active) => ({
    backgroundColor: active
      ? GLOBAL_STYLES.COLORS.foreground
      : GLOBAL_STYLES.COLORS.foreground,
    // borderRadius: 25,
  }),
});
