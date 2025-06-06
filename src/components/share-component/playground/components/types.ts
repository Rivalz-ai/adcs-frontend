/**
 * Response data structure returned from HTTP requests
 */
export interface ResponseData {
  /** HTTP status code */
  status: number;
  /** HTTP status text */
  statusText: string;
  /** Response headers as key-value pairs */
  headers: Record<string, string>;
  /** Response body data (parsed JSON or raw text) */
  data: any;
  /** Request duration in milliseconds */
  time: number;
  /** Response size in bytes */
  size: number;
}

/**
 * Parsed cURL command structure
 */
export interface ParsedCurl {
  /** HTTP method (GET, POST, PUT, etc.) */
  method: string;
  /** Target URL */
  url: string;
  /** Request headers as key-value pairs */
  headers: Record<string, string>;
  /** Request body (for POST, PUT, PATCH requests) */
  body: string | null;
}

/**
 * cURL example structure for quick templates
 */
export interface CurlExample {
  /** Display name of the example */
  name: string;
  /** The cURL command string */
  curl: string;
}

/**
 * Layout direction options for the playground
 */
export type LayoutDirection = "horizontal" | "vertical";

/**
 * Tab options for response display
 */
export type ResponseTab = "response" | "headers" | "info";
