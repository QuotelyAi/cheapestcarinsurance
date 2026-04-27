# Multi-Site JotForm Setup with Source Tracking

## Overview

All your insurance sites can now share the same JotForm and automatically tag leads with their source website.

**How it works:**
```
cheapestcarinsurancetulsa.com/quote?sms_consent=true
          ↓
[Automatic source detection: cheapestcarinsurancetulsa.com]
          ↓
JotForm submission tagged with: Source Website: cheapestcarinsurancetulsa.com
          ↓
Email & leads.json file shows which site the lead came from
```

---

## Setup for Multiple Sites

### Step 1: Copy API Routes to Other Projects

Copy these folders to each new insurance site project:
```
from: /c/users/dusti/sites/cheapestcarinsurance/site/src/app/api/jotform/
to:   /c/users/dusti/sites/[other-site]/site/src/app/api/jotform/

from: /c/users/dusti/sites/cheapestcarinsurance/site/src/app/quote/
to:   /c/users/dusti/sites/[other-site]/site/src/app/quote/
```

### Step 2: Add JotForm Env Variables

In each site's `.env.local`, add:
```env
JOTFORM_API_KEY=fc9c233c3a9324f1984e107b4ba7db79
JOTFORM_FORM_ID=242546337686164
JOTFORM_WEBHOOK_SECRET=fc9c233c3a9324f1984e107b4ba7db79
```

### Step 3: That's It!

Source tracking is **automatic**. The backend detects which domain the request came from.

---

## Source Tracking Examples

### Lead from Tulsa Site
```
Form URL: https://cheapestcarinsurancetulsa.com/quote?sms_consent=true
Source Website: cheapestcarinsurancetulsa.com
```

### Lead from OKC Site
```
Form URL: https://cheapestcarinsuranceokc.com/quote?email=john@example.com
Source Website: cheapestcarinsuranceokc.com
```

### Lead from Broken Arrow Site
```
Form URL: https://brokenarrowinsuranceok.com/quote?phone=4055551234
Source Website: brokenarrowinsuranceok.com
```

All leads go to the same JotForm form but are tagged with their origin!

---

## Email Notifications

When JotForm sends an email notification about a new lead, it will include:

```
Name: John Doe
Email: john@example.com
Phone: (405) 555-1234
Source Website: cheapestcarinsuranceokc.com
SMS Consent: Yes
```

The email clearly shows which website the lead came from.

---

## Leads JSON File

The `content/leads.json` file logs all submissions with source tracking:

```json
{
  "leads": [
    {
      "id": "1738694400000-a1b2c3d4",
      "type": "form",
      "uploadedAt": "2026-02-04T12:27:47Z",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "(405) 555-1234",
      "sourceWebsite": "cheapestcarinsuranceokc.com",
      "submissionId": "242546337686164-1738694400"
    }
  ]
}
```

---

## Websites Using This Setup

Add to this list as you set up each site:

- ✅ **cheapestcarinsurancetulsa.com** - ACTIVE
- [ ] cheapestcarinsuranceokc.com
- [ ] brokenarrowinsuranceok.com
- [ ] sandspringsinsurance.com
- [ ] [Add more...]

---

## FAQ

### Q: Do I need separate JotForm forms for each site?
**A:** No, you can use one form for all sites. Source tracking is automatic via the `sourceWebsite` field.

### Q: Can leads from different sites see each other?
**A:** No, they all submit to the same form but are tracked separately in the webhook. You can view/organize them by source in JotForm.

### Q: What if I want separate forms per site?
**A:** You can create different forms, but use the same webhook to aggregate all leads in one place. Update `JOTFORM_FORM_ID` per site's `.env.local`.

### Q: Will the source tag appear in JotForm's email?
**A:** Yes, it's a regular form field. You can customize how it appears in JotForm's email settings.

### Q: Can I filter leads by source in JotForm?
**A:** Yes, JotForm has filtering. Filter by "Source Website" field to see leads from a specific site.

---

## Implementation Checklist

For each new site:

- [ ] Copy `/api/jotform/` folder
- [ ] Copy `/app/quote/` folder
- [ ] Add JotForm env variables to `.env.local`
- [ ] Test: `npm run dev`
- [ ] Visit: `http://localhost:3000/quote?sms_consent=true`
- [ ] Verify source shows up correctly
- [ ] Deploy to Vercel
- [ ] Test live: `https://[site].com/quote?sms_consent=true`
- [ ] Check JotForm for new lead with source tag
- [ ] Add to "Websites Using This Setup" list above

---

## Support

If a site's source doesn't appear:

1. Check `.env.local` has `JOTFORM_API_KEY`
2. Verify form is accessible: `npm run dev` then visit `/quote`
3. Check browser DevTools → Network → `/api/jotform/prefill` response
4. Source should be in response JSON

If you're manually passing source:
```
https://yoursite.com/quote?source=customname
```

The automatic detection will override it. To disable auto-detection and use custom source:

Edit `/src/app/api/jotform/prefill/route.ts` line that says:
```typescript
if (referer && !data.sourceWebsite) {
  data.sourceWebsite = extractDomain(referer);
}
```

---

## Next Steps

1. Set up next website
2. Test source tracking
3. Monitor JotForm for incoming leads
4. Adjust field mapping as needed
