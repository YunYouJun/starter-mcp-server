# starter-mcp-server

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

A modern MCP (Model Context Protocol) server starter template with CLI support.

## Features

- 🚀 **Dual Mode**: Works as both MCP server and CLI tool
- 🔧 **Built-in Tools**: Weather alerts and forecasts (NWS API)
- ♻️ **Code Reuse**: Shared business logic between MCP and CLI
- 📦 **Type Safe**: Full TypeScript support
- ✅ **Tested**: Comprehensive test coverage
- 🎯 **Simple**: Minimal architecture, easy to extend

## Quick Start

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Run as MCP server (default)
node dist/cli.mjs

# Or use CLI commands
node dist/cli.mjs get-alerts CA
node dist/cli.mjs get-forecast 39.7456 -97.0892

# Quick start with npm scripts
pnpm cli:help      # Show help
pnpm cli:alerts    # Example: Get CA alerts
pnpm cli:forecast  # Example: Get forecast
pnpm demo          # Run full demo
```

## CLI Usage

```bash
# Start MCP server (no arguments)
node dist/cli.mjs

# Get weather alerts for a state
node dist/cli.mjs get-alerts CA

# Get weather forecast for a location
node dist/cli.mjs get-forecast 39.7456 -97.0892

# Show help
node dist/cli.mjs --help
```

For detailed CLI documentation, see [CLI_USAGE.md](./CLI_USAGE.md).

## MCP Server Configuration

Add to your MCP client configuration (e.g., Claude Desktop):

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/starter-mcp-server/dist/index.mjs"]
    }
  }
}
```

Or use via npx:

```json
{
  "mcpServers": {
    "weather": {
      "command": "npx",
      "args": ["-y", "starter-mcp-server@latest"]
    }
  }
}
```

## Development

```bash
# Run tests
pnpm test

# Type check
pnpm typecheck

# Lint
pnpm lint

# Debug with MCP Inspector
pnpx @modelcontextprotocol/inspector node dist/index.mjs
```

## Project Structure

```
src/
├── lib/
│   └── weather.ts          # Core business logic
├── tools/
│   ├── get-alerts.ts       # MCP tool registration
│   └── get-forecast.ts
├── cli.ts                  # CLI entry point
├── server.ts               # MCP Server instance
└── index.ts                # MCP Server entry point
```

## Adding New Tools

See [CLI_USAGE.md](./CLI_USAGE.md) for detailed instructions.

Quick overview:
1. Add business logic in `src/lib/`
2. Register MCP tool in `src/tools/`
3. Add CLI command in `src/cli.ts` (optional)
4. Update `src/index.ts` to register the tool

## Architecture Analysis

For a detailed analysis of the project architecture and design decisions, see [ARCHITECTURE_ANALYSIS.md](./ARCHITECTURE_ANALYSIS.md).

## Release

```sh
# First release
pnpm publish

# Future releases
pnpm run release
```

## References

- [Build an MCP Server](https://modelcontextprotocol.io/docs/develop/build-server)
- [Build an MCP Client](https://modelcontextprotocol.io/docs/develop/build-client)
- [starter-ts](https://github.com/antfu/starter-ts)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/pkg-placeholder?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/pkg-placeholder
[npm-downloads-src]: https://img.shields.io/npm/dm/pkg-placeholder?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/pkg-placeholder
[bundle-src]: https://img.shields.io/bundlephobia/minzip/pkg-placeholder?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=pkg-placeholder
[license-src]: https://img.shields.io/github/license/YunYouJun/pkg-placeholder.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/YunYouJun/pkg-placeholder/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/pkg-placeholder
