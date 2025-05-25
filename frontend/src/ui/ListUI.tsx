import { IconButton } from "@mui/material";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import type { Password } from "../types/passwordType";

type ListUiProps = {
  selected: string | null | undefined;
  data: Password[];
  setSelected: React.Dispatch<React.SetStateAction<string | null | undefined>>;
};

export const ListUI = ({ setSelected, selected, data }: ListUiProps) => {
  return (
    <>
      {data.map((password: Password) => (
        <div
          key={password.logo}
          className="flex flex-col w-full py-0.5 h-fit px-1 cursor-pointer"
        >
          <div
            onClick={() =>
              setSelected(selected === password.logo ? null : password.logo)
            }
            className={`flex shadow-md justify-between w-full rounded-lg border  border-gray-300 py-2 px-3 items-center h-[70px] ${
              selected === password.logo ? "bg-gray-500" : "bg-white"
            }`}
          >
            <div className="flex gap-3 items-center">
              <img
                src={password.logo}
                alt="logo"
                className="rounded-full h-8 w-8"
              />
              <p className="text-sm font-medium inline">{password.title}</p>
              <p className="text-xs font-light inline">- {password.title}</p>
            </div>
            <IconButton aria-label="delete">
              {selected === password.logo ? <NorthIcon /> : <SouthIcon />}
            </IconButton>
          </div>
        </div>
      ))}
    </>
  );
};
