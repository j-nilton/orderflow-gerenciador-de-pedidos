import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthRegisterViewModel } from '../viewmodel/useAuthRegisterViewModel';

export default function RegisterScreen() {
  const { name, setName, email, setEmail, password, setPassword, confirm, setConfirm, showPassword, setShowPassword, loading, error, registerEmail, registerGoogle } = useAuthRegisterViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/logo_OrderFlow.png')} style={styles.logo} />
      <Text style={styles.title}>Criar conta</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome completo"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.warning}>O nome não poderá ser alterado posteriormente.</Text>

        <Text style={[styles.label, { marginTop: 10 }]}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="email@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[styles.label, { marginTop: 10 }]}>Senha</Text>
        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Crie uma senha"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.toggle} onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.toggleText}>{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.label, { marginTop: 10 }]}>Confirmar senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Repita a senha"
          secureTextEntry={!showPassword}
          value={confirm}
          onChangeText={setConfirm}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.primaryButton} onPress={registerEmail} disabled={loading}>
          <Text style={styles.primaryButtonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton} onPress={registerGoogle} disabled={loading}>
          <Text style={styles.googleButtonText}>Cadastrar com Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  logo: { width: 300, height: 300, alignSelf: 'center', resizeMode: 'contain', marginTop: 30 },
  title: { textAlign: 'center', color: '#333', marginTop: -40, marginBottom: 20, fontSize: 18, fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  label: { fontSize: 14, color: '#666' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  passwordRow: { flexDirection: 'row', alignItems: 'center' },
  toggle: { marginLeft: 10, paddingHorizontal: 8, paddingVertical: 8 },
  toggleText: { color: '#007AFF', fontWeight: 'bold' },
  primaryButton: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  primaryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  googleButton: { backgroundColor: '#5856D6', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  googleButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', marginTop: 10, textAlign: 'center' },
  warning: { color: '#FF3B30', fontSize: 12, marginTop: 6 },
});
