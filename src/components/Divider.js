import React from "react";
import { View } from "react-native"
import { DIVIDER_COLOR } from "../utils/Colors"

const Divider = (props) => {
    const { height = 1, color = DIVIDER_COLOR } = props
    return <View
        style={{ width: '100%', height: height, backgroundColor: color }}
    ></View>
}

export default Divider