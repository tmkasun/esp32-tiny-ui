import { useQuery } from "@tanstack/react-query";
import { BASE_PATH } from "./System";
import { EnvironmentRoot } from "../types/Environment";
import BaseLayout from "./components/BaseLayout";

export const Home = () => {
  const {
    isLoading: isLoadingEnvironmentData,
    data: environmentData,
    error: environmentDataError,
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
  return (
    <BaseLayout>
      <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
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
                    Temperature: {environmentData?.outside?.temperature}
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
                    Humidity: {environmentData?.outside?.humidity}
                  </div>
                  <div>
                    Precipitation:{" "}
                    {environmentData?.outside?.precipitation_last_hour}
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
                      Temperature: {environmentData?.inside?.temperature}°C
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
                    Humidity: {environmentData?.inside?.humidity}%
                  </div>
                  <div>Gas: {environmentData?.inside?.gas}</div>
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
