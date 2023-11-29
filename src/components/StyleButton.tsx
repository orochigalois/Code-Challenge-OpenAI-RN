import React from 'react';
import { AccessibilityRole, StyleSheet, View, Button } from 'react-native';

export interface StyleButtonProps {
    accessibilityLabel?: string;
    accessibilityRole?: AccessibilityRole;
    testID?: string;
    title: string;
    color?: string;
    disable?: boolean;
    onPress: () => void;
}

const StyleButton = (props: StyleButtonProps): JSX.Element => {

    return (
        <View style={styles.buttonContainer}
            accessibilityLabel={props.accessibilityLabel}
            accessibilityRole={props.accessibilityRole}
            testID='styleButton-container-test-id'>
            <Button {...props} color={props.color ? props.color : '#ffffff'} title={props.title} onPress={props.onPress} testID={props.testID ? props.testID : 'styleButton-test-id'} />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        backgroundColor: '#2089dc', // Light blue background color
        padding: 0,
        borderRadius: 5,
    }
});

export default StyleButton;