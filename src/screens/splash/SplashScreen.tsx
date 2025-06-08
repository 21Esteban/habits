import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View, Image, Animated} from 'react-native';
import {colors} from '../../theme/colors';

export default function SplashScreen(): React.JSX.Element {
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const scaleAnim = useMemo(() => new Animated.Value(0.8), []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <Image
          source={{
            uri: 'https://media.licdn.com/dms/image/v2/D4E0BAQFcF9Qz_epadg/company-logo_100_100/company-logo_100_100/0/1689969495260/habits_ai_logo?e=1754524800&v=beta&t=72EQwx3XPzpVPnXe7SjjmET7THTqcdOqwcLSOqxIN_M',
          }}
          style={styles.logo}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.info.background,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
});
