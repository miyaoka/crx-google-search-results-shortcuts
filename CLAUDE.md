# Google Search Results Shortcuts

Google 検索結果ページにキーボードナビゲーションを追加する Chrome/Firefox 拡張。Content Script のみで構成され、background script や popup は使用していない。

## 技術スタック

- フレームワーク: WXT（Chrome 拡張ビルドフレームワーク）
- 言語: TypeScript（ESM）
- 型チェック: tsgo（`@typescript/native-preview`）
- リンター: Oxlint（型認識）+ Oxfmt（フォーマッター）
- パッケージ管理: pnpm
- ツール管理: mise（Node.js, pnpm のバージョン管理）
- Git フック: Lefthook（pre-commit で oxlint --fix + oxfmt）
- CI: GitHub Actions（typecheck + lint）

## ディレクトリ構成

```
src/
├── entrypoints/content/   # Content Script（唯一のエントリーポイント）
│   ├── index.ts           # キーボードイベント処理、キーバインド定義、リーダーキー機構
│   ├── searchResult.ts    # 検索結果 DOM 操作（リンク抽出、フォーカス管理、ページ遷移）
│   ├── searchType.ts      # URL パラメータ操作（検索タイプ切り替え: 画像/動画/ニュース/マップ）
│   └── style.css          # フォーカス時のビジュアル効果（矢印アイコン、スライドアニメーション）
├── assets/
│   └── icon.png           # 拡張アイコン（auto-icons モジュールが各サイズを自動生成）
└── public/
    └── _locales/          # i18n（en, ja）
```

## コマンド

- `pnpm dev` — 開発サーバー起動（Chrome）
- `pnpm dev:firefox` — 開発サーバー起動（Firefox）
- `pnpm build` — Chrome 用ビルド
- `pnpm build:firefox` — Firefox 用ビルド
- `pnpm zip` — Chrome 配布用 ZIP 生成
- `pnpm zip:firefox` — Firefox 配布用 ZIP 生成
- `pnpm run typecheck` — 型チェック（tsgo）
- `pnpm run lint` — リント + フォーマットチェック
- `pnpm run fix` — リント自動修正 + フォーマット

## アーキテクチャ

- WXT の `defineContentScript` で全世界の Google ドメイン（150+ TLD）の検索結果ページにマッチ
- キーバインドは 2 層構造: 通常キー（hjkl 等）とリーダーキー（g）後の次キー
- フォーム要素（input, textarea）のフォーカス中はキーハンドラを無効化
- 検索結果リンクの抽出は `#search` 内の `g-link > a:first-of-type` と `a > h3` セレクタを使用し、カルーセルやカード等の特殊要素は除外
- フォーカス対象に `data-gsrks-anchor` 属性を付与し、CSS でスタイリング
