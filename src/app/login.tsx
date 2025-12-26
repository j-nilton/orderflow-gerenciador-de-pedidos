import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useLoginViewModel } from '../viewmodel/useLoginViewModel';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const { email, setEmail, loading, error, login } = useLoginViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/logo_OrderFlow.png')} style={styles.logo} />
      <Text style={styles.welcome}>Informe seu nome para acessar</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do garçom"
        value={email}
        onChangeText={setEmail}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={login} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.footer}>© Todos os direitos reservados</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  logo: { width: 300, height: 300, marginBottom: -40, marginTop: 30, alignSelf: 'center', resizeMode: 'contain' },
  welcome: { textAlign: 'center', color: '#333', marginBottom: 20, fontSize: 16 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', marginBottom: 20, textAlign: 'center' },
  footer: { position: 'absolute', bottom: 12, left: 0, right: 0, textAlign: 'center', color: '#666', fontSize: 12 },
});
