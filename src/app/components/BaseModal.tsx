import React, { useEffect, useRef, useState } from 'react';
import { Modal, View, Animated, Easing, TouchableWithoutFeedback, AccessibilityInfo } from 'react-native';

type Props = {
  visible: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
};

export function BaseModal({ visible, onRequestClose, children }: Props) {
  const [display, setDisplay] = useState(visible);
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion).catch(() => setReduceMotion(false));
  }, []);

  useEffect(() => {
    if (visible) {
      setDisplay(true);
      if (reduceMotion) {
        opacity.setValue(1);
        scale.setValue(1);
        return;
      }
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]).start();
    } else {
      if (reduceMotion) {
        setDisplay(false);
        return;
      }
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.95, duration: 200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]).start(() => setDisplay(false));
    }
  }, [visible, reduceMotion, opacity, scale]);

  if (!display) return null;

  return (
    <Modal transparent visible={display} onRequestClose={onRequestClose} animationType="fade">
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.25)',
            justifyContent: 'center',
            alignItems: 'center',
            opacity,
          }}
        />
      </TouchableWithoutFeedback>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View
          style={{
            width: '84%',
            maxHeight: '70%',
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 20,
            transform: [{ scale }],
            opacity,
          }}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}
