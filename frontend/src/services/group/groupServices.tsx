import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";
import { BASE_URL } from "../../utils/url";
import catchAxiosError from "../../utils/catchAxiosError";

export const CreateGroupAPI = async ({
  description,
  name,
  expiresAt,
  type,
}: {
  description: string;
  name: string;
  expiresAt?: string; // or Date, depending on your API
  type: string;
}) => {
  try {
    const user = await getUserFromStorage();
    const token = user?.token;
    const response = await axios.post(
      `${BASE_URL}/group/create`,
      { description, name, expiresAt, type },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    catchAxiosError(error, "CreateGroupAPI");
    throw error;
  }
};

export const UpdateGroupAPI = async ({
  groupId,
  description,
  name,
  expiresAt,
  type,
}: {
  groupId: string;
  description?: string;
  name?: string;
  expiresAt?: string;
  type?: string;
}) => {
  try {
    const user = await getUserFromStorage();
    const token = user?.token;
    const response = await axios.put(
      `${BASE_URL}/group/${groupId}/update`,
      { description, name, expiresAt, type },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    catchAxiosError(error, "UpdateGroupAPI");
    throw error;
  }
};

export const DeleteGroupAPI = async ({ groupId }: { groupId: string }) => {
  try {
    const user = await getUserFromStorage();
    const token = user?.token;
    const response = await axios.delete(`${BASE_URL}/group/${groupId}/delete`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    catchAxiosError(error, "DeleteGroupAPI");
    throw error;
  }
};

export const GetGroupsUserAPI = async () => {
  try {
    const user = await getUserFromStorage();
    const token = user?.token;
    const response = await axios.get(`${BASE_URL}/group/getGroups`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    catchAxiosError(error, "GetGroupsUserAPI");
    throw error;
  }
};

export const AddMemberAPI = async ({
  groupId,
  email,
}: {
  groupId: string;
  email: string;
}) => {
  try {
    const user = await getUserFromStorage();
    const token = user?.token;
    const response = await axios.post(
      `${BASE_URL}/group/${groupId}/member`,
      { email },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    catchAxiosError(error, "AddMemberAPI");
    throw error;
  }
};

export const RemoveMemberAPI = async ({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}) => {
  try {
    const user = await getUserFromStorage();
    const token = user?.token;
    const response = await axios.delete(
      `${BASE_URL}/group/${groupId}/member/${userId}/remove`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    catchAxiosError(error, "RemoveMemberAPI");
    throw error;
  }
};

export const LeaveGroupAPI = async ({ groupId }: { groupId: string }) => {
  try {
    const user = await getUserFromStorage();
    const token = user?.token;
    const response = await axios.post(
      `${BASE_URL}/group/${groupId}/leave`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    catchAxiosError(error, "LeaveGroupAPI");
    throw error;
  }
};

export const AuthorizeGroupAPI = async ({
  groupId,
  passwordId,
  encryptedPassword,
  iv,
  expiresAt,
}: {
  groupId: string;
  passwordId: string;
  encryptedPassword: string;
  iv: string;
  expiresAt?: string;
}) => {
  try {
    const user = await getUserFromStorage();
    const token = user?.token;
    const response = await axios.post(
      `${BASE_URL}/group/${groupId}/authorize/${passwordId}`,
      { encryptedPassword, iv, expiresAt },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    catchAxiosError(error, "AuthorizeGroupAPI");
    throw error;
  }
};

export const ToggleAuthorizeGroupAPI = async ({
  groupId,
}: {
  groupId: string;
}) => {
  try {
    const user = await getUserFromStorage();
    const token = user?.token;
    const response = await axios.put(
      `${BASE_URL}/group/${groupId}/toggleAuthorize`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    catchAxiosError(error, "ToggleAuthorizeGroupAPI");
    throw error;
  }
};

export const ToggleAuthorizeUserAPI = async ({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}) => {
  try {
    const user = await getUserFromStorage();
    const token = user?.token;
    const response = await axios.put(
      `${BASE_URL}/group/${groupId}/toggleAuthorizeUser/${userId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    catchAxiosError(error, "ToggleAuthorizeUserAPI");
    throw error;
  }
};

export const ToggleAuthorizeUserPerPasswordAPI = async ({
  groupId,
  authorizeGroupId,
  userId,
}: {
  groupId: string;
  authorizeGroupId: string;
  userId: string;
}) => {
  try {
    const user = await getUserFromStorage();
    const token = user?.token;
    const response = await axios.put(
      `${BASE_URL}/group/${groupId}/authorizeGroup/${authorizeGroupId}/toggleAuthorizeUser/${userId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    catchAxiosError(error, "ToggleAuthorizeUserPerPasswordAPI");
    throw error;
  }
};

export const GetPasswordInfoAPI = async ({ groupId }: { groupId: string }) => {
  try {
    const user = await getUserFromStorage();
    const token = user?.token;
    const response = await axios.get(
      `${BASE_URL}/group/${groupId}/passwordInfo`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    catchAxiosError(error, "GetPasswordInfoAPI");
    throw error;
  }
};
