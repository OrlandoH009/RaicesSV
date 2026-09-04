# Terms and Conditions of Use — Salvadorean Roots

**Last updated:** August 31, 2026

Welcome to **Salvadorean Roots** (the "Platform," "Site," or "we"), a web portal dedicated to preserving, exploring, and celebrating the culture of El Salvador. By accessing, registering for, or using any feature of the Platform, you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree, please do not use the Site.

These Terms are governed by the laws of the **Republic of El Salvador**.

---

## 1. About the Platform

Salvadorean Roots is a cultural and informational project, without prejudice to the possibility that it may operate in the future under a specific legal structure (an individual or a registered entity). References in this document to "we," "us," or "the team" refer to whoever administers and operates the Platform on its behalf.

The Platform offers, among other features:

- Informational content about the history, gastronomy, legends, cultural sites, and events of El Salvador.
- An interactive, georeferenced map.
- A gamified cultural quiz and interactive mini-games.
- A community wall of user-generated posts, photos, and comments.
- Account registration, user profiles, and sign-in (local or via Google).
- A conversational artificial intelligence assistant (the "cultural chatbot").
- An administration and content moderation panel.

We reserve the right to add, modify, suspend, or remove any feature of the Site at any time, without this generating any liability toward users, to the extent permitted by law.

---

## 2. User Accounts

### 2.1 Registration
To access certain features (posting content, commenting, playing the quiz with recorded scores, editing your profile), you must create an account, either:

- Using an email address and password (stored encrypted, never in plain text), or
- By signing in with your **Google** account (OAuth).

### 2.2 Accuracy of information
You agree to provide truthful information and to keep it up to date. You are responsible for the confidentiality of your credentials and for all activity carried out from your account.

### 2.3 Minimum age
The Platform is not directed at children under 13 years of age. If you are between 13 and 18 years old, you must have the authorization of a parent or legal guardian to use the Site.

### 2.4 Roles
The Platform has different access levels (for example, User, Admin, and Founder). Administrative roles are assigned internally and carry additional moderation responsibilities.

### 2.5 Account deletion
You may request permanent deletion of your account from your profile settings. This action is irreversible and will remove your profile information as described in the Privacy section.

---

## 3. User-Generated Content

### 3.1 What you can post
The community posts section lets you share photos, descriptions, geographic locations, and comments related to Salvadorean culture.

### 3.2 Content rules
By posting, you warrant that your content:

- Is your own work or that you hold the necessary rights to share it.
- Does not contain illegal, defamatory, discriminatory, violent, sexually explicit, or hateful material.
- Does not infringe the intellectual property, privacy, or image rights of third parties.
- Does not constitute spam, unauthorized advertising, or impersonation.
- Reasonably fits the cultural and community purpose of the Platform.

### 3.3 License to your content
By posting content on the Platform, you grant us a non-exclusive, worldwide, royalty-free license to store, display, reproduce, and distribute that content within the Site, solely to operate and promote the Platform. You retain ownership of your content and may delete it at any time, except for copies already stored in technical backups, which are purged during normal backup cycles.

### 3.4 Moderation
We reserve the right to review, hide, or remove any post or comment that violates these Terms, without prior notice. Accounts that repeatedly violate these Terms may be temporarily or permanently suspended.

### 3.5 Appeals
If your account is suspended, you may submit an appeal through the form available on the Site. The moderation team will review your case, with no guaranteed response time.

### 3.6 Technical upload limits
For security and resource-management reasons, there are technical limits on image uploads (currently up to 20 post photos and 10 avatars per user every 24 hours, with a maximum file size of 3MB, in JPEG, PNG, or WEBP format). These limits may change without prior notice.

---

## 4. Artificial Intelligence Assistant (Cultural Chatbot)

The Platform includes a conversational assistant that uses third-party language models (through compatible providers, such as OpenRouter) to answer questions about Salvadorean history and culture. This same engine also powers the Amazon Alexa voice skill described in Section 8.

- The assistant's responses are generated automatically and **may contain inaccuracies**. They should not be treated as an academic, legal, medical, or other specialized source without further verification.
- Messages you send to the chatbot may be transmitted to the corresponding AI provider to generate a response, as described in the Privacy section.
- Avoid sharing sensitive personal information with the chatbot that is not necessary for your query.

---

## 5. Interactive Map and Location Data

The cultural map and the location picker used when creating posts rely on **Leaflet** together with **OpenStreetMap** map tiles. If you use the map or create posts with a location, you may select or share geographic coordinates associated with your content, and these coordinates are displayed publicly alongside the corresponding post.

If you use the **"use my location"** option, your browser will request permission to access your position (GPS or network-based), and once obtained, the coordinate is sent to the **Nominatim (OpenStreetMap)** geocoding service to convert it into a readable place name. You may choose not to grant this permission and enter the location manually on the map or as text instead.

Do not share locations that could compromise your privacy or safety (for example, your home address) if you do not wish to make them public.

---

## 6. Cultural Quiz and Mini-Games

The cultural quiz and mini-games are offered for entertainment and cultural education purposes. Scores you obtain may be stored and associated with your account for your personal history. We do not guarantee the absolute accuracy of every quiz question, although we strive to keep the content reliable; if you find an error, you can report it.

---

## 7. Third-Party Services and Integrations

To function properly, the Platform relies on external providers. By using the Site, you acknowledge that certain features depend on these third parties and are also subject to their own terms and policies:

| Service | Function on the Platform |
|---|---|
| **Google (OAuth 2.0)** | Sign-in with your Google account. |
| **OpenRouter-compatible AI provider** | Processing of cultural chatbot messages. |
| **Cloudflare R2** | Storage of profile images (avatars) and post photos. |
| **Database provider** (MySQL-compatible, e.g. TiDB Cloud / Aiven) | Storage of account, post, comment, and score data. |
| **SMTP email provider** | Sending password-recovery emails and transactional notifications. |
| **Vercel** (or another hosting provider) | Hosting and delivery of the Site. |
| **Amazon Alexa** | Voice platform on which the "Pupusita" skill runs (see Section 8). Amazon processes voice and transcription under its own terms. |
| **OpenStreetMap / Leaflet** | Rendering of maps and map "tiles" on the cultural map and in posts. |
| **Nominatim (OpenStreetMap)** | Address search and reverse geocoding (converting coordinates into a place name) when selecting a location for a post. |
| **YouTube** | Playback of demonstration videos embedded in the recipes section. |
| **Google Fonts** | Delivery of the site's typefaces (Fraunces, Inter). |
| **cdnjs, jsDelivr, unpkg** | Distribution of UI libraries used by the Site: GSAP and ScrollTrigger (animations), Chart.js (admin panel charts), Matter.js (mini-game physics engine), and Leaflet (maps). |
| **html2pdf.js** | Generates a PDF of a recipe directly in your browser when you use the download option; no data is sent to an external server for this feature. |

We do not control the privacy policies or availability of these third parties, and we are not responsible for service interruptions caused by failures outside our platform. These integrations may change as the project evolves.

---

## 8. Voice Assistant on Amazon Alexa ("Pupusita")

In addition to the chatbot available on the Site, Salvadorean Roots offers an **Amazon Alexa** skill called **"Pupusita,"** which lets you ask about Salvadorean culture and build voice-based trip itineraries on Alexa-compatible devices.

### 8.1 How it works
The Alexa skill is a component independent from the web portal: it runs on Amazon's infrastructure (AWS Lambda) and does not require or use a Salvadorean Roots user account. You do not need to sign in to the Site to use it, and using the skill does not create or modify any account on the portal.

When you make a voice query, Alexa transcribes it to text, and the skill may forward that query to our artificial intelligence assistant (the same engine described in Section 4) to generate a spoken response. We do not associate these queries with your personal identity or link them to any account on the Site.

### 8.2 Data managed by Amazon
Everything related to voice recording, its transcription, the management of your Amazon/Alexa account, device permissions, and the storage of that information **is Amazon's exclusive responsibility** and is governed by Amazon Alexa's own terms of use, service conditions, and privacy policy, not by these Terms. We recommend reviewing those documents directly through Amazon's official channels.

### 8.3 Scope and limitations
The skill is intended to provide reference cultural and tourism information (sites, gastronomy, festivities, legends) and itinerary suggestions with approximate costs. Responses are generated automatically by a language model and **may contain inaccuracies or outdated information**, particularly regarding cost figures or event availability. This feature depends on the availability of our servers and of Amazon's services; it may not always be available.

> By using the "Pupusita" Alexa skill, your interaction with the Alexa ecosystem (voice activation, Amazon account, device, permissions) is subject to Amazon's own terms and privacy policies, in addition to these Terms.

---

## 9. Privacy and Data Handling (Summary)

This section summarizes how we handle your personal data. We may publish a separate, more detailed Privacy Policy in the future; in the meantime, this summary is an integral part of these Terms.

### 9.1 Data we collect
- **Account data:** name, email address, password (encrypted) or Google identifier, bio, and profile photo.
- **Content you post:** photos, descriptions, comments, and location coordinates.
- **Technical usage data:** IP address and session metadata (including the session cookie described in Section 10), used for security (preventing brute-force attacks, upload limits) and to keep you signed in.
- **Messages sent to the chatbot** (through the Site or transcribed by voice via the Alexa skill), to the extent necessary to obtain a response from the AI provider. Voice queries are not associated with your Site account or personally identified on our end.
- **Score history** for the cultural quiz, associated with your account.

### 9.2 Purpose of processing
We use this data to: operate your account, display your content on the community wall and the map, let you recover your password, prevent abuse of the Platform, moderate content, and improve the service.

### 9.3 Who we share it with
Your data may be processed by the external providers listed in Section 7 (for example, your profile photo is stored on Cloudflare R2, and your chatbot messages are processed through the AI provider), only to the extent necessary to provide the service. We do not sell your personal data to third parties.

### 9.4 Security
We apply reasonable security measures, including password encryption, secure session cookies, login attempt limits, and HTTP security headers. No platform on the internet can guarantee absolute security.

### 9.5 Your rights
You can access, update, or delete your information from your profile, or by requesting it directly from the Site team. Deleting your account removes your personally identifiable information, except where the law or legitimate security reasons require retaining it for a reasonable additional period.

### 9.6 Minors
We do not knowingly collect data from children under 13. If we detect an account belonging to a child under that age, we will proceed to delete it.

---

## 10. Cookies and Browser Technologies

The Site uses a **session cookie** (necessary and technical in nature) to keep you signed in while using your account. This cookie is marked `httpOnly` and `sameSite: lax`, and in production it is transmitted only over secure connections (`secure`). We do not use advertising or third-party tracking cookies.

In addition to the session cookie, your **language** preference (Spanish/English) and **visual theme** (light/dark) are stored locally in your browser (`localStorage`), not on our servers, and you can clear them at any time through your browser settings.

Some features load resources directly from third-party servers, which may mean those third parties receive your IP address and basic technical data about your browser when the page loads:

- **Google Fonts**, for the Site's typefaces.
- **cdnjs, jsDelivr, and unpkg**, for UI libraries (animations, charts, mini-game physics, and maps).
- **OpenStreetMap**, for the map's visual tiles, and **Nominatim**, if you use address search or geolocation.
- **YouTube**, if you play a demonstration video in the recipes section.

If your browser or device allows it, you can block cookies or access to these external resources through its settings, although this may affect the operation of some visual or interactive parts of the Site.

---

## 11. Intellectual Property

The Platform's original content (historical texts, design, code, trademarks, logos, and original illustrations) is owned by Salvadorean Roots or its respective rights holders and is protected by applicable intellectual property laws. Personal, non-commercial use of the Site's informational content is permitted, provided the source is credited. Full or partial reproduction for commercial purposes without prior authorization is prohibited.

User-generated content is governed by the provisions of Section 3.

---

## 12. Acceptable Use

You may not use the Platform (including the chatbot and the Alexa skill) to:

- Attempt to compromise the security of the Site, its databases, or other users' accounts.
- Automate access to, or mass-extract (scrape), data without authorization.
- Upload malicious content (viruses, malware) or attempt to exploit vulnerabilities.
- Impersonate another person or entity.
- Use the chatbot or the Alexa skill for abusive purposes, to generate illegal content, or to attempt to extract internal system information.

Violating this section may result in immediate account suspension or restricted access to the skill, without prejudice to any other legal action that may apply.

---

## 13. Service Availability

Salvadorean Roots is an actively developed project. We do not guarantee that the Site, the chatbot, or the Alexa skill will be available uninterrupted, error-free, or without interruptions due to maintenance, updates, or failures of the providers mentioned in Sections 7 and 8. We may modify, temporarily suspend, or discontinue the Site or the Alexa skill, in whole or in part, at any time.

---

## 14. Limitation of Liability

To the maximum extent permitted by law:

- The Site is provided "as is" and "as available," without warranties of any kind, express or implied.
- We do not guarantee the absolute accuracy of cultural, historical, or educational content, although we strive for it to be truthful.
- We are not responsible for content posted by other users, nor for responses generated by the artificial intelligence chatbot or its Amazon Alexa version.
- We will not be liable for indirect, incidental, or consequential damages arising from the use or inability to use the Site or the Alexa skill.

---

## 15. Changes to These Terms

We may update these Terms at any time to reflect changes to the Platform, third-party integrations, or applicable regulations. We will post the "Last updated" date at the top of this document. Continued use of the Site after a change constitutes acceptance of the new Terms.

---

## 16. Governing Law and Jurisdiction

These Terms are governed by and construed in accordance with the laws of the **Republic of El Salvador**. Any dispute arising from the use of the Platform shall be submitted to the competent courts of El Salvador, unless the law expressly provides otherwise.

---

## 17. Contact

If you have questions, comments, or would like to exercise your rights over your personal data, you can contact us through the contact channels available on the Site.

---

*This document is a reference template drafted based on the Platform's current features. We recommend having it reviewed by a Salvadorean legal professional before final publication, particularly regarding personal data protection and liability for third-party content.*
