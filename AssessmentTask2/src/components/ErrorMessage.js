import React from "react";
import { Text,StyleSheet } from "react-native";
const ErrorMessage=({message})=>{
    return(<Text style={Style.text}>{message}</Text>)
}
export default ErrorMessage

const Style=StyleSheet.create({
    text:{color:"red"}

})