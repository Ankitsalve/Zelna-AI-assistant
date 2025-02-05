import React, { useState } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  View, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { Text } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons'; 

export default function TabOneScreen() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<string[]>([]); // Store messages

  // Handle sending a message
  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, inputText]); // Add message to chat
      setInputText(''); // Clear input field
    }
  };

  // Handle clearing the chat
  const handleClearChat = () => {
    setMessages([]); // Reset messages to empty
  };

  return (
    <View style={styles.container}>
      {/* Clear Chat Button */}
      <TouchableOpacity style={styles.clearButton} onPress={handleClearChat}>
      <Ionicons name="trash" size={24} color="white" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Zelna AI Assistant</Text>

      {/* Chat Messages Container */}
      <ScrollView style={styles.chatContainer} contentContainerStyle={{ paddingBottom: 20 }}>
        {messages.map((msg, index) => (
          <View key={index} style={styles.userMessage}>
            <Text style={styles.userText}>{msg}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input & Send Button */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput 
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#888"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
    paddingTop: 21,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#1e1e1e', 
    borderRadius: 25,
    padding: 10,
    marginBottom: 17,
    marginTop: 17, 
  },
  userMessage: {
    alignSelf: 'flex-end', 
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: '70%',
    marginLeft: 'auto', 
  },
  userText: {
    color: 'white',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 17, 
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    marginBottom: 8,
  },
  clearButton: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#1e1e1e', 
    borderRadius: 17,
    marginBottom: 10,
  },
  
});
