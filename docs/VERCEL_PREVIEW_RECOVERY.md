# Existing Vercel project and Preview recovery

Verified local link:

- Project: `impact-generation-global`
- Project ID: `prj_HHkLfVY3SaLOB6uOtrHuMsexZAmX`
- Team ID: `team_AbM2mfGqfBIumLsrceBQ6zCL`
- Workspace shown by GitHub's Vercel checks: `mookahs-projects`
- PR: https://github.com/mookah/impact-generation-global/pull/1
- Branch: `feature/smart-content-foundation-20261023`

The saved CLI access token expired on October 8, 2026; direct requests returned HTTP 403. Running the official CLI refreshed the session successfully. `vercel whoami` confirmed account **mookah**; team listing and project inspection confirmed ownership by **mookah's projects / mookahs-projects**, on the Hobby plan. Browser reauthentication was not needed. The existing local project link matches the server's project ID; no project was created or replaced.

The same local `RATE_LIMIT_SALT` is now configured as a hidden Secret in Development, Preview and Production. No Production deployment was performed. The Preview environment had no other variables configured at the time of inspection; database, Facebook, email and AI credentials remain required.

## Browser sign-in

In the project's PowerShell terminal, run:

```powershell
npx.cmd vercel login
npx.cmd vercel whoami
npx.cmd vercel teams ls
```

Use your existing Vercel account that has access to **mookahs-projects**. Complete the login in the browser; do not paste credentials, login codes or tokens into chat. `npx.cmd` avoids PowerShell's restriction on running `npx.ps1`.

Confirm server-side access to the existing project:

```powershell
npx.cmd vercel project inspect impact-generation-global --scope mookahs-projects
```

The project and team IDs must match the saved link above. If the team is missing or the project is inaccessible, sign into the correct existing account or request membership from the team owner. Do not create a replacement project.

The repository is already linked. If explicitly relinking becomes necessary after successful project verification, use its exact existing ID:

```powershell
npx.cmd vercel link --project prj_HHkLfVY3SaLOB6uOtrHuMsexZAmX --scope mookahs-projects --yes
```

## Preview only

Inspect variable names without printing values:

```powershell
npx.cmd vercel env ls --environment preview --scope mookahs-projects
```

Required values and secure setup are in `SMART_CONTENT_SETUP.md` and `SUBSCRIPTION_SETUP.md`. Keep the local rate-limit salt private and configure the same key in Vercel. The explicit `.vercelignore` excludes local secrets and backup archives from CLI uploads.

Once the project identity and Preview configuration are verified:

```powershell
npx.cmd vercel deploy --target=preview --scope mookahs-projects --yes --meta githubDeployment=1 --meta githubCommitRef=feature/smart-content-foundation-20261023
```

Do not use `--prod`, promote a deployment, merge PR #1, or create another project. If Vercel reports `api-deployments-free-per-day`, wait for its quota reset; authentication does not remove that deployment limit.

Open the returned Preview URL and complete the acceptance checklist in `SMART_CONTENT_SETUP.md`. September must remain a draft until authentic Facebook retrieval and review. Provider acceptance must be verified in Resend before reporting a successful email test.

References: [Vercel login](https://vercel.com/docs/cli/login), [link existing project](https://vercel.com/docs/cli/link), [Preview deployment](https://vercel.com/docs/cli/deploy).
