import React, { useEffect, useState } from "react";
import { fetchWeather } from "../api/wheater";
import { useDebounce } from "../hooks/debounce";

export function WeatherApp() {
	const [cityInput, setCityIput] = useState("");
	const [weatherData, setWeatherData] = useState<{
		city: string;
		temp: number;
	} | null>(null);

	// buat loading
	const [loading, setLoading] = useState(false);

	const debounceCity = useDebounce(cityInput, 1000);

	useEffect(() => {
		if (debounceCity) {
			setLoading(true);
			fetchWeather(debounceCity)
				.then((data) => setWeatherData(data))
				.finally(() => setLoading(false));
		}
	}, [debounceCity]);

	const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCityIput(e.target.value);
	};
	return (
		<>
			<h1>Weather App</h1>
			<input
				type="text"
				placeholder="enter city"
				value={cityInput}
				onChange={handleOnchange}
			/>
            {loading && <p>loading...</p>}

            {weatherData && !loading && (
                <>
                <h2>{weatherData.city}</h2>
                <h4>{weatherData.temp} "C</h4>
                </>
            )}
		</>
	);
}
