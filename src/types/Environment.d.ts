export interface EnvironmentRoot {
    outside: Outside | null
    inside: Inside
  }
  
  export interface Outside {
    pressure: string
    observation_time: string
    max_temperature: string
    min_temperature: string
    humidity: string
    temperature: string
    dew_point: string
    station: string
    avg_temperature: string
    precipitation_last_hour: string
    precipitation_last_10_minutes: string
    wind_speed: string
  }
  
  export interface Inside {
    altitude: number
    gas: number
    pressure: number
    temperature: number
    humidity: number
  }
  