#!/bin/bash
# 授权恢复后，一键创建 pixro 仓库并推送代码
# 用法: bash push-to-github.sh
set -e

cd "$(dirname "$0")"

# 获取 GitHub OAuth Token（不打印 token 值）
source /root/.codebuddy/skills/github-connector/scripts/get_token.sh github >/dev/null 2>&1 || {
  echo "获取授权失败，请先在 CodeBuddy「连接器」设置中重新授权 GitHub（需仓库写权限）"
  exit 1
}

OWNER="xzux-land"
REPO="pixro"
REMOTE="https://oauth2:${GITHUB_TOKEN}@github.com/${OWNER}/${REPO}.git"

echo "1/3 校验授权…"
LOGIN=$(curl -s -H "Authorization: Bearer ${GITHUB_TOKEN}" https://api.github.com/user \
  | python3 -c "import sys,json; print(json.load(sys.stdin).get('login',''))")
[ -n "$LOGIN" ] || { echo "授权无效，请重新授权"; exit 1; }
echo "    账号: $LOGIN"

echo "2/3 创建仓库 ${OWNER}/${REPO}（若已存在则跳过）…"
curl -s -X POST -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "Content-Type: application/json" https://api.github.com/user/repos \
  -d "{\"name\":\"${REPO}\",\"description\":\"pixro 创意素材平台前端原型 · Next.js\",\"private\":false}" \
  | python3 -c "
import sys,json
d=json.load(sys.stdin)
if 'full_name' in d: print('    已创建:', d['full_name'])
elif 'name' in str(d.get('errors','')) or 'already exists' in str(d): print('    仓库已存在，跳过')
else: print('    创建结果:', d.get('message'))
"

echo "3/3 推送代码…"
git push -f "$REMOTE" HEAD:refs/heads/main 2>&1 | sed -E 's#https://oauth2:[^@]*@#https://oauth2:***@#g'

# 清理：remote 不含 token
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/${OWNER}/${REPO}.git"

echo ""
echo "完成: https://github.com/${OWNER}/${REPO}"
