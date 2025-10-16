const DEFAULT_BASE_URL = "http://localhost:8080";

const sanitizeBaseUrl = (url: string) => url.replace(/\/+$/, "");

const API_BASE_URL = sanitizeBaseUrl(
  import.meta.env.VITE_API_BASE_URL ?? DEFAULT_BASE_URL,
);

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions extends RequestInit {
  method?: HttpMethod;
}

async function request<T>(path: string, options: RequestOptions = {}) {
  const { headers, method = "GET", ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    ...rest,
  });

  if (!response.ok) {
    const errorMessage = await tryExtractError(response);
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

async function tryExtractError(response: Response) {
  try {
    const json = await response.json();
    if (json?.message) {
      return json.message;
    }
    if (json?.error) {
      return json.error;
    }
  } catch {
    // Ignorar parse fallido, usamos fallback.
  }

  return `La solicitud falló con estado ${response.status}`;
}

export const apiClient = {
  post: <T>(path: string, body: unknown, options: RequestOptions = {}) =>
    request<T>(path, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
};
