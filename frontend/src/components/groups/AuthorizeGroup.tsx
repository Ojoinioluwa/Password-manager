import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetAllPasswordsAPI } from "../../services/password/passwordServices";
import { InputField } from "../../ui/InputUI";
import { ButtonUI } from "../../ui/ButtonUI";
import {
  AuthorizeGroupAPI,
  GetGroupById,
} from "../../services/group/groupServices";
import { deriveMasterSecretFromPassword } from "../../utils/genMasterSecrets";
import { useNavigate, useParams } from "react-router-dom";
import {
  decrypt,
  encrypt,
  generateUserKey,
} from "../../utils/encryptAndDecryptPassword";
import { GetUserAPI } from "../../services/user/userServices";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const validationSchema = Yup.object({
  passwordId: Yup.string().required("Password is required"),
  expiresAt: Yup.string().nullable(),
});

interface RootState {
  auth: { masterSecret: string };
}

function AuthorizeGroup() {
  const navigate = useNavigate();
  const { groupId } = useParams() as { groupId: string };

  const userMasterSecret = useSelector(
    (state: RootState) => state.auth.masterSecret
  );
  const { data } = useQuery({
    queryKey: ["GetPasswords"],
    queryFn: GetAllPasswordsAPI,
  });

  const { data: groupInfo } = useQuery({
    queryKey: ["GetGroupById", groupId],
    queryFn: () => GetGroupById({ groupId }),
  });

  console.log(groupInfo);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["AuthorizeGroup"],
    mutationFn: AuthorizeGroupAPI,
  });

  const { data: UserData } = useQuery({
    queryKey: ["GetUserProfile"],
    queryFn: GetUserAPI,
  });

  const formik = useFormik({
    initialValues: {
      passwordId: "",
      expiresAt: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const selectedPassword = data?.passwords?.find(
          (password: { _id: string }) => password._id === values.passwordId
        );
        if (!groupId || !groupInfo?.group?.salt || !UserData?.user) {
          toast.error("Missing necessary data");
          return;
        }
        if (!selectedPassword) {
          toast.error("Please select a password.");
          return;
        }

        const masterSecret = await deriveMasterSecretFromPassword(
          groupId,
          groupInfo.group.salt
        );
        const key = await generateUserKey({
          masterSecret,
          userId: groupInfo.group.id,
          salt: groupInfo.group.salt,
        });
        const usersKey = await generateUserKey({
          masterSecret: userMasterSecret,
          userId: UserData.user._id,
          salt: UserData.user.salt,
        });
        const password = await decrypt({
          encryptedHex: selectedPassword.encryptedPassword,
          key: usersKey,
          ivHex: selectedPassword.iv,
        });

        const encrypted = await encrypt({ password, key });
        await mutateAsync({
          passwordId: selectedPassword._id,
          groupId,
          expiresAt: values.expiresAt,
          encryptedPassword: encrypted.data,
          iv: encrypted.iv,
        });
        toast.success("User Authorized Successfully");
        formik.resetForm();
        navigate(-1);
      } catch (error) {
        console.log(error);
        toast.error(`Authorization failed, ${error}`);
      }
    },
  });

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white px-4 py-2 flex-col gap-2"
      >
        {data?.passwords?.length ? (
          <select
            name="passwordId"
            title="passwords"
            id="passwordId"
            value={formik.values.passwordId}
            onChange={formik.handleChange}
            className="w-full outline-blue-800 p-4 border-2 mb-3 border-gray-200"
          >
            <option value="">-- Select a password --</option>
            {data.passwords.map(
              ({ _id, title }: { _id: string; title: string }) => (
                <option key={_id} value={_id}>
                  {title}
                </option>
              )
            )}
          </select>
        ) : (
          <p>Loading passwords...</p>
        )}

        <InputField
          formik={formik}
          isPending={isPending}
          type="date"
          size="medium"
          name="expiresAt"
          helperText="Select an expiring date for the authorized user "
          label=""
        />

        <ButtonUI isPending={isPending} name="Authorize" />
      </form>
    </div>
  );
}

export default AuthorizeGroup;
