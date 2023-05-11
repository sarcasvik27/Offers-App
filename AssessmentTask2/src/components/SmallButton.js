import React from "react";
import { StyleSheet, Text, TouchableOpacity,View } from "react-native";
const SmallButton=({functionality,title,disable})=>{
    return(

        <View style={Style.outerView}>
        <TouchableOpacity style={Style.Button} onPress={functionality} disabled={disable}>
          <Text style={Style.text}>{title}</Text>
        </TouchableOpacity>
        </View>
    )
}
export default SmallButton


const Style=StyleSheet.create({
    Button:{
        backgroundColor:"#53E88B",
        borderRadius:15,
        height:50,
        width:100,
        justifyContent:"center",
        alignItems:"center"
    },
    text:{color:"white",fontWeight:"bold"},
    outerView:{alignItems:"center",padding:20}

})