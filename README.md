# my-temporary-posts-bot-bucket-user

## What it does

An AWS Lambda function, written in TypeScript, that checks the current
Ethereum mainnet gas price (via [web3.js](https://web3js.org/) and Alchemy)
and sends the result as a message through a Telegram bot. It is a small,
educational serverless example: one Lambda handler, no framework.

## Stack

- TypeScript, compiled with `gulp` + `gulp-typescript`
- [web3.js](https://web3js.org/) for reading chain ID and gas price from
  Ethereum mainnet
- Telegram Bot API (`sendMessage`) for delivering the result
- AWS Lambda (compute) and AWS S3 (deployment artifact storage)
- Node.js 20.12.2 (see `.nvmrc`)

## How it deploys

`.github/workflows/deploy.yml` runs on every push to `main`:

1. Checks out the code and installs dependencies (`npm ci`).
2. Builds the project (`npm run build`, via `gulpfile.js`) into `dist/`.
3. Zips the build output, named with the Lambda function name, short commit
   SHA, and a timestamp.
4. Uploads the zip to the `my-temporary-posts-bot-bucket` S3 bucket
   (`us-east-1`), using AWS credentials from repo secrets.
5. Calls `aws lambda update-function-code` to point the
   `MyTemporaryPostsBotLambda` function at the new S3 object.

## How to run

```bash
npm install
npm run build      # compiles src/ to dist/ via gulp
```

`src/index.ts` exports a single `handler` function, the standard AWS Lambda
entry point. Before deploying or invoking it, replace the placeholder values
in the file with real credentials:

- `ALCHEMY_TOKEN` — an [Alchemy](https://www.alchemy.com/) API key for the
  Ethereum mainnet RPC endpoint
- `TELEGRAM_TOKEN` — a Telegram bot token
- `CHAT_ID` — the Telegram chat or user ID to send messages to

To deploy, push to `main` (see the GitHub Actions workflow above), or zip
`dist/` yourself and upload it to Lambda manually.

## Background

[Video on YouTube](https://youtu.be/8yL4sh-ltU0) ·
[Article on DOU](https://dou.ua/forums/topic/50197) ·
[Article on Medium](https://serginyo90.medium.com/our-serverless-journey-deploying-typescript-projects-to-aws-lambda-creating-a-telegram-bot-and-4414b921b84c)

---

## Русский

# Развертывание TypeScript на AWS Lambda, создание Telegram-бота и мониторинг цен на газ Ethereum
## [Видео на YouTube](https://youtu.be/8yL4sh-ltU0)
## [Статья на DOU](https://dou.ua/forums/topic/50197)
## [Article on medium](https://serginyo90.medium.com/our-serverless-journey-deploying-typescript-projects-to-aws-lambda-creating-a-telegram-bot-and-4414b921b84c)
