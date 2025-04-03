import { create } from "zustand";
import { fetchTrafficUpdatesData } from "../services/apiService";
import { TrafficUpdateInterface, TrafficState } from "../types/trafficTypes";
import { useLocationStore } from "./useLocationStore";

export const useTrafficStore = create<TrafficState>((set, get) => {
  const fetchTrafficUpdates = async () => {
    try {
      const { location } = useLocationStore.getState();

      if (!location) {
        console.error("Location is not set. Cannot fetch traffic updates.");
        return;
      }

      const { latitude, longitude } = location;

      const data = await fetchTrafficUpdatesData(latitude, longitude);
      const situations = data.RESPONSE.RESULT[0]?.Situation || [];

      const extractedUpdates: TrafficUpdateInterface[] = situations
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
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Mycket stor påverkan":
        return "text-red-600";
      case "Stor påverkan":
        return "text-orange-600";
      case "Liten påverkan":
        return "text-yellow-500";
      case "Ingen påverkan":
        return "text-green-600";
      default:
        return "text-white";
    }
  };

  const getSeverityCount = (severtyCount: string) => {
    return get().trafficUpdates.filter(
      (update) => update.SeverityText === severtyCount
    ).length;
  };

  return {
    trafficUpdates: [],
    fetchTrafficUpdates,
    getSeverityColor,
    getSeverityCount,
  };
});
