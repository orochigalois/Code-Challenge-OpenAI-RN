import React, { FC } from 'react';
import { AccessibilityRole, TouchableOpacity, Text, StyleSheet } from 'react-native';

export interface CustomButtonProps {
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
  testID?: string;
  title: string;
  disabled?: boolean;
  onPress: () => void;
}

const CustomButton: FC<CustomButtonProps> = (props: CustomButtonProps) => {
  return (
    <TouchableOpacity {...props}
      style={[
        styles.buttonContainer,
        props.disabled && styles.disabled,
      ]}
      testID={props.testID ? props.testID : 'button-container-test-id'}>
      <Text style={styles.buttonText} testID='button-test-id'>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#3498db', // Change the color as per your preference
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
