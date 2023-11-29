import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StyleButton from '../../src/components/StyleButton';
import { StyleButtonProps } from '../../src/components/StyleButton';

describe('StyleButton', () => {
    const mockFunc = jest.fn();
    let props: StyleButtonProps;
    props = {
        title: 'title-test',
        onPress: mockFunc,
        accessibilityLabel: 'test 1 accessible',
        testID: "styleButton-test-id"
    };

    it('test touchable button onPress', () => {
        const { getByTestId } = render(<StyleButton {...props} />);
        const buttonContainer = getByTestId('styleButton-container-test-id');
        const button = getByTestId('styleButton-test-id');
        expect(buttonContainer).toBeTruthy();
        expect(button).toBeTruthy();
    });

    it('test touchable button onPress', () => {
        const { getByTestId } = render(<StyleButton {...props} />);
        const buttonContainer = getByTestId('styleButton-container-test-id');
        const button = getByTestId('styleButton-test-id');
        fireEvent(button, 'onPress');
        expect(mockFunc).toHaveBeenCalled();
    });

});
