import { useState } from "react";
import { StatusBar, View } from "react-native";
import Header from "./components/header/Header";
import Workout from "./components/workout/Workout";

export default function App() {
  const [workoutList, setWorkoutList] = useState([
    {
      day: "31.12.2022",
      id: 0,
      workout: [
        {
          exercise: "pushup",
          set: [
            {
              repetitions: 10,
              weight: 0,
            },
            {
              repetitions: 10,
              weight: 0,
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
      <Workout workoutList={workoutList} setWorkoutList={setWorkoutList} />
    </View>
  );
}
