import { Avatar, IconButton } from "@mui/material";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import type { Password } from "../types/passwordType";

type ListUiProps = {
  selected: string | null | undefined;
  data: Password[];
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
};

export const ListUI = ({ setSelected, selected, data }: ListUiProps) => {
  const apiKey = "pk_DvZCIz0oTZ6ajtOf0L9nnA"; // your key here

  // Helper to extract domain from URL (removes protocol and any path/query)
  const extractDomain = (url?: string) => {
    if (!url) return "";
    try {
      const { hostname } = new URL(url);
      return hostname;
    } catch {
      // Fallback if URL constructor fails (invalid URL)
      return url.replace(/(^\w+:|^)\/\//, "").split("/")[0];
    }
  };

  return (
    <div className="flex flex-col items-start">
      {data.map((password: Password) => {
        const domain = extractDomain(password.url);
        const imgUrl = domain
          ? `https://img.logo.dev/${domain}?token=${apiKey}&size=250&format=png`
          : "";

        return (
          <div
            key={password._id}
            className="flex flex-col w-full py-0.5 h-fit px-1 cursor-pointer"
          >
            <div
              onClick={() =>
                setSelected(selected === password._id! ? null : password._id!)
              }
              className={`flex shadow-md justify-between w-full rounded-lg border border-gray-300 py-2 px-3 items-center h-[70px] ${
                selected === password._id ? "bg-gray-500" : "bg-white"
              }`}
            >
              <div className="flex gap-3 items-center">
                <Avatar src={imgUrl} alt={`${password.title} logo`} />
                <p className="text-sm font-medium inline">{password.title}</p>
                <p className="text-xs font-light inline">- {password.title}</p>
              </div>
              <IconButton aria-label="toggle expand">
                {selected === password._id ? <NorthIcon /> : <SouthIcon />}
              </IconButton>
            </div>
          </div>
        );
      })}
    </div>
  );
};
