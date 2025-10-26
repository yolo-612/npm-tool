echo "开始执行构建脚本"
echo "当前路径：$(pwd)"

echo "node版本：$(node -v)"
echo "npm版本：$(npm -v)"
echo "pnpm版本：$(pnpm -v)"

pnpm install --shamefully-hoist --verbos

cd vite

echo "当前路径：$(pwd)"

ls

pnpm run build
