import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useOwnerLoginViewModel } from '../viewmodel/useOwnerLoginViewModel';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginOwnerScreen() {
  const { name, setName, loading, error, login } = useOwnerLoginViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/logo_OrderFlow.png')} style={styles.logo} />
      <Text style={styles.welcome}>Login do Dono da organização</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        value={name}
        onChangeText={setName}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={login} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  logo: { width: 300, height: 300, marginTop: 30, alignSelf: 'center', resizeMode: 'contain' },
  welcome: { textAlign: 'center', color: '#333', marginTop: -40, marginBottom: 20, fontSize: 16 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', marginBottom: 20, textAlign: 'center' },
});
