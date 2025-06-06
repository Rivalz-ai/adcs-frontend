interface FetchOptions {
  method: string;
  headers: Record<string, string>;
  url?: string;
  body?: string;
}

interface RequestOptions {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

class ClientCurlExecutor {
  /**
   * Parse cURL command and convert to fetch options
   */
  parseCurlToFetch(curlCommand: string): FetchOptions {
    const options: FetchOptions = {
      method: "GET",
      headers: {},
    };

    // Extract URL
    const urlMatch =
      curlCommand.match(/curl\s+(?:--location\s+)?'([^']+)'/) ||
      curlCommand.match(/curl\s+(?:--location\s+)?([^\s]+)/);
    if (urlMatch) {
      options.url = urlMatch[1];
    }

    // Extract method
    const methodMatch =
      curlCommand.match(/-X\s+(\w+)/i) ||
      curlCommand.match(/--request\s+(\w+)/i);
    if (methodMatch) {
      options.method = methodMatch[1].toUpperCase();
    }

    // Extract headers
    const headerRegex = /--header\s+'([^:]+):\s*([^']+)'/g;
    let headerMatch;
    while ((headerMatch = headerRegex.exec(curlCommand)) !== null) {
      options.headers[headerMatch[1].trim()] = headerMatch[2].trim();
    }

    // Extract data/body
    const dataMatch =
      curlCommand.match(/--data\s+'([^']+)'/) ||
      curlCommand.match(/--data\s+([^\s]+)/);
    if (dataMatch) {
      options.body = dataMatch[1];
      if (!options.headers["Content-Type"]) {
        options.headers["Content-Type"] = "application/json";
      }
    }

    return options;
  }

  /**
   * Execute cURL command by fetch API
   */
  async executeCurl(curlCommand: string): Promise<any> {
    try {
      const options = this.parseCurlToFetch(curlCommand);
      if (!options.url) {
        throw new Error("Could not extract URL from cURL command");
      }

      const fetchOptions: RequestOptions = {
        method: options.method,
        headers: options.headers,
      };

      if (options.body && options.method !== "GET") {
        fetchOptions.body = options.body;
      }

      const response = await fetch(options.url, fetchOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new Error(`cURL execution failed: ${errorMessage}`);
    }
  }
}

export default ClientCurlExecutor;
