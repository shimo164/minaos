# MinaOS

- ハッカソン用レポジトリ
- [第2回 AI Agent Hackathon with Google Cloud](https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2)

## 概要

- 技術ブログのURLを入力して実行すると、タイポを指摘してくれます
- 匿名ログインで認証するので、ユーザーの情報は残りません
- reCAPTCHAでbot攻撃を保護しています

## 使用技術

- フロントエンド
  - Next.js
  - Typescript
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

### Requirements
- Google Cloud account
- Create Firebase project
- Install firebase cli

### set env files

- `functions/analyze_content_with_gemini/.env`
```
GEMINI_API_KEY=<GET-FROM-GOOGLE-CLOUD-CONSOLE>
ALLOWED_ORIGINS=https://<PROJECT_ID>.web.app,https://another-allowed-origin.com,http://localhost:3000
MAX_CONTENT_LENGTH=10_000
```

- `functions/recaptcha/.env`
```
REGION=asia-east1
RECAPTCHA_SECRET_KEY=<GET-FROM-GOOGLE-CLOUD-CONSOLE>
```

- `hosting/.env.local`

Refer to `hosting/tools/.env.template`


## Local deploy

### backend - local

```
cd $(git rev-parse --show-toplevel)
firebase emulators:start --only functions
```

### frontend - local

```
cd $(git rev-parse --show-toplevel)/hosting
export PROJECT_ID="<PROJECT_ID>"
echo local | bash tools/update_env_local.sh
npm run dev
```

## Dev deploy

### frontend dev

```
cd $(git rev-parse --show-toplevel)/hosting
export PROJECT_ID="<PROJECT_ID>"
echo dev | bash tools/update_env_local.sh
npm run build
firebase deploy --only hosting
```

## Prod deploy

### backend - prod

- Deploy python function in firebase functions
```
cd $(git rev-parse --show-toplevel)/functions/analyze_content_with_gemini
python3.13 -m venv venv
source venv/bin/activate
python3.13 -m pip install -U -r requirements.txt
firebase deploy --only functions:analyze_content_with_gemini
deactivate
```

- Deploy TypeScript function in firebase functions
```
cd $(git rev-parse --show-toplevel)/functions/recaptcha
npm install
firebase deploy --only functions:verify_recaptcha
```

### frontend - prod

Note: Use Node 22 even warnings are shown
```
nvm use 22
cd $(git rev-parse --show-toplevel)/hosting
npm install
export PROJECT_ID="<PROJECT_ID>"
echo prod | bash tools/update_env_local.sh
npm run build
firebase deploy --only hosting
```
