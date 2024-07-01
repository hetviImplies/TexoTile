import { StyleSheet } from "react-native"
import { create } from "react-test-renderer"


export const styleText=StyleSheet.create({
bold : {
        fontFamily : "Nunito-Bold",
    },
    regular :{
        fontFamily : "Nunito-Regular",
        fontWeight : "400"
    },
    semiBold : {
        fontFamily : "Nunito-SemiBold",
        fontWeight : "600"
    }
})

