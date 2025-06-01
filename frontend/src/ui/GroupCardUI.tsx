import PropTypes from "prop-types";
import { Button } from "@mui/material";
import DummyImage from "../assets/login.jpeg";

export const GroupCardUI = ({ group }) => {
  const {
    name,
    type,
    description,
    // Optional future fields like imageUrl can go here
  } = group;

  return (
    <div className="flex flex-col bg-white shadow hover:shadow-lg hover:scale-105 transition-transform w-[200px] h-[300px]">
      <div className="h-[200px] w-full overflow-hidden">
        <img
          src={DummyImage}
          alt={`${name} image`}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4 h-full w-full bg-gray-200 flex flex-col gap-2">
        <p className="text-blue-950 text-base font-bold truncate">{name}</p>
        <p className="text-blue-950 text-sm">
          <span className="font-semibold">Type:</span>{" "}
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </p>
        <p className="text-blue-950 text-xs line-clamp-2">{description}</p>
        <Button variant="outlined" size="small">
          View Group
        </Button>
      </div>
    </div>
  );
};

GroupCardUI.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
