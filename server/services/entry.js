'use strict';

/**
 *  service
 */
'use strict';
    // TODO: Move this to a utility file
    function toISOLocal(d) {
        var z = n => ('0' + n).slice(-2);
        var zz = n => ('00' + n).slice(-3);
        var off = d.getTimezoneOffset();
        var sign = off > 0 ? '-' : '+';
        off = Math.abs(off);

        return d.getFullYear() + '-'
            + z(d.getMonth() + 1) + '-' +
            z(d.getDate()) + 'T' +
            z(d.getHours()) + ':' +
            z(d.getMinutes()) + ':' +
            z(d.getSeconds()) + '.' +
            zz(d.getMilliseconds()) +
            sign + z(off / 60 | 0) + ':' + z(off % 60);
    }
    

module.exports = ({ strapi }) => {
   
    const index = (params) => {
        console.log({ params });
        return { testObj: params }
    }
    
    const findAllEntries = async (params) => {
        try {
            //adding a default sort
            // params = params ?? {};
            // params["orderBy"] = "title";
            const entryEntities = await strapi.entityService.findMany('plugin::studio-focus.entry');
            console.log({entryEntities})
            return entryEntities;
        }
        catch (exp) {
            throw new Error(`Market Cart Service: findCartsByProfile: ${exp.message}`);
        }
    }


    const findEntriesByProfile = async (ctx) => {
        
        const { token } = ctx.request.body;
        console.log("findEntriesByProfile: ", token);
        try {
            //adding a default sort
            // params = params ?? {};
            // params["orderBy"] = "title";
            const entryEntities = await strapi.entityService.findMany('plugin::studio-focus.entry', {
                filters: { profile : { user: { email: { $eq: token.user.email } } } }
            });
            console.log({entryEntities})
            return entryEntities;
        }
        catch (exp) {
            throw new Error(`Market Cart Service: findCartsByProfile: ${exp.message}`);
        }
    }

    const createEntry = async (ctx) => {
        
        const { body } = ctx.request;
        const { token } = body;
        console.log("createEntry: ", token);
        try {
            //adding a default sort
            // params = params ?? {};
            // params["orderBy"] = "title";
            const entryEntity = await strapi.entityService.create('plugin::studio-focus.entry', {
                data: {
                    ...body,
                    createdAt: toISOLocal(new Date()),
                    updatedAt: toISOLocal(new Date())
                }
            });
            console.log({entryEntity})
            return entryEntity;
        }
        catch (exp) {
            throw new Error(`Market Cart Service: findCartsByProfile: ${exp.message}`);
        }
    }

    const updateEntry = async (ctx) => {

        const { body } = ctx.request;
        const { token } = body;
        console.log("updateEntry: ", token);
        try {
            //adding a default sort
            // params = params ?? {};
            // params["orderBy"] = "title";
            const entryEntity = await strapi.entityService.update('plugin::studio-focus.entry', {
                data: {
                    ...body,
                    updatedAt: toISOLocal(new Date())
                }
            });
            console.log({entryEntity})
            return entryEntity;
        }
        catch (exp) {
            throw new Error(`Market Cart Service: findCartsByProfile: ${exp.message}`);
        }
    }
    

    return {
        index,
        createEntry,
        updateEntry,
        findAllEntries,
        findEntriesByProfile
    }
}