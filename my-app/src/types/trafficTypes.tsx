export interface TrafficUpdateInterface {
    Message: string;
    RoadNumber: string;
    SeverityText: string;
    CreationTime: string;
    LocationDescriptor: string;
  }

  export interface TrafficState {
    trafficUpdates: TrafficUpdateInterface[];
    fetchTrafficUpdates: () => Promise<void>;
  }