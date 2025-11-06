// src/context/BleContext.js
import React, { createContext, useContext, useEffect, useMemo } from "react";
import { BleManager } from "react-native-ble-plx";

// 1️⃣ Create the Context
const BleContext = createContext(null);

// 2️⃣ Provider Component
export const BleProvider = ({ children }) => {
  const manager = useMemo(() => new BleManager(), []);

  // Optional: Clean up on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      console.log("Destroying BLE Manager...");
      manager.destroy();
    };
  }, [manager]);

  return (
    <BleContext.Provider value={{ manager }}>{children}</BleContext.Provider>
  );
};

// 3️⃣ Custom Hook to Access Context
export const useBle = () => {
  const context = useContext(BleContext);
  if (!context) {
    throw new Error("useBle must be used within a BleProvider");
  }
  return context;
};
