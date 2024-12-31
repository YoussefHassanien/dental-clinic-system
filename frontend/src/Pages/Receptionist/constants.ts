export interface Appointment {
  doctor: {
    firstname: string;
    lastname: string;
  };
  patient: {
    firstname: string;
    lastname: string;
  };
  service: {
    name: string;
  };
  startTime: string;
  paid: boolean;
}
