import { request } from '@strapi/helper-plugin';

const settingsProxy = {
  get: async () => {
    const data = await request(`/studio-focus/settings`, {
      method: 'GET'
    });
    return data;
  },
  set: async (data) => {
    return await request(`/studio-focus/settings`, {
      method: 'POST',
      body: data
    });
  }
}
export default settingsProxy;