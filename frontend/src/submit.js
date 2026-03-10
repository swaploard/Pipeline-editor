/**
 * Sends the pipeline graph to the backend for analysis.
 *
 * @param {{ nodes: object[], edges: object[] }} pipeline
 * @returns {Promise<{ num_nodes: number, num_edges: number, is_dag: boolean }>}
 */
export async function submitPipeline({ nodes, edges }) {
  const response = await fetch('http://localhost:8000/pipelines/parse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nodes, edges }),
  });

  if (!response.ok) {
    throw new Error(`Server responded with ${response.status}`);
  }

  return response.json();
}
