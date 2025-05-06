# Hono + react monorepo

## Directory Structure

```shell
.
├── apps                         # Apps
│    ├── api                     # Hono + Trpc
│    ├── web                     # React + Vite + Tanstack Router
│    └── ...
├── packages                     # Shared packages between apps
│    ├── lib                     # Simple lib
│    ├── auth                    # Auth: BetterAuth
│    ├── db                      # Database: Drizzle
│    └── ...
├── deno.jsonc                   # Deno Workspace configuration
├── LICENSE
└── README.md
```

## Prerequisites

- [Deno](https://deno.land/)
