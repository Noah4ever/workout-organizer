import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Text, Input, Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import { GLOBAL_STYLES } from "../../styles/Style.js";
import Exercise from "./Exercise.jsx";
import { cloneDeep } from "lodash";
import ExerciseModal from "./ExerciseModal";

export default function ExerciseList({ exerciseList, setExerciseList }) {
  const [addExerciseVisible, setAddExerciseVisible] = useState(false);

  function toggleAddExercise() {
    setAddExerciseVisible(!addExerciseVisible);
  }

  useEffect(() => {
    // console.log("useEffect ExerciseList (saveing exerciselist)", exerciseList);
    saveExerciseList();
  }, [exerciseList]);

  function deleteExercise(exerciseIndex) {
    setExerciseList((curExerciseList) => {
      if (exerciseIndex === null) {
        return
      }
      curExerciseList.splice(exerciseIndex, 1);
      return cloneDeep(curExerciseList);
    });
  }

  function updateExercise(exerciseIndex, newExercise) {
    setExerciseList((curExeriseList) => {
      // If current ExerciseList is empty
      if (!curExeriseList || curExeriseList.length <= 0) {
        return [
          {
            name: newExercise.name,
            color: newExercise.color,
            icon: newExercise.icon,
            id: uuid.v4(),
          },
        ];
      }
      // If user adds new exercise to list
      if (exerciseIndex === null) {
        const newExObj = {
          name: newExercise.name,
          color: newExercise.color,
          icon: newExercise.icon,
          id: uuid.v4(),
        };
        // console.log("NewExercise:", newExObj);
        curExeriseList.push(newExObj);
      } else {
        curExeriseList[exerciseIndex].name = newExercise.name;
        curExeriseList[exerciseIndex].color = newExercise.color;
        curExeriseList[exerciseIndex].icon = newExercise.icon;
      }
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
        onPress={toggleAddExercise}
      />
      <ExerciseModal
        visible={addExerciseVisible}
        toggleOverlay={toggleAddExercise}
        updateExercise={updateExercise}
        exerciseIndex={null}
        exercise={{ name: "", color: "white", icon: "" }}
      />
      <FlatList
        data={exerciseList}
        renderItem={({ item, index }) => (
          <Exercise
            exercise={item}
            exerciseIndex={index}
            updateExercise={updateExercise}
            deleteExercise={deleteExercise}
          />
        )}
      />
    </View>
  );
}
