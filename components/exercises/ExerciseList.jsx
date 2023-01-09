import { useEffect } from "react";
import { FlatList, View } from "react-native";
import { Text, Input, Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GLOBAL_STYLES } from "../../styles/Style.js";
import Exercise from "./Exercise.jsx";
import { cloneDeep } from "lodash";

export default function ExerciseList({ exerciseList, setExerciseList }) {
  // const [exercises, setExercises] = useState(exerciseList)

  useEffect(() => {
    console.log("useEffect ExerciseList (saveing exerciselist)");
    saveExerciseList();
  }, [exerciseList]);

  function updateExercise(exerciseIndex, newExercise) {
    setExerciseList((curExeriseList) => {
      curExeriseList[exerciseIndex].name = newExercise.name;
      curExeriseList[exerciseIndex].color = newExercise.color;
      curExeriseList[exerciseIndex].icon = newExercise.icon;
      return cloneDeep(curExeriseList);
    });
  }

  async function saveExerciseList() {
    try {
      if (!exerciseList) {
        return;
      }
      await AsyncStorage.setItem("exerciseList", JSON.stringify(exerciseList));
    } catch (error) {
      console.log(
        "Error while saving exerciselist with AsyncStorage! ERROR:",
        error
      );
    }
  }

  return (
    <View style={GLOBAL_STYLES.pageContainer}>
      <Text h1>Exercises</Text>
      <Button
        type="clear"
        color={GLOBAL_STYLES.COLORS.foreground}
        icon={{
          name: "add-outline",
          type: "ionicon",
          color: GLOBAL_STYLES.COLORS.foreground,
          size: 32,
        }}
      />
      <FlatList
        data={exerciseList}
        renderItem={({ item, index }) => (
          <Exercise
            exercise={item}
            exerciseIndex={index}
            updateExercise={updateExercise}
          />
        )}
      />
    </View>
  );
}
