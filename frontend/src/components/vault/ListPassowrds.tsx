import type { Password } from "../../types/passwordType";
import { useEffect, useState } from "react";
import { ListUI } from "../../ui/ListUI";
import { Button, TextField } from "@mui/material";
import AboutPassword from "./AboutPassword";

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const filteredData = mockPasswords.filter(
      (password: Password) => password.logo === selected
    );
    setCurrentData(filteredData[0]);
  }, [selected]);
  return (
    <div className="w-full h-fit mx-auto flex p-10 bg-gray-50">
      <div className="h-[70vh] border border-gray-300 w-7/12 gap-2 flex flex-col items-center justify-center py-3">
        <div className="flex gap-2 h-[70px]  items-center">
          <TextField type="search" size="small" variant="outlined" fullWidth />
          <Button
            variant="contained"
            size="medium"
            className="font-bold"
            type="button"
          >
            +
          </Button>
        </div>
        <div className="h-[70vh - 70px] w-full overflow-y-scroll hide-scrollbar">
          <ListUI
            data={mockPasswords}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </div>
      <div className="w-5/12 h- overflow-y-scroll hide-scrollbar">
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
  );
}

export default ListPassowrds;
