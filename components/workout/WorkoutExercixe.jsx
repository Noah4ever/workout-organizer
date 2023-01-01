import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import globalStyles from "../../styles/Style.js";

export default function WorkoutExercise({ exerciseList, exercise, index }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <View key={index}>
      <View style={styles.exerciseHeader}>
        <DropDownPicker
          style={styles.exerciseDropdown}
          textStyle={{ fontSize: 15 }}
          zIndexInverse={(index + 1) * 1000}
          zIndex={(exerciseList.length - index) * 1000}
          open={open}
          value={value}
          items={exerciseList}
          setOpen={setOpen}
          setValue={setValue}
          searchable={true}
          placeholder="Select an exercise"
          theme="DARK"
          disableBorderRadius={true}
        />
      </View>
      <View>
        {exercise?.set?.map((rep, index) => {
          return (
            <View style={styles.repetitionContainer} key={index}>
              <Text style={globalStyles.h3Light}>{index + 1}.</Text>
              <View style={styles.repetition}>
                <TextInput
                  style={styles.setTextInput}
                  value={rep.repetitions}
                  keyboardType="numeric"
                  placeholder="Reps"
                  placeholderTextColor="#555"
                  textAlign="center"
                />
                <Icon name="close-outline" size={15} color="#FFF" />
                <TextInput
                  style={styles.setTextInput}
                  value={rep.weight}
                  keyboardType="numeric"
                  placeholder="Weight"
                  placeholderTextColor="#555"
                  textAlign="right"
                />
                <Text style={globalStyles.h3Light}>kg</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseHeader: {},
  exerciseDropdown: {
    backgroundColor: "#111111",
    borderRadius: 4,
  },
  repetitionContainer: {
    marginLeft: 35,
    flexDirection: "row",
    alignItems: "center",
  },
  repetition: {
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  setTextInput: {
    color: "#FFF",
    borderBottomColor: "#FFF",
    borderWidth: 1,
    marginHorizontal: 5,
    height: 25,
    padding: 0,
    paddingHorizontal: 5,
    placeholder: "#FFF",
  },
});
