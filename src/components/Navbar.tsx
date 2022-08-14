import { Code, createStyles, Group, Navbar, ScrollArea } from "@mantine/core";
import React from "react";
import {
  File3d,
  Gauge,
  Notes,
  ReportMoney,
  ShirtSport,
} from "tabler-icons-react";
import { LinksGroup } from "./NavbarLinksGroup";
import { UserButton } from "./UserButton";

const Billing = () => {
  const form = document.createElement("form");
  form.action = "https://api.walterjs.dev/billing";
  form.method = "post";
  form.innerHTML = `<input type="hidden" name="account" value="${process.env.NEXT_PUBLIC_ACCOUNT}"><input type="hidden" name="return" value="${location.href}">`;
  document.body.appendChild(form);
  form.submit();
};

const useStyles = createStyles((theme) => ({
  navbar: {
    height: "calc(100vh - 56)",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export default function NavbarComponent({
  user,
  pages,
  logout,
  setTab,
  opened,
  info,
  uploads,
}: any) {
  const { classes } = useStyles();
  const mockdata = [
    { label: "Dashboard", icon: Gauge, link: "/admin/Dashboard" },
    { label: "Alumni", icon: ShirtSport, link: "/admin/Alumni" },
    {
      label: "Pages",
      icon: Notes,
      initiallyOpened: true,
      links: pages.map((page: any) => ({
        label: page.name,
        link: `/admin/Pages | ${page.name}`,
      })),
    },
    {
      label: "Assets",
      link: "/admin/Assets",
      icon: File3d,
    },
    {
      label: "Billing",
      icon: ReportMoney,
      onClick: () => Billing(),
      links: [],
    },
  ];

  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} setTab={setTab} />
  ));

  return (
    <Navbar
      p="md"
      width={{
        sm: 350,
      }}
      className={classes.navbar}
      sx={{
        display: opened.opened ? "block" : "none",
      }}
    >
      <Navbar.Section className={classes.header}>
        <Group position="apart">
          {/* <Logo width={120} /> */}
          <h2>{info.name}</h2>
          <Code sx={{ fontWeight: 700 }}>{info.id}</Code>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton
          onClick={logout}
          image={user?.photoURL}
          name={user?.displayName}
          email={user?.email}
        />
      </Navbar.Section>
    </Navbar>
  );
}
