# Stellar Payment Links Web

## Mission
Stellar Payment Links Web is a public-good interface that lets anyone create and share simple XLM payment requests, reducing onboarding friction for freelancers, creators, and micro-businesses.

## Problem Statement
Many people in underserved regions can receive digital payments only if they understand wallets, blockchain explorers, and request formats. This technical barrier excludes non-developers from participating in global work and commerce.

## Solution
This frontend provides a no-code payment link flow:
1. Create a wallet locally in-browser (or import one)
2. Create a payment request linked to a backend payment record
3. Share the URL so a payer can open and pay in XLM
4. Sign transaction client-side and send to Stellar

## Key Features
- Local wallet generation/import (browser storage only)
- Payment link creation form
- Dynamic pay page (`/pay/[id]`)
- Dashboard with transaction history
- API integration with `stellar-payments-api`

## How It Works
Create -> Share -> Pay
- **Create:** user fills title, amount, destination address
- **Share:** app returns a unique public payment URL
- **Pay:** payer signs transaction on frontend and backend verifies hash via Horizon

## Architecture Overview
- Next.js App Router UI
- Client-side Stellar signing (`stellar-sdk`)
- Backend API for payment metadata + transaction audit trail
- Horizon network for transaction settlement and verification

## Setup Instructions
1. Install dependencies:
   - `npm install`
2. Create env file:
   - `cp .env.example .env.local`
3. Run:
   - `npm run dev`
4. Open:
   - `http://localhost:3000`

## Test Payment Flow
1. Start backend on `http://localhost:5000`
2. Open `/create`, load wallet, paste funded testnet destination account
3. Create link and open generated `/pay/:id` URL
4. Click Pay and confirm transaction hash appears
5. Check `/dashboard` for recorded transaction

## Deployment (Vercel)
1. Push repository to GitHub
2. Import project in Vercel
3. Add env vars:
   - `NEXT_PUBLIC_API_URL=https://<your-backend-domain>`
   - `NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org`
4. Deploy

## Contribution Guide Summary
See `CONTRIBUTING.md` for setup, issue workflow, and coding conventions.

## Roadmap
See `ROADMAP.md` for phased delivery plan.

## Funding Justification
This project serves public infrastructure goals: low-cost remittance acceptance, creator monetization, and easier financial participation for people with limited technical experience. Funding improves documentation, localization, security hardening, and support for nonprofit onboarding.

## Transparency Commitment
- Open repository and issue tracker
- Public roadmap and changelog
- Community-led prioritization
- Clear disclosure of technical limitations and threat model
