import { useQuery } from "@tanstack/react-query";
import { BASE_PATH } from "./System";
import { EnvironmentRoot } from "../types/Environment";
import BaseLayout from "./components/BaseLayout";
import SkeletonAnimation from "./components/SkeletonAnimation";

export const Home = () => {
  const {
    isLoading: isLoadingEnvironmentData,
    data: environmentData,
    error: environmentDataError,
    isFetching: isEnvironmentDataFetching,
    isPending: isEnvironmentDataPrefetch,
    refetch,
  } = useQuery({
    queryKey: ["disk-usage"],
    queryFn: async () => {
      const response = await fetch(`${BASE_PATH}/environment`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<EnvironmentRoot>;
    },
  });
  const outsideHumidity = parseFloat(
    environmentData?.outside?.humidity.split(" ")[0] || ""
  );
  const outsideTemperature = parseFloat(
    environmentData?.outside?.temperature.split(" ")[0] || ""
  );
  const isPending =
    isLoadingEnvironmentData ||
    isEnvironmentDataFetching ||
    isEnvironmentDataPrefetch;
  return (
    <BaseLayout>
      <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
        <button
          onClick={() => refetch()}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          {isPending ? "Refreshing..." : "Refresh"}
        </button>
        <h2 className="text-xl font-bold mb-4">Environment</h2>
        {isLoadingEnvironmentData ? (
          <div>Loading...</div>
        ) : environmentDataError ? (
          <div className="text-red-500">
            Error: {environmentDataError.message}
          </div>
        ) : (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Weather Comparison</h3>
            <div className="grid grid-rows-2 gap-4">
              <div>
                <h4 className="font-medium">Outside</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <div className="relative w-4 h-24 bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className="absolute bottom-0 w-full bg-blue-500"
                        style={{
                          height: `${outsideTemperature}%`,
                          backgroundColor:
                            outsideTemperature > 20 ? "green" : "red",
                        }}
                      ></div>
                    </div>
                    Temperature:{" "}
                    <SkeletonAnimation isLoading={isPending}>
                      {environmentData?.outside?.temperature}
                    </SkeletonAnimation>
                  </div>
                  <div>
                    <div className="relative w-4 h-24 bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className="absolute bottom-0 w-full"
                        style={{
                          height: `${outsideHumidity}%`,
                          backgroundColor: environmentData?.inside
                            ? outsideHumidity > 70
                              ? "green"
                              : outsideHumidity > 40
                              ? "yellow"
                              : "red"
                            : "black",
                        }}
                      ></div>
                    </div>
                    Humidity:{" "}
                    <SkeletonAnimation isLoading={isPending}>
                      {environmentData?.outside?.humidity}
                    </SkeletonAnimation>
                  </div>
                  <div>
                    Precipitation:{" "}
                    <SkeletonAnimation isLoading={isPending}>
                      {environmentData?.outside?.humidity}
                    </SkeletonAnimation>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium">Inside</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <div className="relative w-4 h-24 bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className="absolute bottom-0 w-full bg-green-500"
                        style={{
                          height: `${environmentData?.inside?.temperature}%`,
                          backgroundColor: environmentData
                            ? environmentData?.inside?.temperature > 20
                              ? "green"
                              : "blue"
                            : "black",
                        }}
                      ></div>
                    </div>
                    <div>
                      Temperature:{" "}
                      <SkeletonAnimation isLoading={isPending}>
                        {environmentData?.inside?.temperature}°C
                      </SkeletonAnimation>
                    </div>
                  </div>
                  <div>
                    <div className="relative w-4 h-24 bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className="absolute bottom-0 w-full"
                        style={{
                          height: `${environmentData?.inside?.humidity}%`,
                          backgroundColor: environmentData?.inside
                            ? environmentData?.inside?.humidity > 70
                              ? "green"
                              : environmentData?.inside?.humidity > 40
                              ? "yellow"
                              : "red"
                            : "black",
                        }}
                      ></div>
                    </div>
                    Humidity:{" "}
                    <SkeletonAnimation isLoading={isPending}>
                      {environmentData?.inside?.humidity}%
                    </SkeletonAnimation>
                  </div>
                  <div>
                    Gas:{" "}
                    <SkeletonAnimation isLoading={isPending}>
                      {environmentData?.inside?.gas}
                    </SkeletonAnimation>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseLayout>
  );
};

export default Home;
