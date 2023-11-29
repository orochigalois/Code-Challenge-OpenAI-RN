import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOpenAiData } from './services/openaiService';
import { logoutAsync } from './store/features/authSlice';
import { Dimensions, SafeAreaView } from 'react-native';
import StyleButton from './components/StyleButton';

const screenWidth = Dimensions.get('window').width;

const DashboardScreen: React.FC = ({ navigation }) => {
  const [openAiData, setOpenAiData] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [loading, setLoading] = useState(false);
  const authToken = useSelector((state: any) => state.auth.token);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAsync());
    navigation.navigate('Login');
  };

  const handleSubmit = () => {
    setLoading(true);

    fetchOpenAiData(inputContent)
      .then((data) => {
        setOpenAiData(data);
      })
      .catch((error) => console.error('Error fetching OpenAI data:', error))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.safeContainer} testID="dashboard-screen-test-id">
      <View style={styles.mainContainer}>
        <View style={styles.inputContainer} testID="input-container-test-id">
          <TextInput
            style={styles.input}
            placeholder="Message ChatGPT..."
            value={inputContent}
            onChangeText={(text) => setInputContent(text)}
            testID="input-content-test-id"
          />
          <Button title="Submit" onPress={handleSubmit} testID="submit-button-test-id" disabled={loading} />
        </View>
        {loading && <ActivityIndicator size="small" color="#0000ff" testID="loading-indicator-test-id" />}
        {
          !loading && openAiData &&
          <ScrollView contentContainerStyle={styles.scrollContainer} testID="scroll-container-test-id">
            <Text style={styles.openAiData} testID="openai-data-test-id">
              {openAiData}
            </Text>
          </ScrollView>
        }
        <StyleButton color="#ffffff" title="Logout" onPress={handleLogout} testID="logout-button-test-id" disabled={loading} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 16,
    height: 40,
    width: '100%',
    paddingLeft: 8,
    alignItems: 'center', // Align children vertically in the center
  },
  input: {
    flex: 1,
    height: 40,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 16,
  },
  scrollContainer22: {


  },
  openAiData: {
    fontSize: 16,
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 16,
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: '#2089dc', // Light blue background color
    padding: 0,
    borderRadius: 5,
  }
});

export default DashboardScreen;
