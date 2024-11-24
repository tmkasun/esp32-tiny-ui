import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import BaseLayout from "./components/BaseLayout";
export interface IFile {
  name: string;
  type: "DIR" | "FILE";
  size: string;
}
export const BASE_PATH = "https://192.168.2.45";
function System() {
  const {
    isLoading: isLoadingDiskUsage,
    data: diskUsage,
    error: diskUsageError,
  } = useQuery({
    queryKey: ["disk-usage"],
    queryFn: async () => {
      const response = await fetch(`${BASE_PATH}/system/disk`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  // Memory usage data
  const {
    isLoading: isLoadingMemoryUsage,
    data: memoryUsage,
    error: memoryUsageError,
  } = useQuery({
    queryKey: ["memory-usage"],
    queryFn: async () => {
      const response = await fetch(`${BASE_PATH}/system/memory`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { memory } = await response.json();
      return memory;
    },
  });
  return (
    <BaseLayout>
      <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Disk Usage</h2>
        {isLoadingDiskUsage ? (
          <div>Loading...</div>
        ) : diskUsageError ? (
          <div className="text-red-500">Error: {diskUsageError.message}</div>
        ) : (
          <div>
            <div>Percentage: {diskUsage?.percent}%</div>
            <div>Used: {diskUsage?.used} KB</div>
            <div>Free: {diskUsage?.free} KB</div>
            <div>Total: {diskUsage?.total} MB</div>
          </div>
        )}
      </div>
      <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md mt-4">
        <h2 className="text-xl font-bold mb-4">Memory Usage</h2>
        {isLoadingMemoryUsage ? (
          <div>Loading...</div>
        ) : memoryUsageError ? (
          <div className="text-red-500">Error: {memoryUsageError.message}</div>
        ) : (
          <div>
            <div>
              Used: {memoryUsage?.allocated} {memoryUsage.unit}
            </div>
            <div>
              Free: {memoryUsage?.free} {memoryUsage.unit}
            </div>
            <div>
              Total: {memoryUsage?.total} {memoryUsage.unit}
            </div>
          </div>
        )}
      </div>
    </BaseLayout>
  );
}

export default System;
