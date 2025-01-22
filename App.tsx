import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {CalculateStringNumber} from './src/StringCalculator';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    try {
      console.log('Raw Input:', input);
      const sanitizedInput = input.replace(/\r/g, '').trim();
      console.log('Sanitized Input:', sanitizedInput);

      const sumValue = CalculateStringNumber(sanitizedInput);
      setResult(sumValue);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>String Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter numbers..."
        value={input}
        onChangeText={setInput}
        multiline
      />
      <Button title="Calculate" onPress={handleCalculate} />
      {result !== null && <Text style={styles.result}>Sum: {result}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  result: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
