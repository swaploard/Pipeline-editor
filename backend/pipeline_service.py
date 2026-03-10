"""
Pipeline analysis service.

Contains the business logic for analyzing a pipeline graph —
counting nodes/edges and determining DAG status.
"""

import logging
from fastapi import HTTPException

from models import PipelineRequest, PipelineResponse
from utils.graph_utils import is_dag, validate_edge_references

logger = logging.getLogger(__name__)


def analyze_pipeline(request: PipelineRequest) -> PipelineResponse:
    """
    Analyze the pipeline graph described by the request.

    Steps:
      1. Validate that all edges reference existing node IDs.
      2. Count nodes and edges.
      3. Determine whether the graph is a DAG.

    Args:
        request: The validated pipeline request payload.

    Returns:
        A PipelineResponse with node count, edge count, and DAG status.

    Raises:
        HTTPException(400): If any edge references a non-existent node.
    """
    node_ids = {node.id for node in request.nodes}
    edge_tuples = [(edge.source, edge.target) for edge in request.edges]

    # --- Validate edge references ---
    errors = validate_edge_references(node_ids, edge_tuples)
    if errors:
        logger.warning("Invalid edge references: %s", errors)
        raise HTTPException(status_code=400, detail=errors)

    # --- Compute metrics ---
    num_nodes = len(request.nodes)
    num_edges = len(request.edges)
    dag = is_dag(list(node_ids), edge_tuples)

    logger.info(
        "Pipeline analysis complete: %d nodes, %d edges, is_dag=%s",
        num_nodes,
        num_edges,
        dag,
    )

    return PipelineResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=dag,
    )
