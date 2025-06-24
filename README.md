# MinaOS

=== 書きかけ ===

ハッカソン用レポジトリ
- [第2回 AI Agent Hackathon with Google Cloud](https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2)

## 概要

- 技術ブログのURLを入力して実行すると、タイポを指摘してくれます
- 匿名ログインで認証するので、ユーザーの情報は残りません
- reCAPTCHAでbot攻撃を保護しています

## 使用技術

- フロントエンド
  - React、Next.js
  - Firebase Hosting
- バックエンド
  - Firebase Functions (Python and Typescript)
  - Firebase Authentication
  - Vertex AI (Gemini 2.5 Flash)
- デプロイ
  - GitHub Actions

## ファイル

```
├── .github/                 # GitHub Actions workflow
├── hosting/
│   ├── app/                 # React components and pages
│   ├── styles/              # CSS class definitions
│   ├── lib/                 # Firebase integration and related utilities
│   └── utils/               # General utility functions
├── functions/
│   ├── on_request_example/  # Example Cloud Function endpoint
│   └── recaptcha/           # reCAPTCHA-related logic
├── firebase.json            # Firebase configuration file
└── README.md                # Project documentation

```

## Setup Instructions

TBD
