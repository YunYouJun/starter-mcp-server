# starter-mcp-server

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

_description_

- [Build an MCP Client](https://modelcontextprotocol.io/docs/develop/build-client)

## Dev

### Running the Client

```bash
pnpm build

# run client
node dist/index.mjs path/to/build/index.js # node server
```

### Config MCP Servers

`mcp.json`

```json
{
  "mcpServers": {
    "starter": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/PARENT/FOLDER/starter/dist/index.mjs"]
    }
  }
}
```

### Use MCP Inspector to debug

```bash
pnpx @modelcontextprotocol/inspector node dist/index.mjs
```

### Release

```sh
# first
pnpm publish
# future release
pnpm run release
```

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

## Ref

- [Build an MCP Server](https://modelcontextprotocol.io/docs/develop/build-server)
- [starter-ts](https://github.com/antfu/starter-ts)
