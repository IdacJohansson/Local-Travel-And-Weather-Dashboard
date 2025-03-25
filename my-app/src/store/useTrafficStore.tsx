import { create } from "zustand";
import { fetchTrafficUpdatesData } from "../services/apiService";
import { useLocationStore } from "./useLocationStore";

export interface TrafficUpdate {
  MessageCode: string;
  Message: string;
  SeverityText: string;
  CreationTime: string;
  LocationDescriptor: string;
}

export interface TrafficState {
  trafficUpdates: TrafficUpdate[];
  fetchTrafficUpdates: () => Promise<void>;
  getMessageCode: (messageCode: string) => number;
  getSeverityColor: (severity: string) => string;
}

export const useTrafficStore = create<TrafficState>((set, get) => {
  const fetchTrafficUpdates = async () => {
    try {
      const { location } = useLocationStore.getState();
      // console.log("Location in TrafficStore:", location);

      if (!location) {
        console.error("Location is not set. Cannot fetch traffic updates.");
        return;
      }

      const { latitude, longitude } = location;
      // console.log("Fetching traffic updates for:", latitude, longitude);

      const data = await fetchTrafficUpdatesData(latitude, longitude);
      const situations = data.RESPONSE.RESULT[0]?.Situation || [];

      const extractedUpdates: TrafficUpdate[] = situations
        .flatMap((situation: any) =>
          situation.Deviation.map((deviation: any) => ({
            MessageCode: deviation.MessageCode,
            Message: deviation.Message,
            SeverityText: deviation.SeverityText,
            CreationTime: deviation.CreationTime,
            LocationDescriptor: deviation.LocationDescriptor,
          }))
        )
        .slice(0, 3);

      set({ trafficUpdates: extractedUpdates });

      // console.log("Fetched traffic updates:", extractedUpdates);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Stor påverkan":
        return "text-red-600";
      case "Liten påverkan":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  const getMessageCode = (messageCode: string) => {
    return get().trafficUpdates.filter(
      (update) => update.MessageCode === messageCode
    ).length;
  };

  return {
    trafficUpdates: [],
    fetchTrafficUpdates,
    getSeverityColor,
    getMessageCode,
  };
});