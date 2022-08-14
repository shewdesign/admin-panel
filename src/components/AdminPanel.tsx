import React, { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import {
  Affix,
  AppShell,
  Box,
  ColorScheme,
  ColorSchemeProvider,
  Container,
  Drawer,
  LoadingOverlay,
  MantineProvider,
  Navbar,
  Notification,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import { useViewportSize, useLocalStorage } from "@mantine/hooks";
import { useLogin } from "../hooks";
import { ModalsProvider } from "@mantine/modals";
import { Dashboard, X } from "tabler-icons-react";
import HeaderResponsive from "./Header";
import GoogleButton from "react-google-button";

const AdminPanel = ({ tabs, app, ...data }: any) => {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [authorized, setAuthorized] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [user, setUser] = useState<User>();
  const { width, height } = useViewportSize();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "colorScheme",
    defaultValue: "dark",
  });
  const router = useRouter();
  const theme = useMantineTheme();
  const isMobile = width < theme.breakpoints.md;
  const [openedState, toggleOpenedState] = useState<{
    opened: boolean;
    mobile: boolean;
  }>({
    opened: !isMobile,
    mobile: true,
  });
  const [tab, setTab] = useState<string>(router.query.page as string);
  const [loginStatus, tryLogin] = useLogin();

  firebaseAuth.onAuthStateChanged((newUser) => {
    if (user != newUser || typeof user == "undefined") {
      setUser(newUser!);
    }
  });

  const signIn = async () => {
    signInWithPopup(firebaseAuth, provider).then(({ user }) => setUser(user));
  };

  const signOut = async () => {
    firebaseAuth.signOut();
    router.push("/admin");
  };

  useEffect(() => {
    if (!user) return;

    user
      .getIdToken()
      .then((token) => {
        tryLogin(token, user.email!);
      })
      .catch(console.error);
  }, [user, authorized]);

  useEffect(() => {
    if (user) {
      setAuthorized(
        process.env
          .NEXT_PUBLIC_AUTHORIZED_USERS!.split(",")
          .includes(user.providerData[0].email!)
      );
      if (!authorized) {
        setError(
          authorized
            ? undefined
            : "Account not authorized. Please try again later."
        );
      }
    }
  }, [loginStatus]);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: colorScheme,
      }}
    >
      <ModalsProvider>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={() => {
            console.log("toggleColorScheme", colorScheme);
            setColorScheme((s) => (s == "light" ? "dark" : "light"));
          }}
        >
          {authorized ? (
            <AppShell
              fixed={false}
              // padding={0}
              header={
                <HeaderResponsive
                  opened={openedState}
                  setOpened={toggleOpenedState}
                />
              }
              navbar={
                <>
                  {/* desktop */}
                  <Box
                    sx={{
                      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                        display: "none",
                      },
                    }}
                  >
                    <Navbar
                      {...data}
                      defaultState={true}
                      mobile={false}
                      setOpened={toggleOpenedState}
                      user={user}
                      setTab={setTab}
                      opened={openedState}
                      logout={signOut}
                    />
                  </Box>
                  {/* mobile */}
                  {
                    <Drawer
                      styles={{
                        closeButton: {
                          color: "red",
                          transform: "scale(1.5)",
                          margin: "1rem",
                          marginBottom: 0,
                        },
                      }}
                      sx={{
                        [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
                          display: "none",
                        },
                      }}
                      size={"md"}
                      closeButtonLabel={"Close"}
                      opened={openedState.opened}
                      onClose={() =>
                        toggleOpenedState({
                          opened: false,
                          mobile: true,
                        })
                      }
                    >
                      <Navbar
                        {...data}
                        defaultState={false}
                        mobile={true}
                        setOpened={toggleOpenedState}
                        user={user}
                        setTab={(tab: any) => {
                          toggleOpenedState({
                            opened: false,
                            mobile: true,
                          });
                          setTab(tab);
                          console.log(tab);
                        }}
                        opened={openedState}
                        logout={signOut}
                      />
                    </Drawer>
                  }
                </>
              }
              sx={{
                position: "relative",
                paddingTop: 0,
              }}
            >
              <LoadingOverlay visible={loading} />
              <Container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  flexDirection: "column",
                  // height: '100%',
                  width: "100%",
                  maxWidth: "100%",
                  // maxWidth: '100vw',
                  height: "90vh",
                  overflowY: "auto",
                }}
              ></Container>
            </AppShell>
          ) : (
            <Container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              {error && (
                <Affix position={{ bottom: 20, right: 20 }}>
                  <Transition transition="slide-up" mounted={error}>
                    {(styles) => (
                      <Notification
                        disallowClose
                        title={"Unable to sign in"}
                        color="red"
                        icon={<X size={18} />}
                      >
                        {error}
                      </Notification>
                    )}
                  </Transition>
                </Affix>
              )}
              <br />
              <GoogleButton onClick={signIn}>Login</GoogleButton>
            </Container>
          )}
        </ColorSchemeProvider>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default AdminPanel;
