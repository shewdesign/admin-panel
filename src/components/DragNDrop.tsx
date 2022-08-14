import { ScrollArea } from "@mantine/core";
import React from "react";

const DND = ({ children }: any) => {
  return (
    <ScrollArea>
      {children}
      <div style={{ height: "100px" }} />
    </ScrollArea>
  );
};

export default DND;
