#!/bin/bash
# 推送 pixroro 仓库（依赖已完成的 gh 设备码登录）
# 用法: bash push-to-github.sh
set -e

cd "$(dirname "$0")"

OWNER="xzux-land"
REPO="pixroro"

# 使用 gh CLI 的完整权限凭据（只读的 App token 无法推送）
if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  TOKEN=$(gh auth token)
else
  echo "未检测到 gh 登录，请先执行: gh auth login --web --scopes repo"
  exit 1
fi

API_HDR=(-H "Authorization: Bearer ${TOKEN}" -H "Content-Type: application/json" -H "Accept: application/vnd.github+json")

echo "1/2 校验授权…"
LOGIN=$(curl -s "${API_HDR[@]}" https://api.github.com/user \
  | python3 -c "import sys,json; print(json.load(sys.stdin).get('login',''))")
[ -n "$LOGIN" ] || { echo "✗ 授权无效，请重新登录"; exit 1; }
echo "    账号: $LOGIN"

echo "2/2 推送代码…"
git push "https://oauth2:${TOKEN}@github.com/${OWNER}/${REPO}.git" HEAD:refs/heads/main 2>&1 \
  | sed -E 's#https://oauth2:[^@]*@#https://oauth2:***@#g'

echo ""
echo "✓ 完成: https://github.com/${OWNER}/${REPO}"
