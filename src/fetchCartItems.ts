// src/utils/getApiKey.ts
export const getApiKey = (): string => {
  // Vite 환경일 때만 import.meta.env 사용
  if (typeof process !== "undefined" && process.env.VITE_API_KEY) {
    return process.env.VITE_API_KEY;
  }

  // fallback
  return "test";
};

export async function fetchCartItems(baseURL: string, path: string = "") {
  try {
    const response = await fetch(`${baseURL}/cart-items${path}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${getApiKey()}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `HTTP Error: ${response.status} ${errorData.message || ""}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Network error occurred");
    }
    throw error;
  }
}
