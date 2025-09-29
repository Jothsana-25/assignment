import { LegacyWeatherApi } from './LegacyWeatherApi';

export interface Weather {
    city: string;
    temperatureCelsius: number;
}

export class WeatherAdapter {
    private legacy = new LegacyWeatherApi();

    async fetch(city: string): Promise<Weather> {
        if (!city) throw new Error('city required');
        const raw = await this.legacy.getWeather(city);
        // adapt: legacy returns tenths of Kelvin — convert to Celsius (made-up)
        const tempValue = raw?.data?.t;
        if (typeof tempValue !== 'number') throw new Error('invalid legacy response');
        const temperatureCelsius = Math.round((tempValue/10) - 273.15);
        return { city, temperatureCelsius };
    }
}
