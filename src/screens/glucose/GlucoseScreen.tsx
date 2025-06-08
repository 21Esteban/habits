import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import Header from '../../components/auth/Header';
import LogoutButton from '../../components/common/LogoutButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useState, useEffect} from 'react';
import HourRangeSelector from '../../components/glucose/HourRangeSelector';
import {useGetGlucoseDataQuery} from '../../services/glucose/glucose';

export default function GlucoseScreen(): React.JSX.Element {
  const {top, bottom} = useSafeAreaInsets();

  const [hourRange, setHourRange] = useState(6);
  const {data, error, isLoading, isSuccess, isError} = useGetGlucoseDataQuery({
    userId: '6841a2cd25712c88ce9b2066',
    date: '2025-06-05',
  });

  useEffect(() => {
    console.log('🔍 Glucose Query State:', {
      isLoading,
      isSuccess,
      isError,
      data: data ? 'Data received' : 'No data',
      error: error ? 'Error present' : 'No error',
    });
    
    if (data) {
      console.log('✅ Glucose Data:', JSON.stringify(data, null, 2));
    }
    
    if (error) {
      console.error('❌ Glucose Error:', JSON.stringify(error, null, 2));
    }
  }, [data, error, isLoading, isSuccess, isError]);

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
          <Header title="Glucosa" subtitle="Visualización de datos" />
        </View>
        <LogoutButton />
        <HourRangeSelector value={hourRange} onChange={setHourRange} />
        
        {/* Debug Info */}
        <View style={styles.debugContainer}>
          <Text style={styles.debugTitle}>🔍 Estado de la API:</Text>
          <Text style={styles.debugText}>Loading: {isLoading ? 'Sí' : 'No'}</Text>
          <Text style={styles.debugText}>Success: {isSuccess ? 'Sí' : 'No'}</Text>
          <Text style={styles.debugText}>Error: {isError ? 'Sí' : 'No'}</Text>
          <Text style={styles.debugText}>Data: {data ? 'Recibida' : 'No recibida'}</Text>
        </View>
        
        <View style={styles.content}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text style={styles.errorText}>
              {error && 'data' in error ? String(error.data) : 'Error desconocido'}
            </Text>
          ) : data && <Text>{JSON.stringify(data, null, 2)}</Text>}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  debugContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  debugText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#666',
  },
});
