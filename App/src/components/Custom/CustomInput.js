import { StyleSheet, TextInput } from "react-native";

const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
  return (
    <TextInput
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      style={styles.input}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFFFF",
    width: "83%",
    height: 48,
    paddingLeft: 15,
    borderRadius: 5,
    marginBottom: 18,
    alignSelf: "center",
  },
});

export default CustomInput;
