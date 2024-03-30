import {
  Checkbox,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const allStatus = ["open", "resolved", "inProgress", "onHold", "cancelled"];

const CheckBox = ({ filterValue, handleLocationFilterChange }) => {
  return (
    <>
      {allStatus.map((status, index) => (
        <ListItem className="p-0" key={index}>
          <ListItemPrefix className="mr-3 px-2 py-1">
            <Checkbox
              id="vertical-list-svelte"
              ripple={false}
              key={index}
              className="hover:before:opacity-0"
              value={status}
              checked={filterValue.includes(status)}
              onChange={handleLocationFilterChange}
              containerProps={{
                className: "p-0",
              }}
            />
          </ListItemPrefix>
          <Typography color="blue-gray" className="font-medium">
            {status}
          </Typography>
        </ListItem>
      ))}
    </>
  );
};

export default CheckBox;
