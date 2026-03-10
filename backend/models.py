"""
Pydantic models for the pipeline editor backend.

Defines the request and response schemas used by the /pipelines/parse endpoint.
"""

from typing import List
from pydantic import BaseModel


class Node(BaseModel):
    """Represents a single node in the pipeline graph."""
    id: str
    type: str


class Edge(BaseModel):
    """Represents a directed edge connecting two nodes."""
    source: str
    target: str


class PipelineRequest(BaseModel):
    """Request body for the pipeline parse endpoint."""
    nodes: List[Node]
    edges: List[Edge]


class PipelineResponse(BaseModel):
    """Response body returned by the pipeline parse endpoint."""
    num_nodes: int
    num_edges: int
    is_dag: bool
