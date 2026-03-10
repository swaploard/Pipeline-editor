"""
Graph utility functions for the pipeline editor backend.

Provides DAG (Directed Acyclic Graph) detection using a DFS-based
cycle-detection algorithm with 3-color marking.
"""

from typing import List, Set, Dict
from collections import defaultdict


def is_dag(node_ids: List[str], edges: List[tuple[str, str]]) -> bool:
    """
    Determine whether a directed graph is acyclic (a DAG).

    Uses iterative DFS with a 3-color scheme:
      - WHITE (not visited): node has not been explored yet
      - GRAY  (in progress): node is on the current DFS path (recursion stack)
      - BLACK (completed):   node and all its descendants are fully explored

    A back-edge (an edge to a GRAY node) indicates a cycle.

    Args:
        node_ids: List of node ID strings present in the graph.
        edges:    List of (source, target) tuples representing directed edges.

    Returns:
        True if the graph is a DAG (no cycles), False otherwise.
    """
    # Build adjacency list
    adjacency: Dict[str, List[str]] = defaultdict(list)
    for source, target in edges:
        adjacency[source].append(target)

    # Color constants
    WHITE, GRAY, BLACK = 0, 1, 2

    # Initialize all nodes as WHITE (unvisited)
    color: Dict[str, int] = {node_id: WHITE for node_id in node_ids}

    def _dfs_has_cycle(start: str) -> bool:
        """
        Iterative DFS from `start`.

        Uses an explicit stack of (node, neighbor_index) pairs to simulate
        the call-stack of a recursive DFS without risking Python's recursion
        limit on large graphs.

        Returns True if a cycle is detected.
        """
        stack: list[tuple[str, int]] = [(start, 0)]
        color[start] = GRAY  # Mark the starting node as in-progress

        while stack:
            node, idx = stack[-1]
            neighbors = adjacency[node]

            if idx < len(neighbors):
                # Advance the neighbor index for the current frame
                stack[-1] = (node, idx + 1)
                neighbor = neighbors[idx]

                if color[neighbor] == GRAY:
                    # Back-edge detected → cycle exists
                    return True
                if color[neighbor] == WHITE:
                    # Explore unvisited neighbor
                    color[neighbor] = GRAY
                    stack.append((neighbor, 0))
            else:
                # All neighbors explored — mark node as fully processed
                color[node] = BLACK
                stack.pop()

        return False

    # Run DFS from every unvisited node (handles disconnected components)
    for node_id in node_ids:
        if color[node_id] == WHITE:
            if _dfs_has_cycle(node_id):
                return False  # Cycle found → not a DAG

    return True  # No cycles → it's a DAG


def validate_edge_references(
    node_ids: Set[str],
    edges: List[tuple[str, str]],
) -> List[str]:
    """
    Check that every edge references existing nodes.

    Args:
        node_ids: Set of valid node IDs.
        edges:    List of (source, target) tuples.

    Returns:
        A list of human-readable error messages. Empty list means all edges
        are valid.
    """
    errors: List[str] = []
    for source, target in edges:
        if source not in node_ids:
            errors.append(f"Edge references unknown source node '{source}'")
        if target not in node_ids:
            errors.append(f"Edge references unknown target node '{target}'")
    return errors
