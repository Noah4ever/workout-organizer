import { Text } from "@rneui/themed";
import { useState } from "react";
import { View } from "react-native";
import { GLOBAL_STYLES } from "../../styles/Style.js";
export default function Exercises({ exerciseList, setExerciseList }) {
  const [exercises, setExercises] = useState(exerciseList)
  return (
    <View style={GLOBAL_STYLES.pageContainer}>
      <Text h1>Exercises</Text>
    </View>
  );
}
