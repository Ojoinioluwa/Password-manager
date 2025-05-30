import type { Password } from "../../types/passwordType";
import { useEffect, useMemo, useState } from "react";
import { ListUI } from "../../ui/ListUI";
import { Button, TextField } from "@mui/material";
import AboutPassword from "./AboutPassword";
import PasswordStrengthChecker from "../../ui/PasswordStrength";
import { useNavigate } from "react-router-dom";

function ListPassowrds() {
  const mockPasswords: Password[] = [
    {
      title: "Facebook",
      email: "john.doe@example.com",
      encryptedPassword: "********",
      category: "Social",
      url: "https://facebook.com",
      logo: "https://www.facebook.com/favicon.ico",
      notes: "2FA enabled",
    },
    {
      title: "Gmail",
      email: "john.doe@gmail.com",
      encryptedPassword: "********",
      category: "Email",
      url: "https://mail.google.com",
      logo: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico",
      notes: "Primary email",
    },
    {
      title: "Netflix",
      email: "doejohn",
      encryptedPassword: "********",
      category: "Entertainment",
      url: "https://netflix.com",
      logo: "https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico",
      notes: "",
    },
    {
      title: "PayPal",
      email: "john.paypal@example.com",
      encryptedPassword: "********",
      category: "Banking",
      url: "https://paypal.com",
      logo: "https://www.paypalobjects.com/webstatic/icon/pp258.png",
      notes: "Linked to savings account",
    },
    {
      title: "GitHub",
      email: "johndoe",
      encryptedPassword: "********",
      category: "Work",
      url: "https://github.com",
      logo: "https://github.githubassets.com/favicons/favicon.png",
      notes: "Used for open-source contributions",
    },
    {
      title: "LinkedIn",
      email: "john.doe",
      encryptedPassword: "********",
      category: "Social",
      url: "https://linkedin.com",
      logo: "https://static-exp1.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico",
      notes: "",
    },
    {
      title: "Amazon",
      email: "johnshopper@example.com",
      encryptedPassword: "********",
      category: "Shopping",
      url: "https://amazon.com",
      logo: "https://www.amazon.com/favicon.ico",
      notes: "Prime member",
    },
    {
      title: "Dropbox",
      email: "johndrop@example.com",
      encryptedPassword: "********",
      category: "Utilities",
      url: "https://dropbox.com",
      logo: "https://cfl.dropboxstatic.com/static/images/favicon.ico",
      notes: "Synced with mobile",
    },
    {
      title: "Company VPN",
      email: "johnvpn",
      encryptedPassword: "********",
      category: "Work",
      url: "https://vpn.company.com",
      logo: "https://cdn-icons-png.flaticon.com/512/2983/2983940.png",
      notes: "Expires quarterly",
    },
    {
      title: "Custom Site",
      email: "customuser",
      encryptedPassword: "********",
      category: "Others",
      url: "https://example.com",
      logo: "https://example.com/favicon.ico",
      notes: "Manually added site",
    },
  ];

  const [selected, setSelected] = useState<string | undefined | null>(null);
  const [currentData, setCurrentData] = useState<Password>(mockPasswords[0]);
  // const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate()

  const mack = useMemo(() => {
    return mockPasswords.filter((password) => {
      const matchesSearch = password.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "" ||
        password.category.toLowerCase() === category.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    console.log();
    setSearch(e.target.value);
  };

  useEffect(() => {
    const filteredData = mack.filter(
      (password: Password) => password.logo === selected
    );
    setCurrentData(filteredData[0]);
  }, [selected, mack]);

  return (
    <>
      <div className="w-full h-fit mx-auto flex gap-4 p-10 bg-gray-50">
        <div className="h-[100vh] border border-gray-300 w-7/12 gap-2 flex px-3 flex-col items-center justify-center py-3">
          <div className="flex justify-between w-full h-[70px]  items-center">
            <div className="flex gap-2 h-[70px]  items-center">
              <TextField
                type="search"
                size="small"
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
                onClick={()=> navigate("/AddPassword")}
              >
                +ADD
              </Button>
            </div>
            <select
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
          <div className=" w-full h-fit overflow-y-scroll hide-scrollbar">
            <ListUI data={mack} selected={selected} setSelected={setSelected} />
          </div>
        </div>
        <div className="w-5/12 h-[100vh] overflow-y-scroll hide-scrollbar">
          <AboutPassword
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

export default ListPassowrds;
