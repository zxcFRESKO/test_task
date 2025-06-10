import type { IUser } from "../types/types";
import { defaultApi } from "./api";

export const updateUserApi = async (userId: number, updatedFields: Partial<IUser>) => {
  const res = await defaultApi.post("", {
    query: `
      mutation UpdateUser($id: Int!, $first_name: String!, $last_name: String!, $bio: String) {
        update_users_by_pk(
          pk_columns: { id: $id },
          _set: {
            first_name: $first_name,
            last_name: $last_name,
            bio: $bio
          }
        ) {
          id
          first_name
          last_name
          bio
        }
      }
    `,
    variables: {
      id: userId,
      first_name: updatedFields.first_name,
      last_name: updatedFields.last_name,
      bio: updatedFields.bio,
    },
  });

  return res.data.data.update_users_by_pk;
};

export const getAllUsersApi = async () => {
  const res = await defaultApi.post("", {
    query: `
      query GetAllUsers {
        users {
            id
            first_name
            last_name
            bio
        }
        }
    `,
  });

  return res.data.data.users
};

export const createUserApi = async ({ first_name, last_name, bio }: Omit<IUser, "id">) => {
  const res = await defaultApi.post("", {
    query: `
      mutation CreateUser {
        insert_users_one(object: {
            first_name: "${first_name}",
            last_name: "${last_name}",
            bio: "${bio}"
        }) {
            id
            first_name
            last_name
        }
}
    `,
  });
  return res.data.data.insert_users_one;
}

export const retrieveUserApi = async ({ id }: Pick<IUser, "id">) => {
  const res = await defaultApi.post("", {
    query: `
      query UserRetrieve {
        users_by_pk(id: ${id}) {
          id
          first_name
          last_name
          bio
        }
      }
    `,
  });

  return res.data.data.users_by_pk;
};