import type { Password } from "../../types/passwordType";
import { useEffect, useMemo, useState } from "react";
import { ListUI } from "../../ui/ListUI";
import { Button, TextField } from "@mui/material";
import AboutPassword from "./AboutPassword";
import PasswordStrengthChecker from "../../ui/PasswordStrength";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetAllPasswordsAPI } from "../../services/password/passwordServices";
import Loading from "../../State/Loading";

function ListPasswords() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["GetPasswords"],
    queryFn: GetAllPasswordsAPI,
  });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [selected, setSelected] = useState<string | null>(null);
  const [currentData, setCurrentData] = useState<Password | null>(null);

  useEffect(() => {
    if (data?.passwords?.length > 0) {
      setSelected(data.passwords[0]._id);
      setCurrentData(data.passwords[0]);
    }
  }, [data]);

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const filteredData = filteredPasswords.filter(
      (password: Password) => password._id === selected
    );
    setCurrentData(filteredData[0]);
  }, [selected, filteredPasswords]);

  if (isLoading) {
    return (
      <div className="w-[100%] h-screen">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <div className="w-full h-fit mx-auto flex flex-col md:flex-row gap-4 p-10 bg-gray-50">
        <div className="h-[70vh] lg:h-[100vh] border border-gray-300 w-full md:w-7/12  flex-col gap-2 lg:w-7/12 md:flex lg:flex px-3 items-center justify-center py-3">
          <div className="flex justify-between w-full h-[70px]  items-center">
            <div className="flex gap-2 h-[70px]  items-center">
              <TextField
                type="search"
                size="small"
                placeholder="search by name or title"
                variant="outlined"
                fullWidth
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSearch(e)
                }
              />
              <Button
                variant="contained"
                size="medium"
                className="font-bold"
                type="button"
                onClick={() => navigate("/AddPassword")}
              >
                +ADD
              </Button>
            </div>
            <select
              title="category"
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 px-2 py-2.5 focus:border-blue-700 focus:border-2 rounded-lg"
            >
              <option value="">All Categories</option>
              <option value="Social">Social</option>
              <option value="Banking">Banking</option>
              <option value="Email">Email</option>
              <option value="Work">Work</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Shopping">Shopping</option>
              <option value="Others">Others</option>{" "}
            </select>
          </div>
          <div className="w-full h-[52vh] lg:h-full overflow-y-scroll hide-scrollbar">
            <ListUI
              data={filteredPasswords}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        </div>
        <div className="w-full md:w-5/12 lg:w-5/12 h-fit overflow-y-scroll hide-scrollbar">
          <AboutPassword
            _id={currentData?._id}
            logo={currentData?.logo}
            title={currentData?.title}
            category={currentData?.category}
            email={currentData?.email}
            url={currentData?.url}
            encryptedPassword={currentData?.encryptedPassword}
            notes={currentData?.notes}
          />
        </div>
      </div>
      <div className="h-fit bg-gray-50 pb-10 px-4">
        <PasswordStrengthChecker defaultPassword={currentData?.email} />
      </div>
    </>
  );
}

export default ListPasswords;
