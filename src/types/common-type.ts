export interface CommonItem {
  label: string;
  value: string | number;
  subLabel?: string;
  inputSchema?: Record<string, unknown>;
}
