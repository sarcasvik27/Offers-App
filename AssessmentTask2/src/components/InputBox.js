import React from "react";
import { StyleSheet, TextInput } from "react-native";

const InputBox=({placeholder,item,errors,type,length})=>{
   const [data,setData]=item
   const [error,setError]=errors    
    return(
        <TextInput  maxLength={length} keyboardType = {type} elevation={10} style={Styles.inputBox} placeholder={placeholder} value={data} onChangeText={(value)=>setData(value)} onChange={()=>{setError("")}}/>
    )
}
export default InputBox

const Styles=StyleSheet.create({
    inputBox:{
        backgroundColor:"#FFFFFF",
        borderWidth:1,
        borderColor:"#F4F4F4",
        borderRadius:15,
        shadowColor: "rgb(90, 108, 234)",
}
})
