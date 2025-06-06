import { ParsedCurl } from "./types";

/**
 * Parse cURL command to extract HTTP request components
 */
export const parseCurl = (curlCmd: string): ParsedCurl => {
  if (!curlCmd.trim()) {
    throw new Error("cURL command cannot be empty");
  }

  try {
    const lines = curlCmd.split(/\\\s*\n/).map((line: string) => line.trim());
    let method = "GET";
    let url = "";
    const headers: Record<string, string> = {};
    let body: string | null = null;

    for (const line of lines) {
      // Parse HTTP method (both long and short flags)
      if (line.includes("--request") || line.includes("-X")) {
        const match = line.match(/(?:--request|-X)\s+['"]?(\w+)['"]?/);
        if (match) method = match[1].toUpperCase();
      }

      // Parse URL - support multiple formats
      if (line.includes("--url")) {
        const urlMatch = line.match(/--url\s+['"]?(https?:\/\/[^\s'"]+)['"]?/);
        if (urlMatch) url = urlMatch[1];
      } else if (line.includes("--location")) {
        // Handle --location flag with URL
        const locationMatch = line.match(
          /--location\s+['"]?(https?:\/\/[^\s'"]+)['"]?/
        );
        if (locationMatch) url = locationMatch[1];
      } else if (
        !line.startsWith("--") &&
        !line.startsWith("-") &&
        !line.startsWith("curl") &&
        line.includes("http")
      ) {
        // Handle standalone URL line (like 'https://...' or "https://...")
        const standaloneUrlMatch = line.match(
          /^['"]?(https?:\/\/[^\s'"]+)['"]?$/
        );
        if (standaloneUrlMatch) url = standaloneUrlMatch[1];
      } else if (
        !line.startsWith("--") &&
        !line.startsWith("-") &&
        line.startsWith("http")
      ) {
        // Direct URL without flag
        const directUrlMatch = line.match(/^['"]?(https?:\/\/[^\s'"]+)['"]?/);
        if (directUrlMatch) url = directUrlMatch[1];
      } else if (
        !line.startsWith("--") &&
        !line.startsWith("-") &&
        !line.startsWith("curl") &&
        line.includes("http")
      ) {
        // URL in the middle of line (like 'https://...')
        const embeddedUrlMatch = line.match(/['"]?(https?:\/\/[^\s'"]+)['"]?/);
        if (embeddedUrlMatch) url = embeddedUrlMatch[1];
      }

      // Parse headers (both long and short flags)
      if (line.includes("--header") || line.includes("-H")) {
        const headerMatch = line.match(
          /(?:--header|-H)\s+['"]([^:]+):\s*([^'"]*)['"]/
        );
        if (headerMatch) {
          headers[headerMatch[1].trim()] = headerMatch[2].trim();
        }
      }

      // Parse request body - support multiple data formats (both long and short flags)
      if (line.includes("--data") || line.includes("-d")) {
        // Handle multi-line data
        const dataMatch = line.match(/(?:--data|-d)\s+['"](.+?)['"]?$/);
        if (dataMatch) {
          let dataValue = dataMatch[1];
          // Remove trailing quote if exists
          if (dataValue.endsWith("'") || dataValue.endsWith('"')) {
            dataValue = dataValue.slice(0, -1);
          }
          body = dataValue;
        }
      }

      // Set method to POST if data is present and no method specified
      if (body && method === "GET") {
        method = "POST";
      }
    }

    if (!url) {
      throw new Error("No valid URL found in cURL command");
    }

    // Clean up URL - remove quotes if any
    url = url.replace(/^['"]|['"]$/g, "");

    return { method, url, headers, body };
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("Invalid cURL command format");
  }
};

/**
 * Format JSON with proper error handling
 */
export const formatJson = (obj: any): string => {
  if (obj === null || obj === undefined) {
    return String(obj);
  }

  try {
    if (typeof obj === "string") {
      // Try to parse and re-stringify to format properly
      const parsed = JSON.parse(obj);
      return JSON.stringify(parsed, null, 2);
    }
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(obj);
  }
};

/**
 * Copy text to clipboard with error handling
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  if (!text.trim()) {
    console.warn("Attempted to copy empty text to clipboard");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy to clipboard:", err);
    // Fallback for older browsers
    fallbackCopyToClipboard(text);
  }
};

/**
 * Fallback copy method for older browsers
 */
function fallbackCopyToClipboard(text: string): void {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Fallback copy failed:", err);
  }

  document.body.removeChild(textArea);
}
