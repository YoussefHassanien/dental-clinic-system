/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOGIN_API: string;
  readonly VITE_REGISTER_API: string;
  readonly VITE_GET_DOCTORS_INFO_API: string;
  readonly VITE_BOOK_APPOINTMENT_API: string;
  readonly VITE_GET_TODAY_APPOINTMENTS_API: string;
  readonly VITE_GET_DOCTORS_NEAREST_APPOINTMENTS_API: string;
  readonly VITE_RECEPTIONIST_BOOK_APPOINTMENT_API: string;
  readonly VITE_GET_USER_INFO_API: string;
  // Add other environment variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
