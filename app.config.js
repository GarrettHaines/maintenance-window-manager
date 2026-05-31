const localConfig = require('./app.config.local.json');

module.exports = {
  environmentUrl: localConfig.environmentUrl,
  app: {
    name: 'Maintenance Window Manager',
    version: '1.0.0',
    description: 'View and create maintenance windows.',
    id: 'my.maintenance.window.manager',
    scopes: [
      {
        name: 'storage:logs:read',
        comment: 'default template',
      },
      {
        name: 'storage:buckets:read',
        comment: 'default template',
      },
      {
        name: 'environment-api:entities:read',
        comment: 'default template',
      },
      {
        name: 'settings:objects:write',
        comment: 'default template',
      },
      {
        name: 'settings:objects:read',
        comment: 'default template',
      },
    ],
    icon: './ui/assets/images/icon.png',
  },
};
