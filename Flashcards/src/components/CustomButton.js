
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const CustomButton = ({ buttonStyles, textStyles, _onPress, text }) => (
    <TouchableOpacity
        style={buttonStyles}
        onPress={_onPress}>
        <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
);

export default CustomButton;