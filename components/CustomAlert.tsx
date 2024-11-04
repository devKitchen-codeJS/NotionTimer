import React from 'react';
import { Modal, View, Text, Button, StyleSheet, useWindowDimensions } from 'react-native';

interface CustomAlertProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ visible, message, onClose }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height; // Определение ориентации

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={[styles.overlay, isLandscape ? styles.overlayLandscape : null]}>
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>{message}</Text>
          <Button title="ОК" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  overlayLandscape: {
    flexDirection: 'row', // Пример изменения стиля для горизонтального режима
  },
  alertBox: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  alertText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CustomAlert;