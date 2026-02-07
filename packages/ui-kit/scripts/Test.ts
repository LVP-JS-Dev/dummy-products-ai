import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { isDeepStrictEqual } from "node:util";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  buttonContract,
  buttonEvents,
  checkboxContract,
  checkboxEvents,
  iconContract,
  pageNumberContract,
  pageNumberEvents,
  searchInputContract,
  searchInputEvents,
} from "../src/contracts";
import { states } from "../src/states";

const components = {
  Button: {
    props: buttonContract,
    events: buttonEvents,
    states: states.button,
  },
  SearchInput: {
    props: searchInputContract,
    events: searchInputEvents,
    states: states.searchInput,
  },
  Checkbox: {
    props: checkboxContract,
    events: checkboxEvents,
    states: states.checkbox,
  },
  PageNumber: {
    props: pageNumberContract,
    events: pageNumberEvents,
    states: states.pageNumber,
  },
  Icon: { props: iconContract, states: states.icon },
} as const;

interface Manifest {
  components: Record<
    string,
    {
      schema: string;
      propsSchema: string;
      events?: Record<string, { payloadSchema: string }>;
    }
  >;
}

type JsonRecord = Record<string, unknown>;

interface JsonSchema {
  type?: "object" | "string" | "boolean" | "integer";
  anyOf?: JsonSchema[];
  properties?: Record<string, JsonSchema>;
  required?: string[];
  additionalProperties?: boolean;
  minLength?: number;
  enum?: unknown[];
  minimum?: number;
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asSchema(value: unknown): JsonSchema | undefined {
  if (!isRecord(value)) {
    return undefined;
  }
  return value as JsonSchema;
}

async function readJson(path: string) {
  return JSON.parse(await readFile(path, "utf8")) as unknown;
}

interface ValidationError {
  path: string;
  message: string;
}

class Reporter {
  hasError = false;

  error(message: string) {
    console.error(message);
    this.hasError = true;
  }
}

function validateAnyOf(
  schema: JsonSchema,
  value: unknown,
  path: string,
  errors: ValidationError[]
) {
  const candidates = schema.anyOf;
  if (!Array.isArray(candidates)) {
    return;
  }

  const anyErrors: ValidationError[] = [];
  for (const candidate of candidates) {
    const candidateErrors: ValidationError[] = [];
    validateValue(candidate, value, path, candidateErrors);
    if (candidateErrors.length === 0) {
      return;
    }
    anyErrors.push(...candidateErrors);
  }

  errors.push({
    path,
    message: `must match at least one schema (anyOf), got: ${anyErrors[0]?.message ?? "invalid"}`,
  });
}

function validateObject(
  schema: JsonSchema,
  value: unknown,
  path: string,
  errors: ValidationError[]
) {
  if (!isRecord(value)) {
    errors.push({ path, message: "must be an object" });
    return;
  }

  const properties = schema.properties ?? {};
  const required = Array.isArray(schema.required) ? schema.required : [];

  for (const requiredKey of required) {
    if (!(requiredKey in value)) {
      errors.push({ path: `${path}.${requiredKey}`, message: "is required" });
    }
  }

  if (schema.additionalProperties === false) {
    for (const key of Object.keys(value)) {
      if (!(key in properties)) {
        errors.push({ path: `${path}.${key}`, message: "is not allowed" });
      }
    }
  }

  for (const [key, propSchema] of Object.entries(properties)) {
    if (key in value) {
      validateValue(propSchema, value[key], `${path}.${key}`, errors);
    }
  }
}

function validateString(
  schema: JsonSchema,
  value: unknown,
  path: string,
  errors: ValidationError[]
) {
  if (typeof value !== "string") {
    errors.push({ path, message: "must be a string" });
    return;
  }

  if (typeof schema.minLength === "number" && value.length < schema.minLength) {
    errors.push({ path, message: `must have minLength ${schema.minLength}` });
    return;
  }

  if (Array.isArray(schema.enum) && !schema.enum.includes(value)) {
    errors.push({ path, message: "must be one of enum values" });
  }
}

function validateBoolean(
  value: unknown,
  path: string,
  errors: ValidationError[]
) {
  if (typeof value !== "boolean") {
    errors.push({ path, message: "must be a boolean" });
  }
}

function validateInteger(
  schema: JsonSchema,
  value: unknown,
  path: string,
  errors: ValidationError[]
) {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    errors.push({ path, message: "must be an integer" });
    return;
  }

  if (typeof schema.minimum === "number" && value < schema.minimum) {
    errors.push({ path, message: `must be >= ${schema.minimum}` });
  }
}

function validateValue(
  schema: JsonSchema,
  value: unknown,
  path: string,
  errors: ValidationError[]
) {
  if (Array.isArray(schema.anyOf)) {
    validateAnyOf(schema, value, path, errors);
    return;
  }

  if (schema.type === "object") {
    validateObject(schema, value, path, errors);
    return;
  }

  if (schema.type === "string") {
    validateString(schema, value, path, errors);
    return;
  }

  if (schema.type === "boolean") {
    validateBoolean(value, path, errors);
    return;
  }

  if (schema.type === "integer") {
    validateInteger(schema, value, path, errors);
  }
}

function validateStateAgainstSchema(
  schemaUnknown: unknown,
  stateValue: unknown,
  reporter: Reporter,
  statePath: string
) {
  const schema = asSchema(schemaUnknown);
  if (!schema) {
    reporter.error(`Schema for '${statePath}' is not a valid JSON object.`);
    return;
  }

  const errors: ValidationError[] = [];
  validateValue(schema, stateValue, "<root>", errors);
  if (errors.length === 0) {
    return;
  }

  reporter.error(`State '${statePath}' failed schema validation:`);
  for (const error of errors.slice(0, 8)) {
    reporter.error(`${error.path} ${error.message}`);
  }
}

function validateSchemasEqual(
  reporter: Reporter,
  label: string,
  actual: unknown,
  expected: unknown
) {
  if (!isDeepStrictEqual(actual, expected)) {
    reporter.error(`${label} schema drift detected.`);
  }
}

async function validatePropsSchema(
  reporter: Reporter,
  componentName: string,
  manifestEntry: Manifest["components"][string],
  contract: unknown
) {
  const propsSchemaPath = resolve("src/generated", manifestEntry.propsSchema);
  const propsSchemaFromDisk = await readJson(propsSchemaPath);
  const propsSchemaExpected = zodToJsonSchema(contract, componentName);

  validateSchemasEqual(
    reporter,
    `Props '${componentName}'`,
    propsSchemaFromDisk,
    propsSchemaExpected
  );

  return propsSchemaFromDisk;
}

function validateStates(
  reporter: Reporter,
  componentName: string,
  propsSchemaFromDisk: unknown,
  componentStates: Record<string, unknown>
) {
  const stateEntries = Object.entries(componentStates);
  if (stateEntries.length < 3) {
    reporter.error(`State set '${componentName}' must have at least 3 states.`);
  }

  for (const [stateName, value] of stateEntries) {
    validateStateAgainstSchema(
      propsSchemaFromDisk,
      value,
      reporter,
      `${componentName}.${stateName}`
    );
  }
}

async function validateEventSchemas(
  reporter: Reporter,
  componentName: string,
  declaredEvents: Record<string, unknown>,
  manifestEvents: Record<string, { payloadSchema: string }>
) {
  for (const [eventName, payloadContract] of Object.entries(declaredEvents)) {
    const manifestEvent = manifestEvents[eventName];
    if (!manifestEvent) {
      reporter.error(
        `Manifest '${componentName}' is missing event '${eventName}'.`
      );
      continue;
    }

    const payloadSchemaPath = resolve(
      "src/generated",
      manifestEvent.payloadSchema
    );
    const payloadSchemaFromDisk = await readJson(payloadSchemaPath);
    const payloadSchemaExpected = zodToJsonSchema(
      payloadContract,
      `${componentName}.${eventName}`
    );

    validateSchemasEqual(
      reporter,
      `Event payload '${componentName}.${eventName}'`,
      payloadSchemaFromDisk,
      payloadSchemaExpected
    );
  }

  for (const eventName of Object.keys(manifestEvents)) {
    if (!(eventName in declaredEvents)) {
      reporter.error(
        `Manifest '${componentName}' has unknown event '${eventName}'.`
      );
    }
  }
}

async function validateComponent(
  reporter: Reporter,
  manifest: Manifest,
  componentName: string,
  component: (typeof components)[keyof typeof components]
) {
  const manifestEntry = manifest.components[componentName];
  if (!manifestEntry) {
    reporter.error(`Manifest is missing component '${componentName}'.`);
    return;
  }

  if (manifestEntry.schema !== manifestEntry.propsSchema) {
    reporter.error(
      `Manifest '${componentName}' must have schema === propsSchema.`
    );
  }

  const propsSchemaFromDisk = await validatePropsSchema(
    reporter,
    componentName,
    manifestEntry,
    component.props
  );

  validateStates(
    reporter,
    componentName,
    propsSchemaFromDisk,
    component.states
  );

  const declaredEvents = "events" in component ? component.events : undefined;
  const manifestEvents = manifestEntry.events ?? {};

  if (!declaredEvents && Object.keys(manifestEvents).length > 0) {
    reporter.error(
      `Manifest '${componentName}' has events but contract declares none.`
    );
    return;
  }

  if (declaredEvents) {
    await validateEventSchemas(
      reporter,
      componentName,
      declaredEvents as Record<string, unknown>,
      manifestEvents
    );
  }
}

async function validateAll() {
  const reporter = new Reporter();
  const manifestPath = resolve("src/generated/manifest.json");
  const manifest = (await readJson(manifestPath)) as Manifest;

  for (const [componentName, component] of Object.entries(components)) {
    await validateComponent(reporter, manifest, componentName, component);
  }

  if (reporter.hasError) {
    process.exit(1);
  }

  console.log("All states and generated artifacts are valid.");
}

validateAll().catch((error) => {
  console.error(error);
  process.exit(1);
});
