# Affine Studio website

A plain HTML/CSS/JS site with no build step and nothing to install.

```
affine-studio/
├── index.html      the page
├── css/styles.css  all the styling
├── js/main.js      the preview form + plan buttons
├── favicon.svg     the browser-tab icon
├── 404.html        shown for broken links (GitHub Pages uses it automatically)
├── robots.txt      tells Google it may read the site
├── sitemap.xml     tells Google which pages exist
├── images/         put your headshot here later
└── .nojekyll       tells GitHub Pages to serve files as-is
```

---

## 1. Open it in VS Code and preview it

1. Unzip `affine-studio.zip` somewhere you keep projects (for example `~/Developer/affine-studio`).
2. In VS Code: **File › Open Folder…** and pick the `affine-studio` folder.
3. Install the **Live Server** extension (by Ritwick Dey) from the Extensions panel.
4. Right-click `index.html` › **Open with Live Server**. The site opens in your browser and reloads every time you save.

> Open it with Live Server, not by double-clicking `index.html`. Some things, like the 404 page, only behave like the real site when served.

### Before you go live, change these

| What | Where |
|---|---|
| Your domain | Replace `affine.studio` everywhere. In VS Code press **Cmd+Shift+H** (Find and Replace in all files), search `affine.studio`, and replace it with your real domain, e.g. `affinestudio.co`. That updates the share links, sitemap, robots file **and** the email address in one go. |
| Your email | After the step above, check the email address reads right (it becomes `studio@yourdomain`). It's in `js/main.js` (top of the file) and in the footer of `index.html`. If you'd rather use your Gmail for now, replace it in both places. |
| Your photo | Later: drop a square photo in `images/portrait.jpg` and ask Claude to swap it into the "One person builds your site" section. |

---

## 2. Put it on GitHub

1. Go to github.com › **New repository**. Name it `affine-studio`, keep it **Public** (free GitHub Pages needs a public repo), and don't add a README (you already have one).
2. In VS Code, open the **Source Control** panel (the branch icon on the left) › **Initialize Repository**.
3. Type a message like `First version of the Affine site` and click **Commit** (choose **Yes** if it asks to stage all changes).
4. Click **Publish Branch** and pick the `affine-studio` repo you just made (or follow the push commands GitHub shows on the empty repo page).

## 3. Turn on GitHub Pages

1. In the repo on github.com: **Settings › Pages**.
2. Under **Build and deployment**: Source = **Deploy from a branch**, Branch = **main**, folder = **/ (root)** › **Save**.
3. Wait a minute, refresh, and the page shows the live address: `https://kruzp.github.io/affine-studio/`. Open it and check the site.

From now on: edit in VS Code › Commit › **Sync Changes**, and the live site updates within a minute or two.

---

## 4. Buy the domain on Cloudflare

1. Log in at dash.cloudflare.com › **Domain Registration › Register Domains**.
2. Search for the name you want and buy it. Cloudflare sells domains at cost with no markup, and the domain is set up in your Cloudflare account automatically.

## 5. Point the domain at GitHub Pages

**a. Prove to GitHub that the domain is yours (recommended, stops anyone else claiming it):**
GitHub › your profile picture › **Settings › Pages › Add a domain**. GitHub gives you a TXT record. Add it in Cloudflare (**your domain › DNS › Records › Add record**), then click **Verify** on GitHub.

**b. Add these DNS records in Cloudflare** (your domain › **DNS › Records**). Set **Proxy status to "DNS only" (grey cloud)** on all of them for now:

| Type | Name | Content |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `kruzp.github.io` |

**c. Tell GitHub Pages to use the domain:**
Repo › **Settings › Pages › Custom domain** › type your domain (e.g. `affinestudio.co`) › **Save**. GitHub adds a `CNAME` file to the repo for you, so pull it into VS Code with **Sync Changes** next time.

**d. Turn on HTTPS:**
Wait for the DNS check on that page to go green (anywhere from a few minutes to a few hours), then tick **Enforce HTTPS**.

**e. Optional, after HTTPS works:** switch the Cloudflare records to **Proxied (orange cloud)** and set Cloudflare **SSL/TLS** mode to **Full (strict)**. That turns on Cloudflare's free Web Analytics and caching. Don't do this before GitHub's certificate is issued, or HTTPS setup can fail.

---

## 6. Final checks once it's live

- [ ] `https://yourdomain` and `https://www.yourdomain` both load the site with the padlock.
- [ ] Open it on your phone. Nothing should scroll sideways.
- [ ] Choose a plan button, fill in the form, press **Send my answers**. Your email app should open with the answers filled in.
- [ ] The Lane & Jaxon and Flowstate Aerial links open.
- [ ] Visit `yourdomain/anything` and you should see the 404 page.
- [ ] Add the site to Google Search Console and submit `sitemap.xml` (same steps as the Setup tab in the monthly report builder).
