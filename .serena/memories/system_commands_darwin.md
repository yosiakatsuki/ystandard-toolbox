# Darwin（macOS）システムコマンド

## 基本ファイル操作

### ディレクトリ・ファイル操作
```bash
ls -la                       # 詳細ファイル一覧表示
find . -name "*.tsx"         # TypeScriptファイル検索
grep -r "pattern" src/       # パターン検索
cd /path/to/directory        # ディレクトリ移動
mkdir -p nested/path         # 入れ子ディレクトリ作成
rm -rf directory             # ディレクトリ再帰削除
cp -r source/ dest/          # ディレクトリ再帰コピー
mv source dest               # ファイル・ディレクトリ移動/リネーム
```

### ファイル内容操作
```bash
cat file.txt                 # ファイル内容表示
head -n 20 file.txt          # 先頭20行表示
tail -n 20 file.txt          # 末尾20行表示
less file.txt                # ページング表示
nano file.txt                # テキストエディタ
```

## Git操作

### 基本Git操作
```bash
git status                   # 作業状態確認
git add .                    # 全変更をステージング
git commit -m "message"      # コミット
git push origin branch       # リモートにプッシュ
git pull origin main         # メインブランチから取得
git branch -a                # 全ブランチ表示
git checkout -b new-branch   # 新ブランチ作成・切り替え
git log --oneline            # コミット履歴表示
git diff                     # 変更差分表示
```

### プロジェクト固有Git
```bash
git log --pretty=format:"%h %s" --max-count=5  # 最近のコミット5件
git diff HEAD~1 HEAD         # 直前コミットとの差分
```

## プロセス・システム管理

### プロセス管理
```bash
ps aux | grep node           # Nodeプロセス確認
kill -9 PID                  # プロセス強制終了
lsof -i :10020              # ポート10020使用プロセス確認
```

### システム情報
```bash
uname -a                     # システム情報表示
df -h                        # ディスク使用量
free -h                      # メモリ使用量（Linux互換）
top                          # リアルタイムプロセス表示
```

## ネットワーク

### 接続確認
```bash
curl -I http://localhost:10020  # HTTP応答ヘッダー確認
ping google.com              # 接続確認
netstat -an | grep 10020     # ポート状態確認
```

## ファイル検索・内容検索

### 高速検索（推奨）
```bash
# ripgrep（rg）- 高速grep代替
rg "pattern" src/            # パターン検索
rg -t typescript "interface" # TypeScriptファイルのみ検索
rg -A 5 -B 5 "pattern"       # 前後5行表示

# fd - 高速find代替  
fd ".tsx$" src/              # .tsxファイル検索
```

### 標準検索
```bash
find . -type f -name "*.php" # PHPファイル検索
grep -r --include="*.tsx" "useState" src/  # TypeScriptでのuseState検索
```

## アーカイブ・圧縮

### tar操作
```bash
tar -czf archive.tar.gz dir/ # gzip圧縮アーカイブ作成
tar -xzf archive.tar.gz      # gzip展開
```

### zip操作
```bash
zip -r archive.zip dir/      # zip圧縮
unzip archive.zip            # zip展開
```

## パーミッション

### ファイル権限
```bash
chmod 755 file               # 実行権限付与
chmod -R 644 dir/           # ディレクトリ再帰権限変更
chown user:group file        # 所有者変更
```

## macOS特有

### Finder統合
```bash
open .                       # Finderで現在ディレクトリを開く
open -a "Visual Studio Code" file.txt  # VSCodeでファイルを開く
```

### ファイルシステム
```bash
ls -la@ file                 # 拡張属性表示
xattr -c file                # 拡張属性削除（Quarantine解除等）
```

## プロジェクト開発での推奨使用法

### 日常的な操作
1. `ls -la` - ファイル確認
2. `git status` - 変更状態確認
3. `rg "pattern" src/` - コード検索
4. `find . -name "*.tsx"` - ファイル検索

### トラブルシューティング
1. `lsof -i :10020` - ポート使用状況確認
2. `ps aux | grep node` - Nodeプロセス確認
3. `npm run stop && npm run start` - 環境リセット