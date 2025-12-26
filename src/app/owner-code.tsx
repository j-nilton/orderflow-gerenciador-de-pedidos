import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert, Pressable, Animated, Platform } from 'react-native';
import { useOwnerCodeViewModel } from '../viewmodel/useOwnerCodeViewModel';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';

export default function OwnerCodeScreen() {
  const { formattedActive, formattedPending, confirmed, loading, feedback, generate, confirm, reset, canGenerate } = useOwnerCodeViewModel();
  const [hover, setHover] = useState(false);
  const flash = useRef(new Animated.Value(0)).current;
  const tick = useRef(new Animated.Value(0)).current;
  const copyDigits = async () => {
    const text = formattedPending || formattedActive || '';
    const digits = text.replace(/\D/g, '');
    try {
      await Clipboard.setStringAsync(digits);
      Animated.sequence([
        Animated.timing(flash, { toValue: 1, duration: 120, useNativeDriver: true }),
        Animated.timing(flash, { toValue: 0, duration: 380, useNativeDriver: true }),
      ]).start();
      Animated.sequence([
        Animated.timing(tick, { toValue: 1, duration: 120, useNativeDriver: true }),
        Animated.timing(tick, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]).start();
      Alert.alert('Sucesso', 'Código copiado');
    } catch {
      try {
        if (typeof navigator !== 'undefined' && (navigator as any).clipboard?.writeText) {
          await (navigator as any).clipboard.writeText(digits);
          Animated.sequence([
            Animated.timing(flash, { toValue: 1, duration: 120, useNativeDriver: true }),
            Animated.timing(flash, { toValue: 0, duration: 380, useNativeDriver: true }),
          ]).start();
          Animated.sequence([
            Animated.timing(tick, { toValue: 1, duration: 120, useNativeDriver: true }),
            Animated.timing(tick, { toValue: 0, duration: 600, useNativeDriver: true }),
          ]).start();
          Alert.alert('Sucesso', 'Código copiado');
        } else {
          Alert.alert('Aviso', 'Cópia não suportada neste dispositivo');
        }
      } catch {
        Alert.alert('Erro', 'Falha ao copiar o código');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/logo_OrderFlow.png')} style={styles.logo} />
      <Text style={styles.title}>Gerenciamento de Código de Acesso</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Código de acesso</Text>
        <View style={styles.codeWrapper}>
          <Animated.View style={[styles.flashOverlay, { opacity: flash }]} />
          <Pressable
            style={({ pressed }) => [
              styles.codePressable,
              pressed ? styles.codePressed : null,
            ]}
            disabled={!formattedPending && !formattedActive}
            onHoverIn={() => setHover(true)}
            onHoverOut={() => setHover(false)}
            onPress={copyDigits}
          >
            <Text style={[styles.code, confirmed ? styles.codeConfirmed : styles.codePending]}>
              {formattedPending || formattedActive || 'Nenhum código gerado'}
            </Text>
          </Pressable>
          {(formattedPending || formattedActive) ? (
            <View style={styles.copyRowWrapper}>
              <Pressable
                style={({ pressed }) => [
                  styles.copyRow,
                  pressed ? styles.copyRowPressed : null,
                ]}
                onHoverIn={() => setHover(true)}
                onHoverOut={() => setHover(false)}
                onPress={copyDigits}
                accessibilityRole="button"
                accessibilityLabel="Copiar código"
              >
                <Text style={[styles.copyRowIcon, hover ? styles.copyRowIconHover : null]}>⧉</Text>
                <Text style={[styles.copyRowText, hover ? styles.copyRowTextHover : null]}>Copiar código</Text>
                <Animated.Text
                  style={[
                    styles.copyRowCheck,
                    {
                      opacity: tick,
                      transform: [
                        {
                          scale: tick.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }),
                        },
                      ],
                    },
                  ]}
                >
                  ✓
                </Animated.Text>
              </Pressable>
            </View>
          ) : null}
        </View>
        {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

        <TouchableOpacity style={[styles.primary, !canGenerate ? styles.disabled : null]} onPress={generate} disabled={loading || !canGenerate}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryText}>Gerar código de acesso</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.secondary, confirmed ? styles.disabled : null]} onPress={confirm} disabled={loading || confirmed || !formattedPending}>
          <Text style={styles.secondaryText}>{confirmed ? 'Código já confirmado' : 'Confirmar código'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.danger}
          onPress={() => Alert.alert('Redefinir código', 'Deseja liberar a geração de um novo código?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Redefinir', style: 'destructive', onPress: reset },
          ])}
          disabled={loading}
        >
          <Text style={styles.dangerText}>Redefinir código de acesso</Text>
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
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#444' },
  codeWrapper: { alignItems: 'center', borderWidth: 1, borderRadius: 15, justifyContent: 'center', position: 'relative', marginVertical: 8 },
  flashOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,122,255,0.12)', borderRadius: 10 },
  code: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 8, letterSpacing: 2 },
  codePressable: { cursor: 'pointer' },
  codePressed: { opacity: 0.8 },
  codeConfirmed: { color: '#34C759' },
  codePending: { color: '#333' },
  copyRowWrapper: { marginTop: -10, marginBottom: 2, alignItems: 'center' },
  copyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 as any, paddingVertical: 6, paddingHorizontal: 8, borderRadius: 8, cursor: 'pointer' },
  copyRowPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  copyRowIcon: { fontSize: 16, color: '#666', marginRight: 6 },
  copyRowIconHover: { color: '#5856D6' },
  copyRowText: { fontSize: 14, color: '#666' },
  copyRowTextHover: { color: '#5856D6', textDecorationLine: 'underline' },
  copyRowCheck: { marginLeft: 8, fontSize: 16, color: '#34C759' },
  feedback: { textAlign: 'center', marginTop: 15, color: '#666', marginBottom: 10 },
  primary: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  primaryText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  secondary: { backgroundColor: '#5856D6', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  secondaryText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  danger: { backgroundColor: '#FF3B30', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  dangerText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  disabled: { opacity: 0.6 },
});
