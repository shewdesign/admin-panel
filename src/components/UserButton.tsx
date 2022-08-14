import {
  Avatar,
  createStyles,
  Group,
  Menu,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { ChevronRight, Logout } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

export function UserButton({
  image,
  name,
  email,
  icon,
  onClick,
  ...others
}: UserButtonProps) {
  const { classes } = useStyles();
  const [opened, setOpened] = useState<boolean>(false);
  const theme = useMantineTheme();

  return (
    <Menu
      width="200px"
      position="right-start"
      radius="md"
      withArrow
      arrowOffset={20}
      arrowSize={7}
    >
      <Menu.Target>
        <UnstyledButton
          className={classes.user}
          {...others}
          onClick={() => setOpened((opened) => !opened)}
        >
          <Group>
            <Avatar src={image} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {name}
              </Text>

              <Text color="dimmed" size="xs">
                {email}
              </Text>
            </div>
            <ChevronRight size={16} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item icon={<Logout size={14} />} color="red" onClick={onClick}>
          Sign Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
