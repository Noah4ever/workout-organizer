import { useState } from "react";
import { StatusBar, View } from "react-native";
import Header from "./components/header/Header";
import WorkoutList from "./components/workout/WorkoutList";

export default function App() {
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
    <View>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <Header />
      <WorkoutList workoutList={workoutList} setWorkoutList={setWorkoutList} />
    </View>
  );
}
