'use strict';

/**
 *  controller
 */

'use strict';

/**
 *  controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::studio-market.order');


'use strict';

/**
 *  controller
 */
'use strict';

module.exports = ({ strapi }) => {

    // Studio Focus : Entry Service
    const entryService = strapi.plugin("studio-focus").service("entryService");
    const index = async (ctx) => {
        try {
            ctx.body = entryService.index();
        } catch (err) {
            ctx.throw(500, err);
        }
    }
    const findAllEntries = async (ctx) => {
        try {
            ctx.body = await entryService.findAllEntries(ctx);
        } catch (err) {
            ctx.throw(500, err);
        }
    }

    const findEntriesByProfile = async (ctx) => {
        const { token, jwt } = ctx.request.body;
        const verifiedUser = await strapi.plugins['users-permissions'].services.jwt.verify(jwt);
        if (!verifiedUser) ctx.throw(500, "Not Authorized");

        try {
            ctx.body = await entryService.findEntriesByProfile(ctx);
        } catch (err) {
            ctx.throw(500, err);
        }
    }

    const createEntry = async (ctx) => {
        // const { token, jwt } = ctx.request.body;
        // const verifiedUser = await strapi.plugins['users-permissions'].services.jwt.verify(jwt);
        // if (!verifiedUser) ctx.throw(500, "Not Authorized");

        try {
            ctx.body = await entryService.createEntry(ctx);
        } catch (err) {
            ctx.throw(500, err);
        }
    }

    const updateEntry = async (ctx) => {
        try{
            ctx.body = await entryService.updateEntry(ctx);
        }
        catch(err){
            ctx.throw(500, err);
        }
    }


    return {
        index,
        createEntry,
        updateEntry,
        findAllEntries,
        findEntriesByProfile
    }
};
