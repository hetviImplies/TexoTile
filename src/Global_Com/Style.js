import { StyleSheet } from "react-native";
import { White } from "./color";

export const GlobalStyles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:White
  },
  ContainerWithoutJustifty :{backgroundColor: White, flex: 1},
  containerWithAlignItems: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: White,
  },
})