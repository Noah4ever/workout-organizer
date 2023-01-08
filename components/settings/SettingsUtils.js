import AsyncStorage from "@react-native-async-storage/async-storage"

export const sUtils = {
  clearData: async () => {
    console.log('--- Clearing data')
    try {
      await AsyncStorage.setItem("workoutList", "[]");
    } catch (error) {
      console.log("Error clearing data! ERROR: ", error);
    }
  }
}
