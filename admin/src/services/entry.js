import { request } from "@strapi/helper-plugin";
const EntryAPIHandler = {
  getAllEntries: async () => {
    return await request("/studio-focus/entries/all", {
      method: "GET",
    });
  },
  updateEntry: async (entry) => {
    return await request("/studio-focus/entries", {
      method: "POST",
      body: entry
    });
  },
  createEntry: async (entry) => {
    return await request("/studio-focus/entries",{
      method:"PUT",
      body : entry
    })
  },
  deleteEntry: async (entry) => {
    return await request(`/studio-focus/entries/delete/${entry.id}`,{
      method:"DELETE",
      body : entry
    })
  }


};
export default EntryAPIHandler;