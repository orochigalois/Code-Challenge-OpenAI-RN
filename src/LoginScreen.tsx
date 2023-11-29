import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from './store/features/authSlice';

import StyleButton from './components/StyleButton';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { status: loginStatus, error: loginError } = useSelector((state: any) => state.auth);
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const handleLogin = () => {
        // Reset errors
        setUsernameError(null);
        setPasswordError(null);

        // Form validation
        if (!username.trim()) {
            setUsernameError('Username is required.');
        }

        if (!password.trim()) {
            setPasswordError('Password is required.');
        }

        if (username.trim() && password.trim()) {
            dispatch(loginAsync({ username, password }));
        }
    };

    useEffect(() => {
        loginStatus === 'succeeded' && navigation.navigate('Dashboard');
    }, [loginStatus]);

    return (
        <View style={styles.container} testID="login-screen">
            <Text style={styles.title} testID="app-name-test-id">ChatGPT</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => {
                    setUsername(text);
                    setUsernameError(null); // Clear previous error on input change
                }}
                testID="username-input-test-id"
            />
            {usernameError && <Text style={styles.error} testID="username-error-test-id">{usernameError}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
                    setPasswordError(null); // Clear previous error on input change
                }}
                testID="password-input-test-id"
            />
            {passwordError && <Text style={styles.error} testID="password-error-test-id">{passwordError}</Text>}
            {loginError && <Text style={styles.error} testID="login-error-test-id">{loginError}</Text>}
            {loginStatus === 'loading' ? (
                <ActivityIndicator size="small" color="#0000ff" testID="loading-indicator-test-id" />
            ) : (
                <StyleButton color="#ffffff" title="Login" onPress={handleLogin} testID="login-button-test-id" />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 10,
        backgroundColor: '#2089dc', // Light blue background color
        padding: 0,
        borderRadius: 5,
    }
});

export default LoginScreen;
