import React, { useEffect, useState } from "react";
import AppleHealthKit, {
  HealthKitPermissions,
  HealthInputOptions,
  HealthUnit,
} from "react-native-health";
import { Platform } from "react-native";

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.FlightsClimbed,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    ],
    write: [],
  },
};

const useHealthData = (date: Date) => {
  const [hasPermissions, setHasPermission] = useState(false);
  const [steps, setSteps] = useState(0);
  const [flights, setFlights] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (Platform.OS !== "ios") {
      return;
    }
    AppleHealthKit.isAvailable((err, isAvaliable) => {
      if (err) {
        console.log("Error!");
        return;
      }
      if (!isAvaliable) {
        console.log("Apple healthkit is unavaliable");
        return;
      }
      AppleHealthKit.initHealthKit(permissions, (err) => {
        if (err) {
          console.log("Error with permissions");
          return;
        }
        setHasPermission(true);
      });
    });
  }, []);
  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (err) => {
      if (err) {
        console.log("Error with permissions");
        return;
      }
      setHasPermission(true);
    });
  }, []);

  useEffect(() => {
    if (!hasPermissions) {
      return;
    }
    const options: HealthInputOptions = {
      date: new Date().toISOString(),
      includeManuallyAdded: false,
      unit: HealthUnit.meter,
    };
    AppleHealthKit.getStepCount(options, (err, result) => {
      if (err) {
        console.log("Error with getting the step results");
        return;
      }
      console.log(result.value);
      setSteps(result.value);
    });

    AppleHealthKit.getFlightsClimbed(options, (err, result) => {
      if (err) {
        console.log("Error with getting the flights climbed results");
        return;
      }
      console.log(result.value);
      setFlights(result.value);
    });
    AppleHealthKit.getDistanceWalkingRunning(options, (err, result) => {
      if (err) {
        console.log("Error with getting the distance results");
        return;
      }
      console.log(result.value);
      setDistance(result.value);
    });
  }, [hasPermissions]);

  return {
    steps,
    flights,
    distance,
  };
};

export default useHealthData;
