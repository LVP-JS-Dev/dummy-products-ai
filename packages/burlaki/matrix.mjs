// biome-ignore lint/style/noExportedImports: Intentional: expose JSON as a default export for consumers.
import matrix from "./agent-skills-matrix.json" with { type: "json" };
export default matrix;
