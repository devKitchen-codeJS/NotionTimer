import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import CustomAlert from './CustomAlert';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isNotifi, setIsNotifi] = useState(true);

  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [resState, setRes] = useState<number>(0);
  const createAlert = (res: number) => {
    setRes(res);
    setAlertVisible(true);

    const timer = setTimeout(() => {
      setAlertVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (isActive) {
      const id = setInterval(() => {
        setSeconds(prevSeconds => {
          const newSeconds = prevSeconds + 1;
          if (newSeconds % 300 === 0 && isNotifi) {
            console.log(`Прошло ${newSeconds / 60} минут`);
            let res = newSeconds / 60;
            console.log('open Alert');
            createAlert(res);
          }
          return newSeconds;
        });
      }, 1000);

      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [isActive, isNotifi]);

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const secondsLeft = secs % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}:${String(secondsLeft).padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleClear = () => {
    setSeconds(0);
    setIsActive(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const toggleNotification = () => {
    setIsNotifi(prev => !prev);
  };

  return (
    <View style={styles.container}>
       <CustomAlert
          visible={alertVisible}
          message={`Прошло ${resState} минут`}
          onClose={() => setAlertVisible(false)}
        />
      <Text style={styles.timerText}>{formatTime(seconds)}</Text>
      <View style={styles.controlContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleStart}
          disabled={isActive}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleStop}
          disabled={!isActive}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleNotification}>
          <Text style={styles.buttonText}>
            {!isNotifi ? 'Enable Notification' : 'Disable Notification'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {

  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Timer;
