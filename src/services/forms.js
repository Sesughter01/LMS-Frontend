import { client } from "./client";

const formService = {
  CREATE_COHORT_FORM(payload) {
    return client.post("/programmes/1/cohorts", payload);
  },

  GET_ALL_COHORT_DATA() {
    return client.get("/programmes/01/cohorts").then((res) => {
      return res.data;
    });
  },

  UPDATE_COHORT_FORM(id, payload) {
    return client.put(`/programmes/1/cohorts/${id}`, payload);
  },
};

export default formService;
