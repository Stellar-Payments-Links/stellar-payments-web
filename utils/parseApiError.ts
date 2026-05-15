export async function parseApiError(res: Response): Promise<string> {
  const text = await res.text();
  try {
    const json = JSON.parse(text) as { error?: string | Record<string, unknown> };
    if (typeof json.error === "string") return json.error;
    if (json.error) return "Validation failed";
  } catch {
    /* plain text */
  }
  return text || `Request failed (${res.status})`;
}
