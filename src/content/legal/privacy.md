# Privacy Policy — Theosis Health

**Effective date:** [VERIFY: launch date] · **Last updated:** [date]

Theosis Health LLC ("we," "us"), 4026 Bristol Dr., Danville, IL 61834, runs theosishealth.com and its tools (the "Service"). This policy explains what we collect, why, who processes it, how long we keep it, and your choices. Contact: **nick@theosishealth.com**.

**The short version**
- **Photo upload and AI photo projections are currently turned off** for the public. They'll be turned on only after the biometric consent step (Section 3) is live. Until then, we collect no photos or biometric information.
- Most of what you enter in the simulator and calculators **stays in your browser on your device**. We don't have a user database for it. [VERIFY if accounts/Supabase are added.]
- When you choose an AI feature, your photo or lab report is sent to **Google (Gemini API)** to make the result, and is **not saved by us**.
- **We don't sell your data**, share it for advertising, or use ad pixels or session replay.
- We aren't a HIPAA covered entity, and this Service isn't "HIPAA compliant." Laws like the FTC Health Breach Notification Rule and state health-data laws still apply, and we follow them.

## 1. What we collect and how

| Data | Where it goes | Kept for |
|---|---|---|
| Info you type in tools (age, sex, height, weight, waist, activity, diet, diabetes status you select, A1c/glucose, goals) | Stored **in your browser** (local storage) | Until you clear it or use "Delete my data" in the app |
| Check-in photos and AI images you save | Stored **in your browser** (IndexedDB) | Until you delete them or clear site data |
| Body-shape estimates from photos (biometric info, see Section 3) | Computed **on your device** | Not kept by us. Deleted with your photos |
| Photo sent for an AI illustration | Sent through our server to **Google Gemini API**; the AI image is returned to you | **Not stored, logged, or kept by us.** See Section 4 for Google |
| Lab report photo/PDF you upload for AI reading | Sent through our server to **Google Gemini API**; values return for you to confirm | Not stored by us |
| AI chat questions (if used) | Google Gemini API | Not stored by us |
| Food searches | Sent to public food databases (USDA FoodData Central, Open Food Facts) | Not stored by us |
| Technical data (IP address, browser, request logs) | Our host (Netlify). IP addresses are converted to a one-way hash for daily usage limits | Usage counters reset daily. Host logs follow Netlify's retention [VERIFY] |
| Emails you send us | Our email provider (Microsoft 365 via GoDaddy) | As long as needed to respond, then up to 3 years [VERIFY] |
| Payment info (only if subscriptions launch) | **Stripe** collects card details; we see only name, email, plan, and last 4 digits | As tax/accounting law requires (usually 7 years) |

We don't collect precise location and we don't use geofencing.

## 2. How we use it
Only to: run the features you ask for, keep the Service secure and prevent abuse (rate limits), respond to you, process payments if you subscribe, and meet legal obligations. **We don't use your health or biometric data for advertising, profiling, or AI training**, and we don't sell it.

## 3. Biometric information (Illinois BIPA and similar laws)
Some photo features estimate body-shape landmarks from your photo, and images of your face may be processed to create AI illustrations. Illinois law (the Biometric Information Privacy Act, 740 ILCS 14) and similar laws in Texas, Washington, and elsewhere treat this as biometric information. Here is our **written policy**:

- **Notice and consent first.** We will not capture, collect, or process biometric information until you have read this notice and given **written consent** by checking the biometric consent box in the app. Photo features stay off without it.
- **Purpose.** Only to draw your figure and create the AI illustrations you request. We don't use it to identify you, for facial recognition, or to verify identity.
- **Length of use.** For as long as you're using that feature in a session or keep your saved photos.
- **Retention and destruction schedule.** We don't store biometric information or photos on our servers. Photos sent for AI processing pass through our server only in memory and are discarded once the request finishes. Photos and estimates saved in your browser stay on your device until you delete them. In all cases, biometric information will be **permanently destroyed when its purpose is fulfilled or within 3 years of your last interaction with the Service, whichever is first**, as BIPA requires. [VERIFY: Google's retention matches Section 4.]
- **Disclosure.** We share it only with our processor, Google (Gemini API), to perform the feature, under contract terms that limit its use [VERIFY], or where the law requires.
- **No sale or profit.** We will **never sell, lease, trade, or otherwise profit** from your biometric information.
- **Security.** We protect it with at least the same care we use for other sensitive information, including encrypted (HTTPS) transmission.
- **Withdrawing consent.** You can withdraw consent anytime in the app's privacy settings and delete your saved photos. Upload only your own photos, and never photos of anyone under 18.

## 4. Google Gemini (AI processor)
AI features use the **Google Gemini API** as our service provider. We use the **paid** API tier, under which Google states it doesn't use prompts or outputs to improve its products. Google may keep data for a limited time (about 55 days [VERIFY current terms]) to detect abuse and comply with law. Google's own privacy terms apply to that processing. AI images are labeled as illustrations.

## 5. Consumer health data (Washington My Health My Data Act, Nevada SB 370, Connecticut, and similar laws)
This section is our **Consumer Health Data Privacy Policy**. [VERIFY: link it separately from the homepage footer.]
- **Categories collected:** body measurements, weight, diet and activity, diabetes status you select, lab values like A1c and glucose, photos and body-shape estimates, and health goals.
- **Sources:** you, directly. Also AI reading of lab reports you upload, which you confirm.
- **Purposes:** to provide the educational features you request, and security.
- **Sharing:** only with processors that perform services for us: Google (AI features), Netlify (hosting), and Stripe (payments, no health data). We don't sell consumer health data.
- **Consent:** We collect consumer health data only with your consent for the specific feature (in-app consent) or as needed to provide the service you asked for. We'll ask for **separate consent before sharing** it for any other purpose. We'd need a separate signed authorization to ever sell it, and we don't sell it.
- **Your rights:** confirm whether we have your data, access it, delete it, withdraw consent, and get a list of the third parties and processors who received it. Because most data is stored only on your device, you can view and delete it in the app yourself. Email nick@theosishealth.com for anything we or our processors hold. We'll respond within 45 days. If we deny a request, you can appeal by replying "Appeal," and if you're still unhappy, you can contact your state Attorney General.
- **No geofencing** around health-care locations.

## 6. FTC Health Breach Notification Rule
If there is a breach of unsecured identifiable health information, including an unauthorized disclosure, we will notify affected users, the FTC, and where required the media, **without unreasonable delay and within 60 days** of discovery, as the FTC Health Breach Notification Rule (16 CFR Part 318) requires.

## 7. Cookies, local storage, and analytics
- We use **essential storage only**: browser local storage and IndexedDB to remember your inputs, saved photos, consent choices, and settings. A service worker lets the app work offline. If accounts are offered, we use a strictly necessary sign-in cookie.
- **No advertising cookies, tracking pixels, or session replay**, and no third-party analytics. [VERIFY before launch, including Netlify Analytics.] If we ever add privacy-friendly analytics, we'll update this policy first and keep them off health tool pages.
- We honor **Global Privacy Control**. Since we don't sell or share data for advertising, there's nothing more to opt out of.

## 8. Your privacy rights (California and other states)
Depending on where you live, you may have the right to know, access, correct, delete, and take a copy of your personal information, to opt out of sale, sharing, targeted advertising, or profiling (we do none of these), to limit use of sensitive information (we already use it only to provide the Service), and not to be discriminated against for using these rights. Email nick@theosishealth.com. We'll verify your request in a reasonable way and respond within the time the law requires (usually 45 days). An authorized agent can make a request for you with proof of authorization. [Note: CCPA thresholds likely don't apply yet. We honor these rights voluntarily.]

## 9. Children
The Service is for adults **18+**. We don't knowingly collect information from children under 13 (COPPA) or minors. If you believe a child provided information, email us and we'll delete it.

## 10. Retention
We keep data only as long as described in Section 1 and the biometric schedule in Section 3, or longer only where the law requires it (for example, payment records).

## 11. Security
We use HTTPS encryption, keep data on your device where possible, store no photos on our servers, hash IP addresses, apply rate limits, and limit who can access systems. No system is perfectly secure. Protect your device, because saved data lives there.

## 12. Theosis Medical is separate
Theosis Medical LLC (theosismedical.com) is a separate clinical company with its own privacy practices. Don't send patient or clinical information to theosishealth.com or nick@theosishealth.com.

## 13. Changes
We'll post updates here with a new date. For material changes, especially to how we use health or biometric data, we'll give notice and ask for consent where required.

## 14. Contact
Theosis Health LLC · 4026 Bristol Dr., Danville, IL 61834 · nick@theosishealth.com
