import React, { useState } from 'react';
import axios, { AxiosError } from 'axios'; 
import { 
  StyleSheet, 
  TextInput, 
  View, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define the message type
type Message = {
  text: string;
  sender: 'user' | 'ai';
};

export default function TabOneScreen() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]); 
  const GEMINI_API_KEY = 'AIzaSyCOMD35ZQdP09IUSQNdeTxOyNVjz9Cu358'; 

  const handleSend = async () => {
    if (inputText.trim()) {
      
      setMessages((prevMessages) => [...prevMessages, { text: inputText, sender: 'user' }]);
      setInputText('');

      try {
       
        const response = await axios.post( `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            contents: [{
              parts: [{
                text: inputText 
              }]
            }]
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        
        console.log("Gemini API Response:", response.data);

        const content = response.data.candidates?.[0]?.content;
        console.log("Content field:", content); 
       
        const aiResponse = content?.parts?.[0]?.text || 'Sorry, I didn’t understand that.';
        
       
        if (!aiResponse) {
          console.error('No valid text in the response:', response.data);
        }

        setMessages((prevMessages) => [...prevMessages, { text: aiResponse, sender: 'ai' }]);
      } catch (error) {
      
        if (error instanceof AxiosError) {
          console.error('Error fetching from Gemini API:', error.response ? error.response.data : error.message);
          setMessages((prevMessages) => [...prevMessages, { text: 'Error processing message', sender: 'ai' }]);
        } else {
          console.error('Unknown error:', error);
          setMessages((prevMessages) => [...prevMessages, { text: 'Unexpected error occurred', sender: 'ai' }]);
        }
      }
    }
  };


  const handleClearChat = () => {
    setMessages([]); 
  };

  return (
    <View style={styles.container}>
    
      <TouchableOpacity style={styles.clearButton} onPress={handleClearChat}>
        <Ionicons name="trash" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Zelna AI Assistant</Text>

      <ScrollView style={styles.chatContainer} contentContainerStyle={{ paddingBottom: 20 }}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              msg.sender === 'user' ? styles.userMessage : styles.aiMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

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
  messageContainer: {
    marginVertical: 5,
    maxWidth: '70%',
    padding: 12,
    borderRadius: 15,
  },
  userMessage: {
    backgroundColor: '#007AFF', // User messages on the right
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#FFC107', // AI messages on the left
    alignSelf: 'flex-start',
  },
  messageText: {
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