#!/bin/bash
# 授权恢复后，一键创建 pixroro 仓库并推送代码
# 用法: bash push-to-github.sh
# 若仓库已在 GitHub 网页端手动创建，脚本会自动跳过创建步骤直接推送
set -e

cd "$(dirname "$0")"

# 获取 GitHub OAuth Token（不打印 token 值）
source /root/.codebuddy/skills/github-connector/scripts/get_token.sh github >/dev/null 2>&1 || {
  echo "获取授权失败，请先在 CodeBuddy「连接器」设置中重新授权 GitHub（需仓库写权限）"
  exit 1
}

OWNER="xzux-land"
REPO="pixroro"
REMOTE="https://oauth2:${GITHUB_TOKEN}@github.com/${OWNER}/${REPO}.git"
API_HDR=(-H "Authorization: Bearer ${GITHUB_TOKEN}" -H "Content-Type: application/json" -H "Accept: application/vnd.github+json")

echo "1/3 校验授权…"
LOGIN=$(curl -s "${API_HDR[@]}" https://api.github.com/user \
  | python3 -c "import sys,json; print(json.load(sys.stdin).get('login',''))")
[ -n "$LOGIN" ] || { echo "✗ 授权无效，请重新授权"; exit 1; }
echo "    账号: $LOGIN"

echo "2/3 确认仓库 ${OWNER}/${REPO} 存在…"
CODE=$(curl -s -o /dev/null -w "%{http_code}" "${API_HDR[@]}" "https://api.github.com/repos/${OWNER}/${REPO}")
if [ "$CODE" = "200" ]; then
  echo "    仓库已存在，跳过创建"
else
  echo "    仓库不存在，尝试创建…"
  RESULT=$(curl -s -X POST "${API_HDR[@]}" https://api.github.com/user/repos \
    -d "{\"name\":\"${REPO}\",\"description\":\"pixro 创意素材平台前端原型 · Next.js\",\"private\":false}")
  if echo "$RESULT" | grep -q '"full_name"'; then
    echo "    ✓ 已创建: ${OWNER}/${REPO}"
  else
    echo "    ✗ 创建失败（授权无建仓库权限）"
    echo "    请在 GitHub 网页端手动新建空仓库 https://github.com/new ，名称填 ${REPO}，"
    echo "    不要勾选任何初始化文件，建好后重新运行本脚本即可推送。"
    exit 1
  fi
fi

echo "3/3 推送代码…"
git push -f "$REMOTE" HEAD:refs/heads/main 2>&1 | sed -E 's#https://oauth2:[^@]*@#https://oauth2:***@#g'

# 清理：remote 不含 token
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/${OWNER}/${REPO}.git"

echo ""
echo "✓ 完成: https://github.com/${OWNER}/${REPO}"
