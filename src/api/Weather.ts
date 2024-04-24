import { API_KEY, BASE_URL } from "@env";

export async function GetWeather(lat: number, lon: number) {
  const url = `${BASE_URL}/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=11&units=metric&lang=fr&appid=${API_KEY}`;

  try {
    const requestOptions: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      if (response.headers.get("Content-Length") === "0") {
        return Promise.resolve({ status: response.status, data: null });
      } else {
        const data = await response.json();
        return Promise.resolve({ status: response.status, data: data });
      }
    } else return Promise.resolve({ status: response.status, data: null });
  } catch (error: any) {
    console.error("Fetch GetTodayWeather error : ", error.message);
  }
}
