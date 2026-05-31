**A clean and comprehensive solution for managing maintenance windows in your Dynatrace monitoring environment.**

Search and sort a streamlined list of maintenance windows across your environment.
<img width="922" height="497" alt="preview-main" src="https://github.com/user-attachments/assets/c36b5573-f7a0-4fc0-93d8-8edc605add80" />

View a full accounting of each maintenance window, including all associated entities.
<img width="922" height="497" alt="preview-info" src="https://github.com/user-attachments/assets/ba66ea2e-a7ff-4443-9c2d-73203c2980e3" />

Create maintenance windows with ease in a fresh and modernized interface.
<img width="922" height="497" alt="preview-new-window" src="https://github.com/user-attachments/assets/340689c9-f41d-4e4a-8e7a-851d04aad858" />

Preview which entities will be included in your maintenance window, either in full or by individual filters.
<img width="922" height="497" alt="preview-new-window-entities" src="https://github.com/user-attachments/assets/0eeaef04-7532-4e77-8777-88e5e6299f83" />

## Add Maintenance Window Manager to your Dynatrace environment

### 1. Clone the repository
```
git clone https://github.com/GarrettHaines/MaintenanceWindowManager.git
cd MaintenanceWindowManager
```

### 2. Install dependencies
```
npm install
```

### 3. Configure your Dynatrace environment URL
Create a file named `app.config.local.json` in the project root with your tenant URL:
```json
{
  "environmentUrl": "https://YOUR-ENVIRONMENT.apps.dynatrace.com/"
}
```
This file is gitignored, so your tenant URL stays out of version control. `app.config.js` reads from it at build time.

### 4. Deploy
```
npm run deploy
```
An authentication window will open in your browser to sign in to your Dynatrace environment. Once authenticated, the application is deployed directly to your tenant.
