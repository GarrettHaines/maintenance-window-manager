# Maintenance Window Manager

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](https://nodejs.org/)

**A clean and comprehensive solution for managing maintenance windows in your Dynatrace monitoring environment.**

## Features

Search and sort a streamlined list of maintenance windows across your environment.
<img width="922" height="497" alt="preview-main" src="https://github.com/user-attachments/assets/8ccf9bc6-cb51-4383-840e-a8a6301748a7" />

View a full accounting of each maintenance window, including all associated entities.
<img width="922" height="497" alt="preview-info" src="https://github.com/user-attachments/assets/12454aca-ab97-4e9f-b12c-f1a7ebe27671" />

Create maintenance windows with ease in a fresh and modernized interface.
<img width="922" height="497" alt="preview-new-window" src="https://github.com/user-attachments/assets/340689c9-f41d-4e4a-8e7a-851d04aad858" />

Attach related entities in a single click. Preview which entities will be included in your maintenance window, either in full or by individual filters.
<img width="922" height="497" alt="preview-new-window-entities" src="https://github.com/user-attachments/assets/0eeaef04-7532-4e77-8777-88e5e6299f83" />

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- npm (bundled with Node.js)
- A Dynatrace SaaS environment with permission to deploy apps

## Setup

### 1. Clone the repository
```
git clone https://github.com/GarrettHaines/maintenance-window-manager.git
cd maintenance-window-manager
```

### 2. Install dependencies
```
npm install
```

### 3. Configure your Dynatrace environment URL
Copy the example config and fill in your tenant URL:
```
cp app.config.local.example.json app.config.local.json
```
Then edit `app.config.local.json`:
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

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
