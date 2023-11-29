import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../../src/components/CustomButton';
import { CustomButtonProps } from '../../src/components/CustomButton';

describe('StyleButton', () => {
    const mockFunc = jest.fn();
    let props: CustomButtonProps;
    props = {
        title: 'title-test',
        onPress: mockFunc,
        accessibilityLabel: 'test 1 accessible',
        testID: "button-container-test-id"
    };

    it('test touchable button onPress', () => {
        const { getByTestId } = render(<CustomButton {...props} />);
        const buttonContainer = getByTestId('button-container-test-id');
        const button = getByTestId('button-test-id');
        expect(buttonContainer).toBeTruthy();
        expect(button).toBeTruthy();
    });

    it('test touchable button onPress', () => {
        const { getByTestId } = render(<CustomButton {...props} />);
        const button = getByTestId('button-test-id');
        fireEvent(button, 'onPress');
        expect(mockFunc).toHaveBeenCalled();
    });

});
