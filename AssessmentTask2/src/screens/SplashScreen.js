import React  from 'react';
import {StyleSheet, Text,View, Image} from "react-native"

import Logo from "../Assets/Images/Logo.svg"
import Pattern from "../Assets/Images/Pattern.svg"

const SplashScreen=()=>{
    return(
        <>
        <View style={Style.outerView}>
        <View style={Style.innerView}>
            <Pattern width={"100%"}/>
         </View>
          <View style={Style.view}>
            <Logo style={Style.logo}/>
            <Text style={Style.text}>MasmasFood</Text>
            <Text style={Style.subHeading}>Deliver Favorite Food</Text>
          </View>
          </View>
          </>
    )
}
export default SplashScreen
const Style=StyleSheet.create({
    view:{
        justifyContent:"flex-start",
        alignItems:"center",
    
    },
    logo:{
        
    },
    text:{
        fontFamily:"Viga-Regular",
        fontSize:40,
        fontWeight:400,
        color:"#53E88B",
        
    },
    subHeading:{
        fontFamily:"Inter-Black",
        fontStyle:"normal",
        fontWeight:600,
        fontSize:13,
        color:"#09051C"

    },
    outerimage:{
        width:"100%",
        backgroundColor:"#FFFFFF"
    },
    outerView:{backgroundColor:"#FFFFFF",flex:1},    
    innerView:{backgroundColor:"#FFFFFF",flex:0.5}
})