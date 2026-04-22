# SECURITY.md

## Identified Threats and Mitigations

### 1. Prompt Injection
- Users may try to manipulate AI prompts
- Mitigation: Input sanitization and validation

### 2. API Key Exposure
- Risk of leaking Groq API key
- Mitigation: Store in .env and never commit to GitHub

### 3. Rate Limiting Abuse
- Too many requests can overload system
- Mitigation: Implement flask-limiter (30 req/min)

### 4. Malicious Input (HTML/Script Injection)
- Users may send harmful scripts
- Mitigation: Strip HTML tags from input

### 5. AI Downtime / API Failure
- Groq API may fail or be unavailable
- Mitigation: Retry logic + fallback response