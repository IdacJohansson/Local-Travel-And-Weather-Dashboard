export interface TrafficUpdateInterface {
  MessageCode: string;
  Message: string;
  RoadNumber: string;
  SeverityText: string;
  CreationTime: string;
  LocationDescriptor: string;
}

export interface TrafficState {
  trafficUpdates: TrafficUpdateInterface[];
  fetchTrafficUpdates: () => Promise<void>;
  getSeverityCount: (messageCode: string) => number;
  getSeverityColor: (severity: string) => string;
}
