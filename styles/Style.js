import { StyleSheet } from "react-native";

const COLORS = {
  text: "#0F1012",
  textMuted: "#CDD0D4",
  accent: "#28a99e",
  danger: "#ed4a57",
  background: "#0F1012",
  foreground: "#F2F7FF",
};

export const GLOBAL_STYLES = StyleSheet.create({
  COLORS, // Global colors
  pageContainer: {
    // paddingHorizontal: 10,
    paddingVertical: 5,
  },
  h1: {
    fontSize: 24,
    color: COLORS.text,
  },
  h2: {
    fontSize: 16,
    color: COLORS.text,
  },
  h2Light: {
    fontSize: 16,
    color: COLORS.foreground,
  },
  h3Light: {
    fontSize: 12,
    color: COLORS.foreground,
  },
  textCenter: {
    textAlign: "center",
  },
  textRight: {
    textAlign: "right",
  },
});
