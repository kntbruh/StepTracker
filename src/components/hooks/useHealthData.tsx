import React, { useEffect, useState } from "react";
import AppleHealthKit, {
  HealthKitPermissions,
  HealthInputOptions,
  HealthUnit,
} from "react-native-health";

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
