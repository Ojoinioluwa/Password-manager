import type { Password } from "../../types/passwordType";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ListUI } from "../../ui/ListUI";
import { Button, TextField } from "@mui/material";
import AboutPassword from "./AboutPassword";
import PasswordStrengthChecker from "../../ui/PasswordStrength";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetAllPasswordsAPI } from "../../services/password/passwordServices";
import Loading from "../../State/Loading";
import {
  decrypt,
  generateUserKey,
} from "../../utils/encryptAndDecryptPassword";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface RootState {
  auth: { masterSecret: string };
}

type CurrentData = {
  passwordId: string;
  userSalt: string;
  encryptedPassword: string;
  iv: string;
  _id: string;
  logo: string;
  category: string;
  email: string;
  url: string;
  notes: string;
  title: string;
  userId: {
    _id: string;
    salt: string;
  };
};
function ListPasswords() {
  const navigate = useNavigate();
  const masterSecret = useSelector(
    (state: RootState) => state.auth.masterSecret
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["GetPasswords"],
    queryFn: GetAllPasswordsAPI,
  });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [selected, setSelected] = useState<string | null>(null);
  const [currentData, setCurrentData] = useState<CurrentData | null>(null);
  const [decryptedPasswordValue, setDecryptedPasswordValue] = useState<
    string | null
  >(null);

  const filteredPasswords = useMemo(() => {
    if (!data?.passwords) return [];
    return data.passwords.filter((password: Password) => {
      const matchesSearch = password.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "" ||
        password.category.toLowerCase() === category.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [search, category, data]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    []
  );
  useEffect(() => {
    if (filteredPasswords.length > 0) {
      setSelected(filteredPasswords[0]._id);
    } else {
      setSelected(null);
    }
  }, [filteredPasswords]);

  useEffect(() => {
    if (!data?.passwords || !selected) return;
    const item = data.passwords.find((p: Password) => p._id === selected);
    setCurrentData(item ?? null);
  }, [selected, data]);

  console.log(currentData);

  useEffect(() => {
    const decryptAndSetPassword = async () => {
      if (currentData) {
        try {
          const key = await generateUserKey({
            masterSecret,
            userId: currentData.userId._id,
            salt: currentData.userId.salt,
          });
          const password = await decrypt({
            encryptedHex: currentData.encryptedPassword,
            key: key,
            ivHex: currentData.iv,
          });
          console.log(password);
          setDecryptedPasswordValue(password);
        } catch (error) {
          console.error("Error decrypting password:", error);
          setDecryptedPasswordValue("Decryption Error");
          toast.error("Failed to decrypt password.");
        }
      } else {
        setDecryptedPasswordValue(null);
      }
    };

    decryptAndSetPassword();
  }, [currentData, selected, masterSecret]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">
          Error loading passwords. Try again later.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row gap-6 px-2 py-2 bg-gray-50">
        {/* Left Panel - Password List & Filters */}
        <section className="flex flex-col w-full md:w-7/12 border border-gray-300 rounded-lg bg-white shadow-sm h-[70vh] lg:h-[100vh] px-1 py-1">
          {/* Search & Controls */}
          <div className="flex flex-col md:flex-row h-[100px] items-center justify-between gap-4 mb-4 md:h-[70px]">
            <div className="flex gap-3 flex-grow min-w-0">
              <TextField
                type="search"
                size="small"
                placeholder="Search by name or title"
                variant="outlined"
                fullWidth
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSearch(e)
                }
                className="min-w-0"
              />
              <Button
                variant="contained"
                size="medium"
                className="font-bold whitespace-nowrap"
                type="button"
                onClick={() => navigate("/dashboard/AddPassword")}
              >
                + ADD
              </Button>
            </div>
            <select
              title="category"
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
              <option value="">All Categories</option>
              <option value="Social">Social</option>
              <option value="Banking">Banking</option>
              <option value="Email">Email</option>
              <option value="Work">Work</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Shopping">Shopping</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Password List */}
          <div className="flex-grow overflow-y-auto hide-scrollbar">
            {filteredPasswords.length === 0 ? (
              <p className="text-center text-gray-500 mt-8">
                No passwords found.
              </p>
            ) : (
              <ListUI
                data={filteredPasswords}
                selected={selected}
                setSelected={setSelected}
              />
            )}
          </div>
        </section>

        {/* Right Panel - Password Details */}
        <section className="w-full md:w-5/12 bg-white border border-gray-300 rounded-lg shadow-sm h-[70vh] lg:h-[100vh] overflow-y-auto hide-scrollbar p-1">
          {currentData ? (
            <AboutPassword
              _id={currentData._id}
              logo={currentData.logo}
              title={currentData.title}
              category={currentData.category}
              email={currentData.email}
              url={currentData.url}
              encryptedPassword={decryptedPasswordValue!}
              notes={currentData.notes}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 italic">
              Select a password to view details
            </div>
          )}
        </section>
      </div>

      {/* Password Strength Checker */}
      <div className="max-w-screen-xl mx-auto px-2 py-2 bg-gray-50">
        <PasswordStrengthChecker defaultPassword={decryptedPasswordValue!} />
      </div>
    </>
  );
}

export default ListPasswords;
