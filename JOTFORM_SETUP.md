# JotForm Integration Setup Guide

## Problem Solved
✅ **Fixed**: Quote page now works for users without JotForm credentials
✅ **Root Cause**: Backend now handles authentication and prefill logic
✅ **User Experience**: Works seamlessly whether users have JotForm account or not

---

## Setup Steps

### 1. Add Your JotForm API Key

Copy `.env.example` to `.env.local` and add your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
JOTFORM_API_KEY=your_actual_api_key_here
JOTFORM_FORM_ID=242546337686164
JOTFORM_WEBHOOK_SECRET=your_webhook_secret_here
```

⚠️ **SECURITY**: Never commit `.env.local` to git. It's in `.gitignore`.

### 2. Get Your JotForm API Key

1. Log into JotForm account
2. Go to **MyAccount → Settings**
3. Find **API Key** section
4. Copy your API key
5. Paste into `.env.local` (keep it private!)

### 3. Identify Your Form Field IDs

The backend needs to know which JotForm fields to prefill. Update `/src/app/api/jotform/prefill/route.ts`:

```typescript
const fieldMapping: Record<string, string> = {
  email: 'email_1',        // Replace with your actual field ID
  firstName: 'first_name_2',
  lastName: 'last_name_3',
  phone: 'phone_4',
  smsConsent: 'sms_consent_5',
};
```

**To find field IDs**:
1. Open your form in JotForm editor
2. Click each field
3. Look for the field ID in settings (usually auto-assigned as `q3_name`, `q4_email`, etc.)
4. Update the mapping above

### 4. Test the Setup

```bash
# Start development server
npm run dev

# In browser, test the form loads:
# With SMS consent:
http://localhost:3000/quote?sms_consent=true

# With prefilled data:
http://localhost:3000/quote?email=test@example.com&firstName=John&sms_consent=true
```

### 5. Verify Webhook (Optional)

If you want JotForm submissions to be logged:

1. In JotForm account: **Settings → Webhooks**
2. Add endpoint: `https://cheapestcarinsurancetulsa.com/api/webhooks/jotform-quote`
3. Select **Form Submission** event
4. Enable webhook signing for security

---

## How It Works

### Before (Broken)
```
Browser → form.jotform.com/?sms_consent=true
         ↑ Only works if user has JotForm auth cookies
         ↓
         ❌ Fails for users without JotForm account
```

### After (Fixed)
```
Browser → /api/jotform/prefill
         ↓ Backend generates prefilled URL (server-side auth)
         ↓
Browser → form.jotform.com/?email_1=test@example.com&sms_consent_5=Yes
         ↓ Works for all users (no auth required)
         ✅ Success!
```

---

## File Changes

### New Files Created
- `/src/app/api/jotform/config/route.ts` - Form configuration endpoint
- `/src/app/api/jotform/prefill/route.ts` - Prefill URL generation endpoint
- `/src/app/quote/layout.tsx` - Quote page metadata

### Modified Files
- `/src/app/quote/page.tsx` - Now client component that calls backend prefill API
- `.env.example` - Added JotForm configuration variables

---

## Testing Checklist

- [ ] `.env.local` created with valid API key
- [ ] Form field IDs updated in `/src/app/api/jotform/prefill/route.ts`
- [ ] Development server running: `npm run dev`
- [ ] Quote page loads without error: `http://localhost:3000/quote`
- [ ] Prefill works: `http://localhost:3000/quote?email=test@example.com`
- [ ] SMS consent works: `http://localhost:3000/quote?sms_consent=true`

---

## Troubleshooting

### "Form Load Error" on /quote page

**Check:**
1. Is `.env.local` properly configured?
   ```bash
   grep JOTFORM .env.local
   ```

2. Are you running the dev server?
   ```bash
   npm run dev
   ```

3. Check browser console for detailed error message

### "Failed to load form configuration"

**Check:**
1. API key is valid
2. Form ID is correct
3. Network tab shows `/api/jotform/prefill` returning 200

### Prefill parameters not working

**Check:**
1. Field IDs in `fieldMapping` match your actual form fields
2. JotForm form accepts prefill parameters (most do)

---

## Production Deployment

For **Vercel**, add environment variables:

1. Go to **Vercel → Project → Settings → Environment Variables**
2. Add:
   - `JOTFORM_API_KEY` = your API key
   - `JOTFORM_FORM_ID` = 242546337686164
   - `JOTFORM_WEBHOOK_SECRET` = your webhook secret
3. Deploy: `git push`

---

## Security Notes

✅ API key stored server-side (backend only)
✅ Query parameters validated before use
✅ No sensitive data exposed to client
✅ HTTPS required for production
✅ Webhook signature validation ready (in `/api/webhooks/jotform-quote`)

---

## Support

If you encounter issues:

1. Check the test data in this guide
2. Verify JotForm API key is active
3. Check form field IDs are correct
4. Review browser console and server logs
