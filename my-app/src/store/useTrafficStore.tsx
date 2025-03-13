import { create } from "zustand";
import { fetchTrafficUpdatesData } from "../services/apiService";
import { TrafficState, TrafficUpdateInterface } from "../types/trafficTypes";

export const useTrafficStore = create<TrafficState>((set) => ({
  trafficUpdates: [],
  fetchTrafficUpdates: async () => {
    try {
      const data = await fetchTrafficUpdatesData();
      const situations = data.RESPONSE.RESULT[0]?.Situation || [];

      const extractNestedData: TrafficUpdateInterface[] = situations.flatMap(
        (situation: any) =>
          situation.Deviation.map((deviation: any) => ({
            Message: deviation.Message,
            RoadNumber: deviation.RoadNumber,
            SeverityText: deviation.SeverityText,
            CreationTime: deviation.CreationTime,
            LocationDescriptor: deviation.LocationDescriptor,
          }))
      );

      set({ trafficUpdates: extractNestedData });

      console.log(extractNestedData);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  },
}));
