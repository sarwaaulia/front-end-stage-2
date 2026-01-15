export async function fetchWeather(
	city: string
): Promise<{ city: string; temp: number }> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                city,
                temp: Math.floor(Math.random() * 30) + 10
            })
        }, 1000);
    }) 
}
