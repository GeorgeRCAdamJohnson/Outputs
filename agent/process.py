#!/usr/bin/env python3
"""
Agentic workflow processor.

Reads a task description from the environment or command-line arguments,
processes it, and writes structured outputs to the GitHub Actions output
file (GITHUB_OUTPUT) so downstream jobs can consume the results.

Usage:
    python process.py --task "summarise the latest release notes"
"""

import argparse
import json
import os
import sys
from datetime import datetime, timezone


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Agentic workflow processor")
    parser.add_argument(
        "--task",
        required=True,
        help="Task description for the agent to process",
    )
    parser.add_argument(
        "--context",
        default="",
        help="Optional context or additional data for the task",
    )
    return parser.parse_args()


def process_task(task: str, context: str) -> dict:
    """
    Process the given task and return a structured result.

    In a real agentic workflow this function would call an LLM or external
    service.  Here it produces a deterministic result so the workflow can be
    exercised without API credentials.
    """
    timestamp = datetime.now(timezone.utc).isoformat()
    result = {
        "task": task,
        "status": "completed",
        "timestamp": timestamp,
        "summary": f"Processed task: {task}",
        "artifacts": [],
    }

    if context:
        result["context_received"] = True
        result["artifacts"].append("context_processed")

    return result


def write_outputs(result: dict) -> None:
    """Write key/value pairs to GITHUB_OUTPUT (multiline-safe)."""
    output_file = os.environ.get("GITHUB_OUTPUT")
    if not output_file:
        # Running locally — just print to stdout.
        print("GITHUB_OUTPUT not set; printing outputs to stdout:")
        for key, value in result.items():
            print(f"  {key}={value}")
        return

    with open(output_file, "a", encoding="utf-8") as fh:
        for key, value in result.items():
            # Use the heredoc delimiter syntax for values that may contain newlines.
            delimiter = "EOF"
            fh.write(f"{key}<<{delimiter}\n{value}\n{delimiter}\n")


def main() -> int:
    args = parse_args()

    print(f"[agent] Starting task: {args.task}")
    if args.context:
        print(f"[agent] Context provided ({len(args.context)} chars)")

    result = process_task(args.task, args.context)

    print(f"[agent] Task completed with status: {result['status']}")
    print(f"[agent] Result:\n{json.dumps(result, indent=2)}")

    # Flatten the result so each top-level field becomes a separate output.
    flat_outputs = {
        "status": result["status"],
        "timestamp": result["timestamp"],
        "summary": result["summary"],
        "result_json": json.dumps(result),
    }
    write_outputs(flat_outputs)

    return 0


if __name__ == "__main__":
    sys.exit(main())
