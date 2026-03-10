"""
FastAPI application for the pipeline editor backend.

Provides one endpoint:
  POST /pipelines/parse  — analyze a pipeline graph and return metadata.

Run with:
  uvicorn main:app --reload
"""

import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import PipelineRequest, PipelineResponse
from pipeline_service import analyze_pipeline

# ---------------------------------------------------------------------------
# Logging configuration
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(name)s — %(message)s",
)
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# FastAPI app
# ---------------------------------------------------------------------------
app = FastAPI(
    title="Pipeline Editor Backend",
    description="Analyzes pipeline graphs and returns metadata (node/edge counts, DAG check).",
    version="1.0.0",
)

# Allow the frontend dev server to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@app.post("/pipelines/parse", response_model=PipelineResponse)
async def parse_pipeline(pipeline: PipelineRequest) -> PipelineResponse:
    """
    Receive a pipeline graph, analyze it, and return metadata.

    - **num_nodes**: total number of nodes in the graph
    - **num_edges**: total number of edges in the graph
    - **is_dag**:    whether the graph is a Directed Acyclic Graph
    """
    logger.info(
        "Received pipeline with %d node(s) and %d edge(s)",
        len(pipeline.nodes),
        len(pipeline.edges),
    )
    return analyze_pipeline(pipeline)
