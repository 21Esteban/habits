import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Form from '../../components/auth/Form';
import Header from '../../components/auth/Header';
import BoxInfo from '../../components/common/BoxInfo';

export default function LoginScreen(): React.JSX.Element {
  const {top, bottom} = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          paddingTop: top,
          paddingBottom: bottom,
        },
        styles.safeArea,
      ]}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Header />
        </View>
        <View style={styles.formContainer}>
          <Form />
        </View>
        <BoxInfo
          title="Credenciales de Prueba"
          subTitle="Email: postulante@prueba.com"
          subTitle2='Contraseña: "Aa123456"'
          variant="info"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eff6ff',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  headerContainer: {
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },

  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
});
