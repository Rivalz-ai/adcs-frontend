import { z } from "zod";

export function createDynamicSchema(inputEntity: Record<string, unknown>) {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  for (const [key, value] of Object.entries(inputEntity)) {
    if (typeof value === "string") {
      //if value is string, create string schema with validation
      schemaFields[key] = z.string().min(1, `${key} is required`);
    } else if (typeof value === "number") {
      //if value is number, create number schema with validation
      schemaFields[key] = z.number().min(0, `${key} must be a positive number`);
    } else if (typeof value === "boolean") {
      //if value is boolean, create boolean schema
      schemaFields[key] = z.boolean();
    } else {
      //if value is not string, number or boolean, create string schema with validation
      schemaFields[key] = z.string().min(1, `${key} is required`);
    }
  }

  return z.object(schemaFields);
}
