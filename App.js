import { useState } from "react";
import { StatusBar, View } from "react-native";
import { Tab, TabView, Text } from "@rneui/themed";
import Header from "./components/header/Header";
import Exercises from "./components/exercises/Exercises";
import WorkoutList from "./components/workout/WorkoutList";

export default function App() {
  const [index, setIndex] = useState(1);
  const tabItemActiveColor = "black";

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
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        containerStyle={{
          backgroundColor: "black",
        }}
        indicatorStyle={{
          backgroundColor: "white",
          height: 3,
        }}
        variant="default"
      >
        <Tab.Item
          title="Exercises"
          titleStyle={{ fontSize: 12, color: "white" }}
          containerStyle={(active) => ({
            backgroundColor: active ? tabItemActiveColor : "black",
          })}
          icon={{ name: "list-outline", type: "ionicon", color: "white" }}
        />
        <Tab.Item
          title="Workout"
          titleStyle={{ fontSize: 12, color: "white" }}
          containerStyle={(active) => ({
            backgroundColor: active ? tabItemActiveColor : "black",
          })}
          icon={{ name: "barbell-outline", type: "ionicon", color: "white" }}
        />
        <Tab.Item
          title="Settings"
          titleStyle={{ fontSize: 12, color: "white" }}
          containerStyle={(active) => ({
            backgroundColor: active ? tabItemActiveColor : "black",
          })}
          icon={{ name: "cog-outline", type: "ionicon", color: "white" }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: "white", width: "100%" }}>
          <Exercises />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "white", width: "100%" }}>
          <WorkoutList
            workoutList={workoutList}
            setWorkoutList={setWorkoutList}
          />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "white", width: "100%" }}>
          <Text h1>Settings</Text>
        </TabView.Item>
      </TabView>
    </>
  );
}
