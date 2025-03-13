export interface ParsedCurl {
  url: string;
  method: string;
  headers: Record<string, string>;
  data: Record<string, unknown> | null;
}

export function parseCurl(curlCommand: string): ParsedCurl {
  const lines = curlCommand.split("\\").map((line) => line.trim());
  const parsed: ParsedCurl = {
    url: "",
    method: "GET",
    headers: {},
    data: null,
  };

  let dataBuffer = "";

  lines.forEach((line) => {
    if (line.startsWith("curl")) {
      const urlMatch = line.match(/curl\s+--\w+\s+['"]([^'"]+)['"]/);
      if (urlMatch) {
        parsed.url = urlMatch[1];
      } else {
        const fallbackMatch = line.match(/curl\s+['"]([^'"]+)['"]/);
        if (fallbackMatch) parsed.url = fallbackMatch[1];
      }
    }

    if (line.includes("--header")) {
      const headerMatch = line.match(/--header\s+['"]([^'"]+)['"]/);
      if (headerMatch) {
        const [key, value] = headerMatch[1].split(":").map((s) => s.trim());
        parsed.headers[key] = value;
      }
    }

    if (line.includes("--data")) {
      const dataMatch = line.match(/--data\s+['"]([\s\S]*)/);
      if (dataMatch) {
        dataBuffer += dataMatch[1];
      }
    } else if (dataBuffer) {
      dataBuffer += " " + line;
    }
  });

  if (dataBuffer) {
    try {
      const rawData = dataBuffer
        .replace(/^['"]|['"]$/g, "")
        .replace(/\\n/g, "")
        .trim();

      parsed.data = JSON.parse(rawData);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      console.error("Failed to parse JSON data:", error.message);
      console.error("Raw data string:", dataBuffer);
      parsed.data = null;
    }
  }

  return parsed;
}
