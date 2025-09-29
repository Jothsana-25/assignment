// Simulates a legacy API that returns data in an awkward format
export class LegacyWeatherApi {
    async getWeather(city: string): Promise<{ data: { t: number } }> {
        // returns temperature in tenths of degree
        return { data: { t: Math.round((Math.random()*300)+200) } }; // some integer
    }
}
