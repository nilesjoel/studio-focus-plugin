'use strict';

/**
 *  router
 */
module.exports = [
    {
        method: 'POST',
        path: '/entries',
        handler: 'entryController.updateEntry',
        config: {
          auth: false
      }
      },
      {
        method: 'PUT',
        path: '/entries',
        handler: 'entryController.createEntry',
        config: {
          auth: false
      }
      },

    {
        method: 'POST',
        path: '/entries/all',
        handler: 'entryController.findAllEntries',
        config: {
          auth: false
      }
      },
    {
        method: 'POST',
        path: '/entries/profile',
        handler: 'entryController.findEntriesByProfile',
        config: {
          auth: false
      }
      },
  ];