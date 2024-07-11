// models/ApiResponse.ts

export interface ApiResponse<T> {
  data: T; // 'data' rappresenta il corpo della risposta dell'API
  // Altri campi se necessario, come messaggi di errore, codici di stato, ecc.
}
