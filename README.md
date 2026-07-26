# Outputs

Demonstrates **agentic workflow outputs** using GitHub Actions.

## Overview

The workflow (`agentic-workflow.yml`) has two jobs:

| Job | Purpose |
|-----|---------|
| `agent` | Runs `agent/process.py` and exposes its results as **job outputs** |
| `report` | Consumes the agent outputs, writes a step summary, and uploads a JSON artifact |

```
┌─────────┐   outputs   ┌──────────┐
│  agent  │ ──────────► │  report  │
└─────────┘             └──────────┘
```

## Workflow inputs

| Input | Required | Default | Description |
|-------|----------|---------|-------------|
| `task` | ✅ | `"Summarise the latest changes in the repository"` | Task for the agent to process |
| `context` | ❌ | `""` | Optional additional context |

## Job outputs (from `agent`)

| Output | Description |
|--------|-------------|
| `status` | `completed` or `failed` |
| `timestamp` | ISO-8601 UTC timestamp of completion |
| `summary` | Human-readable summary of the result |
| `result_json` | Full JSON result object |

## Usage

Trigger the workflow manually from the **Actions** tab:

1. Select **Agentic Workflow Outputs**.
2. Click **Run workflow**.
3. Fill in **Task** (required) and **Context** (optional).
4. Click **Run workflow**.

After the run completes, check the **Summary** tab of the `report` job for a table
of outputs, or download the `agent-result` artifact for the full JSON.

## Running the agent locally

```bash
python agent/process.py --task "My task description" --context "Optional context"
```

> When `GITHUB_OUTPUT` is not set the script prints outputs to stdout instead.
