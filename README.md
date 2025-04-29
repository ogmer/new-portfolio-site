# Ogmer Portfolio

Next.js で構築されたモダンなポートフォリオサイトです。

## 機能

- ダークモード/ライトモードの切り替え
- プロジェクト一覧の表示
- プロジェクト詳細のモーダル表示
- アニメーション効果（Framer Motion）
- レスポンシブデザイン

## 技術スタック

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion

## プロジェクト構造

```
src/
  ├── app/
  │   └── page.tsx      # メインページ
  ├── components/
  │   └── Modal.tsx     # モーダルコンポーネント
  └── context/
      └── ThemeContext.tsx  # テーマ管理
```

## 開発環境のセットアップ

1. リポジトリのクローン

```bash
git clone [repository-url]
```

2. 依存関係のインストール

```bash
npm install
```

3. 開発サーバーの起動

```bash
npm run dev
```

## ビルド

```bash
npm run build
```

## デプロイ

```bash
npm run start
```

## ライセンス

MIT
