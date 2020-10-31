export interface Action {
  type: string;
  data?: any;
}

export interface BuildingSite {
  id: number;
  address: string;
  lat: number;
  lon: number;
  title: string;
  image: any;
}

export interface Profile {
  firstName: string;
  lastName: string;
  patronymic: string;
  birthday?: Date;
  specialty: string;
}

export interface SiteEventRequest {
  event_type: string;
  created_at: string;
  data: { 
    worker_id?: number, 
    site_id?: number 
  };
}

export interface IncidentRequest {
  event_type: string;
  created_at: string;
  data: {
    message: string;
  }
}