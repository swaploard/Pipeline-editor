/**
 * Extracts {{variableName}} tokens from a string.
 * Returns a deduplicated array of variable names.
 *
 * @param {string} text
 * @returns {string[]}
 */
export function parseVariables(text) {
  if (!text) return [];
  const regex = /\{\{(\w+)\}\}/g;
  const variables = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) {
    variables.add(match[1]);
  }
  return Array.from(variables);
}
