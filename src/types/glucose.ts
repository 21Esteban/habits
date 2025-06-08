export interface GlucoseData {
  timestamp: string;
  value: number;
  // Agrega otros campos si son necesarios según la respuesta del API
}

export interface GlucoseResponse {
  data: GlucoseData[];
  // Agrega otros campos si son necesarios según la respuesta del API
}

export interface GlucoseRequest {
  date: string;
} 