import { InputField } from "../../../ui/InputUI";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AddAuthorizedUserAPI } from "../../../services/Authorize/authorizeService";
import { ButtonUI } from "../../../ui/ButtonUI";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GetSaltAPI, GetUserAPI } from "../../../services/user/userServices";
import {
  decrypt,
  encrypt,
  generateUserKey,
} from "../../../utils/encryptAndDecryptPassword";
import { deriveMasterSecretFromPassword } from "../../../utils/genMasterSecrets";
import { GetPasswordByIdAPI } from "../../../services/password/passwordServices";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";

const validationSchema = Yup.object({
  email: Yup.string()
    .email()
    .required("Email of the authorized user is required"),
  expiresAt: Yup.date().nullable(),
});

interface RootState {
  auth: { masterSecret: string };
}

function AuthorizeUser() {
  const { passwordId } = useParams() as { passwordId: string };
  const [debouncedEmail, setDebouncedEmail] = useState("");
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["AuthorizeUser"],
    mutationFn: AddAuthorizedUserAPI,
  });

  const userMasterSecret = useSelector(
    (state: RootState) => state.auth.masterSecret
  );

  const { data: passwordData } = useQuery({
    queryKey: ["GetPassword", passwordId],
    queryFn: () => {
      if (!passwordId) throw new Error("passwordId is undefined");
      return GetPasswordByIdAPI({ passwordId });
    },
    enabled: !!passwordId,
  });

  const { data: UserData } = useQuery({
    queryKey: ["GetUserProfile"],
    queryFn: GetUserAPI,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      expiresAt: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (!passwordId || !saltAndIdData?.salt || !UserData?.user) {
          toast.error("Missing necessary data");

          return;
        }
        const masterSecret = await deriveMasterSecretFromPassword(
          passwordId,
          saltAndIdData.salt
        );
        const key = await generateUserKey({
          masterSecret,
          userId: saltAndIdData.id,
          salt: saltAndIdData.salt,
        });
        const usersKey = await generateUserKey({
          masterSecret: userMasterSecret,
          userId: UserData.user._id,
          salt: UserData.user.salt,
        });
        const password = await decrypt({
          encryptedHex: passwordData.password.encryptedPassword,
          key: usersKey,
          ivHex: passwordData.password.iv,
        });

        const encrypted = await encrypt({ password, key });
        console.log(typeof values.expiresAt);
        await mutateAsync({
          passwordId,
          email: values.email,
          expiresAt: values.expiresAt,
          encryptedPassword: encrypted.data,
          iv: encrypted.iv,
        });
        toast.success("User Authorized Successfully");
      } catch (error) {
        console.log(error);
        toast.error(`Authorization failed, ${error}`);
      }
    },
  });

  // Debounce the email input changes
  useEffect(() => {
    const handler = debounce(() => {
      if (Yup.string().email().isValidSync(formik.values.email)) {
        setDebouncedEmail(formik.values.email);
      } else {
        setDebouncedEmail(""); // reset if invalid
      }
    }, 1400);

    handler();

    return () => {
      handler.cancel();
    };
  }, [formik.values.email]);

  const {
    data: saltAndIdData,
    isError,
    error,
  } = useQuery({
    queryKey: ["GetSalt", debouncedEmail],
    queryFn: () => GetSaltAPI(debouncedEmail),
    enabled: !!debouncedEmail,
  });

  return (
    <div className="bg-gray-100 h-[100vh] py-[15px] px-4 flex items-center justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-3 px-5 py-3 bg-white shadow-lg rounded-lg  w-[80vw] md:w-[50vw] lg:w-[30vw]"
      >
        <div className="bg-gray-100 px-2 py-3 rounded-lg shadow">
          <h2 className="text-blue-950 text-base font-bold text-center">
            Authorize User for your password
          </h2>
        </div>
        <InputField
          formik={formik}
          isPending={isPending}
          type="email"
          size="medium"
          name="email"
          label="Enter the email of the user you want to authorize"
        />
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

export default AuthorizeUser;
