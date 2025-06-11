import { useMemo, useCallback } from "react";

export type MethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface UseCurlGeneratorProps {
  baseUrl: string;
  endpoint?: string;
  method?: MethodType;
  additionalHeaders?: Record<string, string>;
}

interface CurlResult {
  command: string;
  url: string;
  headers: Record<string, string>;
  method: string;
}

/**
 * Replace template values with actual data
 * @param template - The template to replace the values with
 * @param actualData - The actual data to replace the values with
 * @returns The data with the template values replaced with actual data
 */
const replaceTemplateValues = (
  template: any,
  actualData: Record<string, unknown>
): any => {
  if (typeof template === "string" && template === "string") {
    return actualData;
  }

  if (
    typeof template === "object" &&
    template !== null &&
    !Array.isArray(template)
  ) {
    const result: any = {};
    for (const [key, value] of Object.entries(template)) {
      result[key] = replaceTemplateValues(value, actualData);
    }
    return result;
  }

  if (Array.isArray(template)) {
    return template.map((item) => replaceTemplateValues(item, actualData));
  }

  return template;
};

/**
 * Apply output template to data
 * @param data - The data to apply the template to
 * @param template - The template to apply to the data
 * @returns The data with the template applied
 */
const applyOutputTemplate = (
  data: Record<string, unknown>,
  template?: Record<string, unknown>
): Record<string, unknown> => {
  if (!template) {
    return data;
  }

  const clonedTemplate = JSON.parse(JSON.stringify(template));
  return replaceTemplateValues(clonedTemplate, data);
};

/**
 * Build cURL headers
 * @param headers - The headers to build
 * @returns The built cURL headers
 */
const buildCurlHeaders = (headers: Record<string, string>): string => {
  return Object.entries(headers)
    .map(([key, value]) => ` \\\n  -H '${key}: ${value}'`)
    .join("");
};

/**
 * Check if method needs body
 * @param method - The method to check
 * @returns True if the method needs body, false otherwise
 */
const methodNeedsBody = (method: string): boolean => {
  return ["POST", "PUT", "PATCH"].includes(method);
};

/**
 * Convert data object to query string
 * @param data - The data object to convert
 * @returns The query string
 */
const buildQueryString = (data: Record<string, unknown>): string => {
  const params = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          params.append(key, String(item));
        });
      } else if (typeof value === "object") {
        params.append(key, JSON.stringify(value));
      } else {
        params.append(key, String(value));
      }
    }
  });

  return params.toString();
};

export function useCurlGenerator({
  baseUrl,
  endpoint = "",
  method = "POST",
  additionalHeaders = {},
}: UseCurlGeneratorProps) {
  const fullUrl = useMemo(() => {
    // Ensure there's exactly one "/" between baseUrl and endpoint
    const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    return `${cleanBaseUrl}${cleanEndpoint}`;
  }, [baseUrl, endpoint]);

  const headers = useMemo(() => {
    return {
      "Content-Type": "application/json",
      ...additionalHeaders,
    };
  }, [additionalHeaders]);

  const generateCurlCommand = useCallback(
    (
      data?: Record<string, unknown>,
      outputTemplate?: Record<string, unknown>
    ): string => {
      let targetUrl = fullUrl;

      // Handle GET requests with data - convert to query string
      if (method === "GET" && data) {
        const finalData = applyOutputTemplate(data, outputTemplate);
        const queryString = buildQueryString(finalData);
        if (queryString) {
          targetUrl = `${fullUrl}${
            fullUrl.includes("?") ? "&" : "?"
          }${queryString}`;
        }
      }

      // Build base command
      let curlCommand = `curl -X '${method}' \\\n  '${targetUrl}'`;

      // Add headers
      curlCommand += buildCurlHeaders(headers);

      // Add body data for appropriate methods (not GET)
      if (methodNeedsBody(method) && data) {
        const finalData = applyOutputTemplate(data, outputTemplate);
        const jsonData = JSON.stringify(finalData, null, 0);
        curlCommand += ` \\\n  -d '${jsonData}'`;
      }

      return curlCommand;
    },
    [method, fullUrl, headers]
  );

  // Generate cURL result object
  const getCurlResult = useCallback(
    (data?: Record<string, unknown>): CurlResult => {
      return {
        command: generateCurlCommand(data),
        url: fullUrl,
        headers,
        method,
      };
    },
    [generateCurlCommand, fullUrl, headers, method]
  );

  const generateMultipleMethods = useCallback(
    (data?: Record<string, unknown>) => {
      const methods: Array<"GET" | "POST" | "PUT" | "DELETE" | "PATCH"> = [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "PATCH",
      ];

      return methods.reduce((acc, methodType) => {
        let curlCommand = `curl -X '${methodType}' \\\n  '${fullUrl}'`;

        Object.entries(headers).forEach(([key, value]) => {
          curlCommand += ` \\\n  -H '${key}: ${value}'`;
        });

        if (["POST", "PUT", "PATCH"].includes(methodType) && data) {
          const jsonData = JSON.stringify(data, null, 0);
          curlCommand += ` \\\n  -d '${jsonData}'`;
        }

        acc[methodType] = curlCommand;
        return acc;
      }, {} as Record<string, string>);
    },
    [fullUrl, headers]
  );

  const generateFieldStructure = useCallback(
    (inputEntity: Record<string, unknown>) => {
      return Object.entries(inputEntity).map(([key, value]) => ({
        name: key,
        type:
          typeof value === "number"
            ? "number"
            : typeof value === "boolean"
            ? "boolean"
            : Array.isArray(value)
            ? "array"
            : "string",
        required: typeof value === "string" && value === "string",
        defaultValue:
          typeof value === "string" && value === "string" ? undefined : value,
        example:
          typeof value === "string" && value === "string"
            ? `example_${key}`
            : value,
      }));
    },
    []
  );

  // Generate sample data from inputEntity
  const generateSampleData = useCallback(
    (inputEntity: Record<string, unknown>) => {
      const sampleData: Record<string, unknown> = {};

      Object.entries(inputEntity).forEach(([key, value]) => {
        if (typeof value === "string" && value === "string") {
          sampleData[key] = `example_${key}`;
        } else if (typeof value === "number") {
          sampleData[key] = value;
        } else if (typeof value === "boolean") {
          sampleData[key] = value;
        } else if (Array.isArray(value)) {
          sampleData[key] = value;
        } else {
          sampleData[key] = value;
        }
      });

      return sampleData;
    },
    []
  );

  return {
    // Basic generation
    generateCurlCommand,
    getCurlResult,

    // Advanced generation
    generateMultipleMethods,
    generateFieldStructure,
    generateSampleData,

    // Config data
    config: {
      url: fullUrl,
      headers,
      method,
    },
  };
}
