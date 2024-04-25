import React, { useEffect, useState } from "react";
import AppleHealthKit, {
  HealthKitPermissions,
  HealthInputOptions,
  HealthUnit,
} from "react-native-health";
import {
  initialize,
  requestPermission,
  readRecords,
} from "react-native-health-connect";
import { Platform } from "react-native";
import { TimeRangeFilter } from "react-native-health-connect/lib/typescript/types/base.types";

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
  //----iOS
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

  //Android----------------------
  const readSampleData = async () => {
    // initialize the client
    const isInitialized = await initialize();
    if (!isInitialized) {
      return;
    }
    // request permissions
    await requestPermission([
      { accessType: "read", recordType: "Steps" },
      { accessType: "read", recordType: "FloorsClimbed" },
      { accessType: "read", recordType: "Distance" },
    ]);

    const timeRangeFilter: TimeRangeFilter = {
      operator: "between",
      startTime: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
      endTime: new Date(date.setHours(23, 59, 59, 999)).toISOString(),
    };
    //steps
    const steps = await readRecords("Steps", { timeRangeFilter });
    const totalSteps = steps.reduce((sum, current) => sum + current.count, 0);
    setSteps(totalSteps);
    //distance
    const distance = await readRecords("Distance", { timeRangeFilter });
    const totalDistance = distance.reduce(
      (sum, current) => sum + current.distance.inMeters,
      0
    );
    setDistance(totalDistance);
    //floors climbed
    const floors = await readRecords("FloorsClimbed", { timeRangeFilter });
    console.log(floors);
    const totalFloors = floors.reduce(
      (sum, current) => sum + current.floors,
      0
    );
    setFlights(totalFloors);
  };

  useEffect(() => {
    if (Platform.OS !== "android") {
      return;
    }
    readSampleData();
  }, []);
  return {
    steps,
    flights,
    distance,
  };
};

export default useHealthData;
