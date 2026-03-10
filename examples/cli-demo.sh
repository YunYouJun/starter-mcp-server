#!/bin/bash

# MCP Server CLI 演示脚本

echo "=== MCP Server CLI Demo ==="
echo ""

# 1. 显示帮助
echo "1️⃣  显示帮助信息:"
node dist/cli.mjs --help
echo ""

# 2. 获取天气预警
echo "2️⃣  获取加州天气预警:"
node dist/cli.mjs get-alerts CA | head -20
echo "..."
echo ""

# 3. 获取天气预报
echo "3️⃣  获取特定位置天气预报:"
node dist/cli.mjs get-forecast 39.7456 -97.0892 | head -25
echo "..."
echo ""

echo "=== Demo 完成 ==="
echo ""
echo "💡 提示:"
echo "  - 无参数运行启动 MCP 服务器: node dist/cli.mjs"
echo "  - 使用工具命令直接获取数据"
