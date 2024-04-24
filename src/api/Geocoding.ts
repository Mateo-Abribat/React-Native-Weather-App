import { API_KEY, BASE_URL } from "@env";

export async function GetGeocode(city: string) {
  const url = `${BASE_URL}/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;

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
    console.error("Fetch GetGeocode error : ", error.message);
  }
}
