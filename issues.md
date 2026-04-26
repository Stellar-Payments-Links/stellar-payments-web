# GitHub Issues Backlog

## Beginner Issues

### 1) Add copy button for payment link URL
**Description:** Add a one-click copy button in `stellar-payments-web/app/create/page.tsx` after successful link generation.  
**Acceptance Criteria:**  
- Copy button visible only when URL exists  
- Clipboard API used with fallback message  
- Success/error toast or inline message shown

### 2) Add loading spinner on create payment action
**Description:** Prevent duplicate submissions and improve UX while creating links.  
**Acceptance Criteria:**  
- Submit button disabled while request is pending  
- Spinner or loading text appears  
- Multiple rapid clicks create only one request

### 3) Add empty state illustration for dashboard
**Description:** Improve new-user experience when there are no transactions.  
**Acceptance Criteria:**  
- Empty state block with short explanation  
- CTA to `/create` included  
- No layout shift when transactions appear

### 4) Improve form validation messages
**Description:** Add friendly client-side validation for amount, destination key, and title.  
**Acceptance Criteria:**  
- Invalid fields show contextual messages  
- Submit blocked until all required fields are valid  
- Error messages disappear when corrected

### 5) Add reusable `PageHeader` component
**Description:** Avoid duplicate page heading markup across landing/create/dashboard pages.  
**Acceptance Criteria:**  
- New component in `components/`  
- Used by at least 3 pages  
- No visual regressions

### 6) Add API error helper utility
**Description:** Normalize fetch error parsing into one utility function.  
**Acceptance Criteria:**  
- New helper in `utils/`  
- `services/api.ts` uses helper  
- Existing error behavior preserved

### 7) Add `.nvmrc` files for both repos
**Description:** Standardize Node.js version for contributors.  
**Acceptance Criteria:**  
- `.nvmrc` exists in web and api repos  
- READMEs mention version usage  
- CI/workflows reference same version

### 8) Add health check badge and status section
**Description:** Update README with health endpoint and expected response example.  
**Acceptance Criteria:**  
- `GET /health` documented clearly  
- Example response included  
- Badge or status note added

### 9) Add basic unit tests for validators
**Description:** Introduce lightweight test setup and test amount/key validators.  
**Acceptance Criteria:**  
- Test runner configured  
- At least 4 test cases for positive/negative inputs  
- Test command added to package scripts

## Intermediate Issues

### 10) Persist API data with PostgreSQL
**Description:** Replace in-memory arrays with PostgreSQL tables for payments and transactions.  
**Acceptance Criteria:**  
- Schema migration committed  
- Create/get/pay/list endpoints operate on DB  
- Local setup docs updated with DB instructions

### 11) Add pagination to `GET /transactions`
**Description:** Improve scalability for merchants with large payment volume.  
**Acceptance Criteria:**  
- Query params: `page`, `limit`  
- Response includes pagination metadata  
- Default values applied and validated

### 12) Add rate limiting middleware
**Description:** Protect API from abuse and accidental spam.  
**Acceptance Criteria:**  
- Rate limiter applied to payment endpoints  
- Configurable via env variables  
- 429 response documented

### 13) Add request logging and correlation IDs
**Description:** Improve operability for debugging payment issues.  
**Acceptance Criteria:**  
- Each request has correlation ID  
- Logs include route, status, duration  
- Correlation ID returned in response headers

### 14) Add QR code rendering for payment links
**Description:** Let merchants display QR for in-person payments.  
**Acceptance Criteria:**  
- QR generated from `/pay/:id` URL  
- Download option available  
- Works on mobile screens

### 15) Implement Freighter wallet support
**Description:** Add option to sign with Freighter in addition to local secret wallet.  
**Acceptance Criteria:**  
- Freighter detect/connect flow implemented  
- Payment signing works through extension  
- Fallback to local wallet still works

### 16) Add i18n support (English + French)
**Description:** Improve accessibility for broader audience.  
**Acceptance Criteria:**  
- Language switcher added  
- Core flows translated (landing/create/pay/dashboard)  
- Contributor docs explain translation process

### 17) Add transaction detail page with explorer links
**Description:** Add deeper visibility into individual payment records.  
**Acceptance Criteria:**  
- New route displays tx metadata  
- Link to Stellar expert/explorer included  
- Handles missing tx gracefully

### 18) Add webhook for payment confirmation
**Description:** Notify external systems when a payment is marked paid.  
**Acceptance Criteria:**  
- Configurable webhook URL and secret  
- Retry policy for transient failures  
- Webhook event schema documented

## Advanced Issues

### 19) Harden `/payments/pay` verification logic
**Description:** Verify destination account and amount by inspecting transaction operations from Horizon, not just tx success.  
**Acceptance Criteria:**  
- Backend fetches and validates operation details  
- Rejects mismatched destination/amount  
- Unit/integration tests added

### 20) Add idempotency keys for payment processing
**Description:** Prevent duplicate processing during retries/network errors.  
**Acceptance Criteria:**  
- `Idempotency-Key` supported on `/payments/pay`  
- Duplicate keys return original result  
- Behavior documented

### 21) Build end-to-end Playwright tests
**Description:** Validate create/share/pay flow automatically in CI.  
**Acceptance Criteria:**  
- E2E tests cover successful and failing paths  
- CI workflow runs tests on pull requests  
- Flaky tests mitigated with stable selectors

### 22) Add OpenAPI spec and API docs site
**Description:** Improve integration readiness for external builders.  
**Acceptance Criteria:**  
- OpenAPI file generated and versioned  
- Interactive docs available  
- Endpoint examples match implementation

### 23) Add observability stack (metrics + alerts)
**Description:** Expose operational metrics and define alerting thresholds.  
**Acceptance Criteria:**  
- Metrics endpoint added  
- Core metrics: request latency, error rate, tx verification failures  
- Alert thresholds documented

### 24) Introduce optional multisig payout workflow
**Description:** Add advanced account flow for organizations needing shared approval before sending funds.  
**Acceptance Criteria:**  
- Design doc for non-custodial multisig integration  
- MVP implementation behind feature flag  
- Security considerations documented

### 25) Add anti-phishing payment link signatures
**Description:** Protect users from tampered links by signing payload metadata.  
**Acceptance Criteria:**  
- Link payload includes verifiable signature  
- API validates signature before serving payment details  
- Key rotation process documented

### 26) Add accessibility audit and remediation
**Description:** Ensure the UI is usable for keyboard and screen-reader users.  
**Acceptance Criteria:**  
- Run accessibility audit tooling  
- Fix high and medium severity issues  
- Add accessibility checklist to PR template
