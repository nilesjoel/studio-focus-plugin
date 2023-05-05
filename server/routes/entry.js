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
          policies: [],
        },
      },
      {
        method: 'PUT',
        path: '/entries',
        handler: 'entryController.createEntry',
        config: {
          policies: [],
        },
      },
      {
      method: 'GET',
      path: '/entries',
      handler: 'entryController.index',
      config: {
        policies: [],
      },
    },
    {
        method: 'GET',
        path: '/entries/all',
        handler: 'entryController.findAllEntries',
        config: {
          policies: [],
        },
      },
    {
        method: 'GET',
        path: '/entries/profile',
        handler: 'entryController.findEntriesByProfile',
        config: {
          policies: [],
        },
      },
  ];