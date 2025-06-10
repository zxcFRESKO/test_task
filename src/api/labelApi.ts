import type { ILabel } from "../types/types";
import { defaultApi } from "./api";

export const loadLabelsApi = async () => {
  const res = await defaultApi.post("", {
    query: `
      query MyQuery {
        labels(distinct_on: caption) {
          id
          caption
          color
        }
      }
    `,
  });

  return res.data.data.labels
};

export const createLabelApi = async ({ caption, color }: Omit<ILabel, "id">) => {
  const res = await defaultApi.post("", {
    query: `
      mutation CreateLabel {
        insert_labels_one(object: {
          caption: "${caption}",
          color: "${color}"
        }) {
          id
          caption
          color
        }
      }
    `,
  });

  return res.data.data.insert_labels_one;
};