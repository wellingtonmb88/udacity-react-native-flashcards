
import React from 'react';
import { Button } from 'react-native';

const SubmitButton = ({ _disabled, _onPress }) => (
    <Button
        disabled={_disabled}
        onPress={_onPress}
        title="SUBMIT"
        color="#841584"
    />
);

export default SubmitButton;