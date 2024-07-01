import React, {forwardRef, useRef, useState, useImperativeHandle} from 'react';
import {View, Animated, Text, StatusBar, StyleSheet, Dimensions} from 'react-native';
import Error from './src/assets/svgs/Error';
import Success from './src/assets/svgs/Success';
const Toast = forwardRef((props, ref) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [modalShown, setModalShown] = useState(false);
    const [message, setMessage] = useState('Success!');
    const [toastColor, setToastColor] = useState('green');
    const [textColor, setTextColor] = useState('black');
    const [type, setType] = useState();
    const [height, setHeight] = useState(0);

    useImperativeHandle(ref, () => ({

      }));

    const closeToast = () => {
        setTimeout(() => {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 350,
                useNativeDriver: false,
            }).start(() => {
                StatusBar.setBarStyle('default');
                setModalShown(false);
            });
        }, 2000);
    };

    const callToast = (message, type) => {
        if (modalShown) return;
        setToastType(message, type);
        setModalShown(true);
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 350,
            useNativeDriver: false,
        }).start(closeToast);
    };

    let animation = animatedValue.interpolate({
        inputRange: [0, 0.3, 1],
        outputRange: [-100, -10, 0],
    });

    useImperativeHandle(ref, () => ({
        success(message) {
            setType('success')
            callToast(message, 'success');
            StatusBar.setBarStyle('dark-content');
        },
        error(message) {
            setType('error')
            callToast(message, 'error');
            StatusBar.setBarStyle('light-content');
        },
        Height(height) {
            setHeight(height);
          },
    }));

    const setToastType = (message,type ) => {
        let color;
        let textColorValue;
        if (type == 'error') {
            color = '#D2424D';
            textColorValue = 'white';
        }
        if (type == 'success') {
            color = 'green';
            textColorValue = 'white';
        }
        setMessage(message);
        setToastColor(color);
        setTextColor(textColorValue);
    };

    return modalShown ? (
        <Animated.View style={[styles.container, {backgroundColor: toastColor,marginTop: -StatusBar.currentHeight - height, transform: [{translateY: animation}]}]}>
        <View style={{flexDirection:"row"}}>
                { type==='error' ?
                <Error/> : <Success/>
                }
                <View style={styles.row}>
                <Text style={[styles.message, {color: textColor,fontSize: 20}]}>{type==='error' ? 'Error!' : 'Success'}</Text>
                <Text style={[styles.message, {color: textColor,fontSize: 14}]}>{message}</Text>
            </View>
            </View>
        </Animated.View>
    ) : null;
});

export const styles = StyleSheet.create({
    container: {
        position: "absolute",
    top: 0,
    minHeight: 80,
    width: '100%',
    zIndex: 1000,
    justifyContent: 'flex-end',
    padding: 14,
    elevation: 100,
    
    },
    message: {
        color: 'black',
        fontWeight: 'bold',
        marginHorizontal: 10,
        lineHeight: 18,
    },
    row: {
        flexDirection: "column",
    },
});

export default Toast;