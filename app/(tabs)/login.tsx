import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

const usersDB: { [key: string]: string } = {};

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [forgotUsername, setForgotUsername] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }
    if (usersDB[username] && usersDB[username] === password) {
      Alert.alert('Success', 'Logged in successfully');
      router.push('/');
    } else {
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  const handleRegister = () => {
    if (!registerUsername || !registerPassword) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }
    if (usersDB[registerUsername]) {
      Alert.alert('Error', 'User already exists');
      return;
    }
    usersDB[registerUsername] = registerPassword;
    Alert.alert('Success', 'Registered successfully');
    setIsRegister(false);
    setRegisterUsername('');
    setRegisterPassword('');
  };

  const handleForgotPassword = () => {
    if (!forgotUsername) {
      Alert.alert('Error', 'Please enter your username or email');
      return;
    }
    if (usersDB[forgotUsername]) {
      Alert.alert('Password Reset', `Password reset link sent to ${forgotUsername} (simulated)`);
      setIsForgotPassword(false);
      setForgotUsername('');
    } else {
      Alert.alert('Error', 'User not found');
    }
  };

  if (isForgotPassword) {
    return (
      <View style={[styles.container, styles.darkBackground]}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
          <Text style={styles.logoText}>NOTED</Text>
        </View>
        <Text style={styles.title}>Forgot Password</Text>
        <View style={styles.inputWrapper}>
          <Icon name="user" size={20} color="#7a6f5a" style={styles.icon} />
          <TextInput
            style={[styles.input, styles.inputWithIcon]}
            placeholder="Username or Email"
            placeholderTextColor="#7a6f5a"
            value={forgotUsername}
            onChangeText={setForgotUsername}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsForgotPassword(false)} style={styles.linkContainer}>
          <Text style={styles.linkText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isRegister) {
    return (
      <View style={[styles.container, styles.darkBackground]}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
          <Text style={styles.logoText}>NOTED</Text>
        </View>
        <Text style={styles.title}>Register</Text>
        <View style={styles.inputWrapper}>
          <Icon name="user" size={20} color="#7a6f5a" style={styles.icon} />
          <TextInput
            style={[styles.input, styles.inputWithIcon]}
            placeholder="Username or Email"
            placeholderTextColor="#7a6f5a"
            value={registerUsername}
            onChangeText={setRegisterUsername}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="#7a6f5a" style={styles.icon} />
          <TextInput
            style={[styles.input, styles.inputWithIcon]}
            placeholder="Password"
            placeholderTextColor="#7a6f5a"
            value={registerPassword}
            onChangeText={setRegisterPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsRegister(false)} style={styles.linkContainer}>
          <Text style={styles.linkText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.darkBackground]}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
        <Text style={styles.logoText}>NOTED</Text>
      </View>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputWrapper}>
        <Icon name="user" size={20} color="#7a6f5a" style={styles.icon} />
        <TextInput
          style={[styles.input, styles.inputWithIcon]}
          placeholder="Username"
          placeholderTextColor="#7a6f5a"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Icon name="lock" size={20} color="#7a6f5a" style={styles.icon} />
        <TextInput
          style={[styles.input, styles.inputWithIcon]}
          placeholder="Password"
          placeholderTextColor="#7a6f5a"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsForgotPassword(true)} style={styles.linkContainer}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsRegister(true)} style={styles.linkContainer}>
        <Text style={styles.linkText}>
          Don't have an account yet? <Text style={styles.signUpText}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  darkBackground: {
    backgroundColor: '#2f2f2f',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    backgroundColor: '#3a3a3a',
    width: 120,
    height: 120,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  logoText: {
    color: '#d1c7b7',
    fontWeight: 'bold',
    fontSize: 18,
  },
  title: {
    color: '#d1c7b7',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1c7b7',
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 40,
  },
  icon: {
    position: 'absolute',
    left: 12,
  },
  input: {
    flex: 1,
    height: 45,
    color: '#2f2f2f',
    fontSize: 16,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  button: {
    backgroundColor: '#d1c7b7',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#2f2f2f',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  linkContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    color: '#d1c7b7',
    fontSize: 14,
  },
  signUpText: {
    fontWeight: 'bold',
  },
});

export default LoginScreen;
