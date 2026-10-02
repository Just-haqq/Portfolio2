# Abdul Haqq — Cybersecurity Portfolio

A responsive portfolio built with plain HTML, CSS, and JavaScript. It includes a name-typing introduction, light/dark theme switch, Ghana clock, and accessible project detail dialogs.

## Files

| File | Purpose |
| --- | --- |
| `dist/index.html` | Page content, links, heading, and metadata |
| `dist/styles.css` | Colors, typography, responsive layout, and cursor animation |
| `dist/app.js` | Name typing, theme preference, Ghana clock, and project dialogs |
| `vercel.json` | Vercel configuration for this static website |
| `.gitignore` | Local files excluded from source control |

There is no dependency installation, package.json, framework, database, or build step. The website files are the editable source; dist is not generated here. This export contains no ChatGPT Sites project configuration.

## Run locally in VS Code

1. Open this project folder in VS Code.
2. Open dist/index.html directly in a browser, or use a local server.

On macOS/Linux with Python installed, from the project folder:

```sh
python3 -m http.server 8000 --directory dist
```

On Windows with Python installed:

```sh
py -m http.server 8000 --directory dist
```

Open http://localhost:8000. Press Ctrl+C in the terminal to stop the server. If you already use VS Code Live Server, open dist/index.html with it instead.

## Edit the portfolio

- Change the introduction, contact links, and name in dist/index.html.
- Keep the h1 aria-label consistent with the displayed name for screen readers.
- Change project dialog details in the details object in dist/app.js.
- Adjust colors, spacing, typography, and responsive rules in dist/styles.css.
- The typing animation starts after 350 ms, then reveals one character roughly every 115 ms. Visitors with reduced-motion preferences see the full name immediately.

## Upload to GitHub

The destination repository is [Just-haqq/Portfolio2](https://github.com/Just-haqq/Portfolio2).

If that repository is empty, run the following in the VS Code terminal from this project folder:

```sh
git init
git add .
git commit -m "Add cybersecurity portfolio"
git branch -M main
git remote add origin https://github.com/Just-haqq/Portfolio2.git
git push -u origin main
```

If the GitHub repository already contains commits, clone it into a separate folder first, copy this project's `dist/`, `vercel.json`, and `.gitignore` into the clone, and incorporate this README while preserving existing documentation. Commit and push from that clone. This preserves its existing history. If a push is rejected because the remote has commits you do not have locally, do not force-push.

`git init` creates local version history; `git add` stages a snapshot; `git commit` saves that snapshot. `main` is the branch name, `origin` names your GitHub repository, and `git push` uploads your commits. Before staging, run `git status --short` and confirm that only intended files are listed. Keep `dist/` tracked: these files are the source, not disposable build output.

For subsequent changes:

```sh
git diff
git add dist README.md vercel.json .gitignore
git commit -m "Update portfolio"
git push
```

Alternatively, initialize the local repository with VS Code's Source Control and add the existing Portfolio2 repository as its remote.

At the repository root, you should see dist/, vercel.json, README.md, and .gitignore. Upload the extracted files, not the ZIP. If using GitHub's web uploader, ensure the local .gitignore file is included too.

## Deploy on Vercel using GitHub

1. Sign in to Vercel with the account you want to own this portfolio.
2. Choose Add New > Project.
3. Connect GitHub and import `Just-haqq/Portfolio2`.
4. Confirm the settings below, then click Deploy.

| Setting | Value |
| --- | --- |
| Framework Preset | Other |
| Root Directory | Repository root (./), containing vercel.json |
| Build Command | Empty; no build needed |
| Output Directory | dist |
| Install Command | Empty; no packages needed |
| Environment Variables | None |

The included vercel.json sets the framework, build/install commands, and output directory. Do not set Root Directory to dist when using this configuration; keep the root at the folder containing vercel.json.

The `$schema` entry enables editor validation. `framework: null` selects no framework; empty build and install commands skip those steps; `outputDirectory: "dist"` tells Vercel which folder to publish. Only the website files in that folder are served.

After deployment, use the stable production domain shown in Vercel's Domains section for your CV. It will generally end in .vercel.app unless you connect your own domain. Open that production domain in an incognito/private browser to confirm a recruiter can view it without logging in. Use the production domain rather than a protected preview URL.

Once the GitHub repository is connected to Vercel, later pushes to the configured production branch trigger fresh production deployments.

## How the browser runs the site

1. `index.html` supplies the page content and loads `styles.css` and `app.js` using relative paths.
2. The small script in the document head restores the saved theme before rendering, reducing a flash of the wrong theme.
3. `app.js` uses `defer`, so it runs after HTML parsing. It finds page elements, attaches click handlers, animates the name, and updates the Ghana clock.
4. The `details` object holds project descriptions. Clicking a `data-detail` button looks up the matching key and fills the native HTML dialog using `textContent`.
5. CSS custom properties define the theme colors, and media queries adjust the layout for small screens, reduced motion, and printing.

The name remains visible if the external script fails to load. JavaScript is required for the theme button, live clock, and detail dialogs. Theme storage failures are caught, so the toggle still works when browser storage is unavailable.

## Before sharing the deployment

- Check the page on a phone-sized screen and a desktop.
- Toggle the theme, refresh, and confirm the preference persists.
- Open each project dialog; close it with the close button and Escape. Check keyboard focus returns to its opener.
- Enable reduced motion in your operating system and confirm the name appears immediately.
- Verify your email, LinkedIn, and GitHub links. Project links currently point to your GitHub profile; replace them with individual repository URLs when available.
- Check all project and internship descriptions for accuracy.
- Visit the production URL in a private window and confirm it is publicly accessible.
- After a domain is assigned, consider adding canonical and `og:url` metadata plus a social preview image. Those values need your real public URL.

## CV link

Label your public production link Portfolio or Cybersecurity Portfolio in your CV. Hosting on Vercel does not itself label the page as AI-generated. Your portfolio should describe your actual work and experience, and you should be able to explain the code and any tools you used.

## Deployment status of this download

This is a prepared source package, not a completed Vercel deployment. There is no Vercel project ID, account token, or domain assigned inside it. Deploy it from your own GitHub/Vercel account using the steps above. Editing this copy does not update the earlier ChatGPT Sites publication.

## Official references

- https://vercel.com/docs/project-configuration/vercel-json
- https://vercel.com/docs/builds/configure-a-build
- https://vercel.com/docs/deployments/git
- https://vercel.com/docs/deployment-protection
