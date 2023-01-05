import { useState, useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { Tab, TabView, Text } from "@rneui/themed";
import Exercises from "./components/exercises/Exercises";
import WorkoutList from "./components/workout/WorkoutList";
import { GLOBAL_STYLES } from "./styles/Style";

// TODO:
/* 
 - Delete Exercise
 - Clean up code
 - ExercisePage
    - Create/Update/Delete exercises
    - Add icons to exercises
 - SettingsPage
    - Color themes
    - Language
    - Clearing data
 - Saving and loading data
 - New Design
*/

export default function App() {
  const [index, setIndex] = useState(1);

  useEffect(() => {
    if (index < 0) {
      setIndex(0);
    } else if (index > 2) {
      setIndex(3);
    }
  }, [index]);

  const [workoutList, setWorkoutList] = useState([
    {
      day: "31.12.2022",
      id: 0,
      workout: [
        {
          id: 0,
          exercise: "Pullup",
          set: [
            {
              id: 0,
              value: {
                repetitions: 10,
                weight: 0,
              },
            },
            {
              id: 1,
              value: {
                repetitions: 10,
                weight: 0,
              },
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <StatusBar backgroundColor="#000" barStyle="light-content" />

      <TabView
        value={index}
        onChange={setIndex}
        animationType="timing"
        animationConfig={{ duration: 100 }}>
        <TabView.Item
          style={{
            backgroundColor: GLOBAL_STYLES.COLORS.background,
            width: "100%",
          }}>
          <Exercises />
        </TabView.Item>
        <TabView.Item
          style={{
            backgroundColor: GLOBAL_STYLES.COLORS.background,
            width: "100%",
          }}>
          <WorkoutList
            workoutList={workoutList}
            setWorkoutList={setWorkoutList}
          />
        </TabView.Item>
        <TabView.Item
          style={{
            backgroundColor: GLOBAL_STYLES.COLORS.background,
            width: "100%",
          }}>
          <Text h1>Settings</Text>
        </TabView.Item>
      </TabView>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        containerStyle={{
          backgroundColor: "white",
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
          icon={{ name: "list-outline", type: "ionicon", color: "black" }}
        />
        <Tab.Item
          title="Workout"
          titleStyle={styles.TabItemTitle}
          containerStyle={styles.TabItemContainer}
          icon={{ name: "barbell-outline", type: "ionicon", color: "black" }}
        />
        <Tab.Item
          title="Settings"
          titleStyle={styles.TabItemTitle}
          containerStyle={styles.TabItemContainer}
          icon={{ name: "cog-outline", type: "ionicon", color: "black" }}
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
