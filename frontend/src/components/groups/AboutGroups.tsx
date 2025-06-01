import { Button, Divider, TextField } from "@mui/material";
import type { Password } from "../../types/passwordType";
import { ListUI } from "../../ui/ListUI";
import { useEffect, useMemo, useState } from "react";
import GroupCard from "../../ui/GroupCard";
import { useNavigate } from "react-router-dom";
import ListAuthorizedUsers from "../vault/authorize/ListAuthorized";

function AboutGroups() {
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
  const navigate = useNavigate();

  const mack = useMemo(() => {
    return mockPasswords.filter((password) => {
      const matchesSearch = password.title
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesSearch;
    });
  }, [search]);

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

  const groupData = {
    name: "Family Vault",
    type: "Family",
    ownerName: "Ojo Inioluwa",
    description: "A secure vault to share credentials among family members.",
    userCount: 5,
    passwordCount: 12,
    createdAt: "2025-01-15T10:30:00Z",
    expiresAt: "2025-12-31T23:59:59Z",
    avatarUrl: "", // or URL to an image
  };

  return (
    <div className="flex justify-center items-center p-5">
      <div className="bg-gray-100 p-4 flex flex-col w-full md:w-[80vw] lg:w-[60vw] rounded-lg shadow">
        <div className="flex justify-between items-center p-3">
          <h4 className="font-bold text-2xl text-blue-950">About Group</h4>
          <div>
            <Button>Edit</Button>
            <Button>Leave Group</Button>
          </div>
        </div>
        <Divider />

        <div className="w-full max-w-3xl mx-auto">
          <GroupCard group={groupData} />
        </div>
        <Divider />
        <div className="w-full h-[300px] p-4 flex flex-col gap-3">
          <div className="flex justify-around w-full h-[70px]  items-center">
            <h3 className="font-bold text-base md:text-lg lg:text-xl truncate">
              🛡️ Authorized Passwords
            </h3>
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
                onClick={() => navigate("/AddPassword")}
              >
                +ADD
              </Button>
            </div>
          </div>
          <div className="w-full h-full overflow-y-scroll hide-scrollbar">
            <ListUI data={mack} selected={selected} setSelected={setSelected} />
          </div>
        </div>
        <Divider />
        <div className="">
          <ListAuthorizedUsers />
        </div>
      </div>
    </div>
  );
}

export default AboutGroups;
