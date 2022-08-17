import React, { useState, useEffect, forwardRef } from 'react';
import { Router, useRouter } from 'next/router';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useMantineColorScheme, ActionIcon, createStyles, Header, Container, Burger, useMantineTheme, MantineProvider, ColorSchemeProvider, AppShell, Box, Navbar, Drawer, LoadingOverlay, Affix, Transition, Notification, Card, Group, Divider, Text, Badge, Button, TextInput, NumberInput, Checkbox, Avatar, Select, MultiSelect, ScrollArea, UnstyledButton, ThemeIcon, Collapse, Menu, Code, FileInput, Table, Center } from '@mantine/core';
import { useViewportSize, useLocalStorage } from '@mantine/hooks';
import { ModalsProvider, openModal, closeAllModals } from '@mantine/modals';
import { Sun, MoonStars, X, ChevronRight, ChevronLeft, Logout, Gauge, ShirtSport, Notes, File3d, ReportMoney, Search, FileUpload, ChevronUp, ChevronDown, Selector } from 'tabler-icons-react';
import GoogleButton from 'react-google-button';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var useLogin = function (API_URL) {
    var _a = useState(false), status = _a[0], setStatus = _a[1];
    var handleLogin = function (token, email) {
        fetch("".concat(API_URL !== null && API_URL !== void 0 ? API_URL : process.env.NEXT_PUBLIC_API_URL, "/login"), {
            method: "POST",
            headers: {
                account: process.env.NEXT_PUBLIC_ACCOUNT,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token, email: email }),
        }).then(function (res) { return setStatus(res.ok); });
    };
    return [status, handleLogin];
};

function ColorSchemeSwitcher() {
    var _a = useMantineColorScheme(), colorScheme = _a.colorScheme, toggleColorScheme = _a.toggleColorScheme;
    var dark = colorScheme === "dark";
    return (React.createElement(ActionIcon, { variant: "outline", color: dark ? "yellow" : "blue", onClick: function () { return toggleColorScheme(); }, title: "Toggle color scheme" }, dark ? React.createElement(Sun, { size: 18 }) : React.createElement(MoonStars, { size: 18 })));
}

var HEADER_HEIGHT = 60;
var useStyles$4 = createStyles(function (theme) {
    var _a, _b;
    return ({
        root: {
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "100vw",
            width: "100%",
        },
        dropdown: {
            position: "absolute",
            top: HEADER_HEIGHT,
            left: 0,
            right: 0,
            zIndex: 0,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            borderTopWidth: 0,
            overflow: "hidden",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100vw",
            height: "100%",
            maxWidth: "95vw",
        },
        links: (_a = {},
            _a[theme.fn.smallerThan("sm")] = {
                display: "none",
            },
            _a),
        burger: {},
        link: (_b = {
                display: "block",
                lineHeight: 1,
                padding: "8px 12px",
                borderRadius: theme.radius.sm,
                textDecoration: "none",
                color: theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.colors.gray[7],
                fontSize: theme.fontSizes.sm,
                fontWeight: 500,
                "&:hover": {
                    backgroundColor: theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                }
            },
            _b[theme.fn.smallerThan("sm")] = {
                borderRadius: 0,
                padding: theme.spacing.md,
            },
            _b),
        linkActive: {
            "&, &:hover": {
                backgroundColor: theme.colorScheme === "dark"
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                    : theme.colors[theme.primaryColor][0],
                color: theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 3 : 7],
            },
        },
    });
});
function HeaderResponsive(_a) {
    var opened = _a.opened, setOpened = _a.setOpened;
    var classes = useStyles$4().classes;
    return (React.createElement(Header, { height: HEADER_HEIGHT, className: classes.root },
        React.createElement(Container, { className: classes.header },
            React.createElement(Burger, { opened: opened.opened, onClick: function () {
                    return setOpened({
                        opened: !opened.opened,
                        mobile: opened.mobile,
                    });
                }, className: classes.burger, size: "sm" }),
            React.createElement(ColorSchemeSwitcher, null))));
}

var AdminPanel = function (_a) {
    var _b, _c;
    var tabs = _a.tabs, auth = _a.auth, data = __rest(_a, ["tabs", "auth"]);
    var _d = React.useState(false), loading = _d[0], setLoading = _d[1];
    React.useEffect(function () {
        var start = function () {
            setLoading(true);
        };
        var end = function () {
            setLoading(false);
        };
        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);
        return function () {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        };
    }, []);
    var firebaseAuth = auth;
    var provider = new GoogleAuthProvider();
    var _e = useState(false), authorized = _e[0], setAuthorized = _e[1];
    var _f = useState(), error = _f[0], setError = _f[1];
    var _g = useState(), user = _g[0], setUser = _g[1];
    var width = useViewportSize().width;
    var _h = useLocalStorage({
        key: "colorScheme",
        defaultValue: "dark",
    }), colorScheme = _h[0], setColorScheme = _h[1];
    var router = useRouter();
    var theme = useMantineTheme();
    var isMobile = width < theme.breakpoints.md;
    var _j = useState({
        opened: !isMobile,
        mobile: true,
    }), openedState = _j[0], toggleOpenedState = _j[1];
    var _k = useState(router.query.page), tab = _k[0], setTab = _k[1];
    var _l = useLogin(), loginStatus = _l[0], tryLogin = _l[1];
    firebaseAuth.onAuthStateChanged(function (newUser) {
        if (user != newUser || typeof user == "undefined") {
            setUser(newUser);
        }
    });
    var signIn = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            signInWithPopup(firebaseAuth, provider).then(function (_a) {
                var user = _a.user;
                return setUser(user);
            });
            return [2 /*return*/];
        });
    }); };
    var signOut = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            firebaseAuth.signOut();
            router.push("/admin");
            return [2 /*return*/];
        });
    }); };
    useEffect(function () {
        if (!user)
            return;
        user
            .getIdToken()
            .then(function (token) {
            tryLogin(token, user.email);
        })
            .catch(console.error);
    }, [user, authorized]);
    useEffect(function () {
        setAuthorized(loginStatus);
        setError(loginStatus
            ? undefined
            : "Account not authorized. Please try again later.");
    }, [loginStatus]);
    return (React.createElement(MantineProvider, { withGlobalStyles: true, withNormalizeCSS: true, theme: {
            colorScheme: colorScheme,
        } },
        React.createElement(ModalsProvider, null,
            React.createElement(ColorSchemeProvider, { colorScheme: colorScheme, toggleColorScheme: function () {
                    console.log("toggleColorScheme", colorScheme);
                    setColorScheme(function (s) { return (s == "light" ? "dark" : "light"); });
                } }, authorized ? (React.createElement(AppShell, { fixed: false, 
                // padding={0}
                header: React.createElement(HeaderResponsive, { opened: openedState, setOpened: toggleOpenedState }), navbar: React.createElement(React.Fragment, null,
                    React.createElement(Box, { sx: (_b = {},
                            _b["@media (max-width: ".concat(theme.breakpoints.sm, "px)")] = {
                                display: "none",
                            },
                            _b) },
                        React.createElement(Navbar, __assign({}, data, { defaultState: true, mobile: false, setOpened: toggleOpenedState, user: user, setTab: setTab, opened: openedState, logout: signOut }))),
                    React.createElement(Drawer, { styles: {
                            closeButton: {
                                color: "red",
                                transform: "scale(1.5)",
                                margin: "1rem",
                                marginBottom: 0,
                            },
                        }, sx: (_c = {},
                            _c["@media (min-width: ".concat(theme.breakpoints.sm, "px)")] = {
                                display: "none",
                            },
                            _c), size: "md", closeButtonLabel: "Close", opened: openedState.opened, onClose: function () {
                            return toggleOpenedState({
                                opened: false,
                                mobile: true,
                            });
                        } },
                        React.createElement(Navbar, __assign({}, data, { defaultState: false, mobile: true, setOpened: toggleOpenedState, user: user, setTab: function (tab) {
                                toggleOpenedState({
                                    opened: false,
                                    mobile: true,
                                });
                                setTab(tab);
                                console.log(tab);
                            }, opened: openedState, logout: signOut })))), sx: {
                    position: "relative",
                    paddingTop: 0,
                } },
                React.createElement(LoadingOverlay, { visible: loading }),
                React.createElement(Container, { sx: {
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
                    } }, tabs[tab.split(" | ")[0]](__assign(__assign({}, data), { name: tab.split(" | ")[1] }))))) : (React.createElement(Container, { sx: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                } },
                error && (React.createElement(Affix, { position: { bottom: 20, right: 20 } },
                    React.createElement(Transition, { transition: "slide-up", mounted: error }, function () { return (React.createElement(Notification, { disallowClose: true, title: "Unable to sign in", color: "red", icon: React.createElement(X, { size: 18 }) }, error)); }))),
                React.createElement("br", null),
                React.createElement(GoogleButton, { onClick: signIn }, "Login")))))));
};

var useComponent = function (page, id) {
    var _a = React.useState(), state = _a[0], setState = _a[1];
    var _b = React.useState("default"), status = _b[0], setStatus = _b[1];
    /**
     * TODO:
     * secure the PUT api calls
     */
    var setComponent = function (component) {
        setStatus("Loading...");
        fetch("".concat(process.env.NEXT_PUBLIC_API_URL, "/pages/").concat(page, "/").concat(id), {
            method: "PUT",
            headers: {
                account: process.env.NEXT_PUBLIC_ACCOUNT,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(component),
        })
            .then(function (res) { return res.json(); })
            .then(function (res) {
            setState(res);
            setStatus("Success!");
            setTimeout(function () { return setStatus("default"); }, 1250);
        })
            .catch(function (err) {
            setStatus("An unexpected error occurred.");
            console.error(err);
        });
    };
    React.useEffect(function () {
        setStatus("Loading...");
        fetch("".concat(process.env.NEXT_PUBLIC_API_URL, "/pages/").concat(page, "/").concat(id), {
            headers: { account: process.env.NEXT_PUBLIC_ACCOUNT },
        })
            .then(function (res) { return res.json(); })
            .then(function (res) {
            setState(res);
            setStatus("default");
        })
            .catch(function () {
            setStatus("An unexpected error occurred.");
        });
    }, [page, id]);
    return [state, status, setComponent];
};

var StringEditor = function (_a) {
    var name = _a.name, value = _a.value, onChange = _a.onChange, required = _a.required;
    return (React.createElement(TextInput, { label: name, value: value, onChange: function (e) { return onChange(e.target.value); }, required: required, sx: {
            width: "100%",
        } }));
};
var NumberEditor = function (_a) {
    var name = _a.name, value = _a.value, onChange = _a.onChange, required = _a.required;
    return (React.createElement(NumberInput, { label: name, value: value, onChange: onChange, required: required, sx: {
            width: "100%",
        } }));
};
var BooleanEditor = function (_a) {
    var name = _a.name, value = _a.value, onChange = _a.onChange, required = _a.required;
    return (React.createElement(Checkbox, { label: name, checked: value, onChange: function (e) { return onChange(e.currentTarget.checked); }, required: required, sx: {
            width: "100%",
        } }));
};
var AssetEditor = function (_a) {
    var name = _a.name, value = _a.value, onChange = _a.onChange;
    var _b = useState(), uploads = _b[0], setUploads = _b[1];
    // eslint-disable-next-line react/display-name
    var SelectItem = forwardRef(function (_a, ref) {
        var id = _a.id, name = _a.name, others = __rest(_a, ["id", "name"]);
        return (React.createElement("div", __assign({ ref: ref }, others),
            React.createElement(Group, { noWrap: true },
                React.createElement(Avatar, { src: "".concat(process.env.NEXT_PUBLIC_API_URL, "/images/").concat(process.env.NEXT_PUBLIC_ACCOUNT, "/uploads/").concat(id) }),
                React.createElement("div", null,
                    React.createElement(Text, { size: "sm" }, name),
                    React.createElement(Text, { size: "xs", color: "dimmed" }, id)))));
    });
    useEffect(function () {
        fetch("".concat(process.env.NEXT_PUBLIC_API_URL, "/uploads"), {
            headers: {
                account: process.env.NEXT_PUBLIC_ACCOUNT,
            },
        })
            .then(function (res) { return res.json(); })
            .then(function (res) {
            setUploads(res.map(function (upload) { return (__assign(__assign({}, upload), { value: upload.id, label: upload.name })); }));
        });
    }, []);
    if (!uploads)
        return "";
    return (React.createElement(Select, { withinPortal: true, label: name, value: value, data: uploads, itemComponent: SelectItem, searchable: true, placeholder: "No upload selected.", onChange: onChange, maxDropdownHeight: 400, nothingFound: "No uploads found.", filter: function (value, item) {
            return item.name.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.id.toLowerCase().includes(value.toLowerCase().trim());
        }, sx: {
            width: "100%",
        } }));
};
var ArrayEditor = function (_a) {
    var name = _a.name, value = _a.value, onChange = _a.onChange, required = _a.required;
    var _b = useState(value), setData = _b[1];
    return (React.createElement(MultiSelect, { label: name, data: value, value: value, onChange: onChange, required: required, searchable: true, creatable: true, getCreateLabel: function (value) { return "+ Create \"".concat(value, "\""); }, onCreate: function (value) {
            setData(function (current) { return __spreadArray(__spreadArray([], current, true), [value], false); });
            return value;
        }, withinPortal: true, sx: {
            width: "100%",
        } }));
};
var Editors = {
    string: StringEditor,
    number: NumberEditor,
    boolean: BooleanEditor,
    asset: AssetEditor,
    array: ArrayEditor,
};
var Component = function (_a) {
    var page = _a.page, id = _a.id;
    var _b = useComponent(page, id), component = _b[0], status = _b[1], setComponent = _b[2];
    var _c = useLocalStorage({
        key: "".concat(page, "-").concat(id),
        defaultValue: __assign(__assign({}, component), { changes: false }),
    }), temp = _c[0], setTemp = _c[1];
    useEffect(function () {
        if (temp.changes == true)
            return;
        setTemp(__assign(__assign({}, component), { changes: false }));
    }, [component, setTemp, temp.changes]);
    return (component && (React.createElement(Card, { shadow: "sm", p: "lg", radius: "md", withBorder: true, mb: "xl", sx: {
            width: "100%",
        } },
        React.createElement(LoadingOverlay, { visible: status === "Loading...", overlayOpacity: 0.2 }),
        React.createElement(Group, { position: "left", mb: "md" },
            React.createElement(Divider, null),
            React.createElement(Text, { weight: 500, size: "lg" },
                component.__typename,
                temp.changes ? "*" : ""),
            React.createElement(Badge, { size: "sm", color: "blue", variant: "light" },
                "#",
                component.id)),
        React.createElement(Divider, null),
        React.createElement(Group, { dir: "column", position: "left", p: "xl", sx: {
                width: "100%",
            } }, Object.keys(temp)
            .filter(function (key) { return !["id", "__typename", "changes"].includes(key); })
            .map(function (key, i) {
            var type = ["image", "schedule", "records"].includes(key)
                ? "asset"
                : Array.isArray(temp[key])
                    ? "array"
                    : typeof temp[key];
            var Editor = Editors[type] || Editors["string"];
            return (React.createElement(Editor, { key: i, name: key
                    .split(" ")
                    .map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); }), value: temp[key], onChange: function (value) {
                    var _a, _b;
                    return setTemp(__assign(__assign({}, temp), (_a = {}, _a[key] = value, _a.changes = JSON.stringify(__assign(__assign({}, temp), (_b = {}, _b[key] = value, _b.changes = undefined, _b))) !=
                        JSON.stringify(__assign(__assign({}, component), { changes: undefined })), _a)));
                } }));
        })),
        React.createElement(Card.Section, null,
            React.createElement(Button, { variant: "light", mt: "lg", loading: status === "Loading...", onClick: function () {
                    var props = temp;
                    delete props.changes;
                    setComponent(props);
                }, sx: {
                    width: "100%",
                } }, status === "default" ? "Save" : status)))));
};

var DND = function (_a) {
    var children = _a.children;
    return (React.createElement(ScrollArea, null,
        children,
        React.createElement("div", { style: { height: "100px" } })));
};

var useStyles$3 = createStyles(function (theme) { return ({
    control: {
        fontWeight: 500,
        display: "block",
        width: "100%",
        padding: "".concat(theme.spacing.xs, "px ").concat(theme.spacing.md, "px"),
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        fontSize: theme.fontSizes.sm,
        "&:hover": {
            backgroundColor: theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
    },
    link: {
        fontWeight: 500,
        display: "block",
        textDecoration: "none",
        padding: "".concat(theme.spacing.xs, "px ").concat(theme.spacing.md, "px"),
        paddingLeft: 31,
        marginLeft: 30,
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === "dark"
            ? theme.colors.dark[0]
            : theme.colors.gray[7],
        borderLeft: "1px solid ".concat(theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]),
        "&:hover": {
            backgroundColor: theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
    },
    chevron: {
        transition: "transform 200ms ease",
    },
}); });
function LinksGroup(_a) {
    var Icon = _a.icon, label = _a.label, initiallyOpened = _a.initiallyOpened, links = _a.links, link = _a.link, setTab = _a.setTab, onClick = _a.onClick;
    var _b = useStyles$3(), classes = _b.classes, theme = _b.theme;
    var hasLinks = Array.isArray(links);
    var _c = useState(initiallyOpened || false), opened = _c[0], setOpened = _c[1];
    var ChevronIcon = theme.dir === "ltr" ? ChevronRight : ChevronLeft;
    var items = (hasLinks ? links : []).map(function (link, key) { return (React.createElement(Link, { key: key, href: link.link },
        React.createElement(Text, { onClick: function () { return setTab("".concat(label, " | ").concat(link.label)); }, component: "a", className: classes.link, sx: { cursor: "pointer" }, key: link.label }, link.label))); });
    return (React.createElement(React.Fragment, null,
        React.createElement(Link, { href: link !== null && link !== void 0 ? link : "#" },
            React.createElement(UnstyledButton, { onClick: function () {
                    if (typeof links === "undefined" || links.length === 0)
                        setTab(label);
                    (onClick !== null && onClick !== void 0 ? onClick : (function () { return setOpened(function (o) { return !o; }); }))();
                }, className: classes.control },
                React.createElement(Group, { position: "apart", spacing: 0 },
                    React.createElement(Box, { sx: { display: "flex", alignItems: "center" } },
                        React.createElement(ThemeIcon, { variant: "light", size: 30 },
                            React.createElement(Icon, { size: 18 })),
                        React.createElement(Box, { ml: "md" }, label)),
                    hasLinks && (React.createElement(ChevronIcon, { className: classes.chevron, size: 14, style: {
                            transform: opened
                                ? "rotate(".concat(theme.dir === "rtl" ? -90 : 90, "deg)")
                                : "none",
                        } }))))),
        hasLinks ? React.createElement(Collapse, { in: opened }, items) : null));
}

var useStyles$2 = createStyles(function (theme) { return ({
    user: {
        display: "block",
        width: "100%",
        padding: theme.spacing.md,
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        "&:hover": {
            backgroundColor: theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
        },
    },
}); });
function UserButton(_a) {
    var image = _a.image, name = _a.name, email = _a.email; _a.icon; var onClick = _a.onClick, others = __rest(_a, ["image", "name", "email", "icon", "onClick"]);
    var classes = useStyles$2().classes;
    var _b = useState(false), setOpened = _b[1];
    return (React.createElement(Menu, { width: "200px", position: "right-start", radius: "md", withArrow: true, arrowOffset: 20, arrowSize: 7 },
        React.createElement(Menu.Target, null,
            React.createElement(UnstyledButton, __assign({ className: classes.user }, others, { onClick: function () { return setOpened(function (opened) { return !opened; }); } }),
                React.createElement(Group, null,
                    React.createElement(Avatar, { src: image, radius: "xl" }),
                    React.createElement("div", { style: { flex: 1 } },
                        React.createElement(Text, { size: "sm", weight: 500 }, name),
                        React.createElement(Text, { color: "dimmed", size: "xs" }, email)),
                    React.createElement(ChevronRight, { size: 16 })))),
        React.createElement(Menu.Dropdown, null,
            React.createElement(Menu.Label, null, "Account"),
            React.createElement(Menu.Item, { icon: React.createElement(Logout, { size: 14 }), color: "red", onClick: onClick }, "Sign Out"))));
}

var Billing = function () {
    var form = document.createElement("form");
    form.action = "https://api.walterjs.dev/billing";
    form.method = "post";
    form.innerHTML = "<input type=\"hidden\" name=\"account\" value=\"".concat(process.env.NEXT_PUBLIC_ACCOUNT, "\"><input type=\"hidden\" name=\"return\" value=\"").concat(location.href, "\">");
    document.body.appendChild(form);
    form.submit();
};
var useStyles$1 = createStyles(function (theme) { return ({
    navbar: {
        height: "calc(100vh - 56)",
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
        paddingBottom: 0,
    },
    header: {
        padding: theme.spacing.md,
        paddingTop: 0,
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        borderBottom: "1px solid ".concat(theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]),
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
        borderTop: "1px solid ".concat(theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]),
    },
}); });
function NavbarComponent(_a) {
    var user = _a.user, pages = _a.pages, logout = _a.logout, setTab = _a.setTab, opened = _a.opened, info = _a.info;
    var classes = useStyles$1().classes;
    var mockdata = [
        { label: "Dashboard", icon: Gauge, link: "/admin/Dashboard" },
        { label: "Alumni", icon: ShirtSport, link: "/admin/Alumni" },
        {
            label: "Pages",
            icon: Notes,
            initiallyOpened: true,
            links: pages.map(function (page) { return ({
                label: page.name,
                link: "/admin/Pages | ".concat(page.name),
            }); }),
        },
        {
            label: "Assets",
            link: "/admin/Assets",
            icon: File3d,
        },
        {
            label: "Billing",
            icon: ReportMoney,
            onClick: function () { return Billing(); },
            links: [],
        },
    ];
    var links = mockdata.map(function (item) { return (React.createElement(LinksGroup, __assign({}, item, { key: item.label, setTab: setTab }))); });
    return (React.createElement(Navbar, { p: "md", width: {
            sm: 350,
        }, className: classes.navbar, sx: {
            display: opened.opened ? "block" : "none",
        } },
        React.createElement(Navbar.Section, { className: classes.header },
            React.createElement(Group, { position: "apart" },
                React.createElement("h2", null, info.name),
                React.createElement(Code, { sx: { fontWeight: 700 } }, info.id))),
        React.createElement(Navbar.Section, { grow: true, className: classes.links, component: ScrollArea },
            React.createElement("div", { className: classes.linksInner }, links)),
        React.createElement(Navbar.Section, { className: classes.footer },
            React.createElement(UserButton, { onClick: logout, image: user === null || user === void 0 ? void 0 : user.photoURL, name: user === null || user === void 0 ? void 0 : user.displayName, email: user === null || user === void 0 ? void 0 : user.email }))));
}

// RichText.tsx in your components folder
var RichTextEditor = dynamic(function () { return import('@mantine/rte'); }, {
    // Disable during server side rendering
    ssr: false,
    // Render anything as fallback on server, e.g. loader or html content without editor
    loading: function () { return null; },
});

var useStyles = createStyles(function (theme) { return ({
    th: {
        padding: "0 !important",
    },
    control: {
        width: "100%",
        padding: "".concat(theme.spacing.xs, "px ").concat(theme.spacing.md, "px"),
        "&:hover": {
            backgroundColor: theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
        },
    },
    icon: {
        width: 21,
        height: 21,
        borderRadius: 21,
    },
}); });
function Th(_a) {
    var children = _a.children, reversed = _a.reversed, sorted = _a.sorted, onSort = _a.onSort;
    var classes = useStyles().classes;
    var Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;
    return (React.createElement("th", { className: classes.th },
        React.createElement(UnstyledButton, { onClick: onSort, className: classes.control },
            React.createElement(Group, { position: "apart" },
                React.createElement(Text, { weight: 500, size: "sm" }, children),
                React.createElement(Center, { className: classes.icon },
                    React.createElement(Icon, { size: 14 }))))));
}
function filterData(data, search) {
    var keys = Object.keys(data[0]);
    var query = search.toLowerCase().trim();
    return data.filter(function (item) {
        return keys.some(function (key) { return item[key].toLowerCase().includes(query); });
    });
}
function sortData(data, payload) {
    if (!payload.sortBy) {
        return filterData(data, payload.search);
    }
    return filterData(__spreadArray([], data, true).sort(function (a, b) {
        if (payload.reversed) {
            return b[payload.sortBy].localeCompare(a[payload.sortBy]);
        }
        return a[payload.sortBy].localeCompare(b[payload.sortBy]);
    }), payload.search);
}
function TableSort(_a) {
    var data = _a.data;
    var _b = useState(""), search = _b[0], setSearch = _b[1];
    var _c = useState(data), sortedData = _c[0], setSortedData = _c[1];
    var _d = useState("name"), sortBy = _d[0], setSortBy = _d[1];
    var _e = useState(false), reverseSortDirection = _e[0], setReverseSortDirection = _e[1];
    var setSorting = function (field) {
        var reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, { sortBy: field, reversed: reversed, search: search }));
    };
    var handleSearchChange = function (event) {
        var value = event.currentTarget.value;
        setSearch(value);
        setSortedData(sortData(data, {
            sortBy: sortBy,
            reversed: reverseSortDirection,
            search: value,
        }));
    };
    var rows = sortedData.map(function (row) { return (React.createElement("tr", { key: row.id },
        React.createElement("td", null,
            React.createElement(Image, { src: "".concat(process.env.NEXT_PUBLIC_API_URL, "/images/").concat(process.env.NEXT_PUBLIC_ACCOUNT, "/uploads/").concat(row.id), alt: row.name, width: 150, height: 150, objectFit: "cover" })),
        React.createElement("td", null, row.name))); });
    return (React.createElement(ScrollArea, null,
        React.createElement(Group, { dir: "row", sx: {
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
            } },
            React.createElement(TextInput, { sx: {
                    flex: 5,
                }, placeholder: "Search by any field", mb: "md", icon: React.createElement(Search, { size: 14 }), value: search, onChange: handleSearchChange }),
            React.createElement(Button, { sx: {
                    flex: 1,
                    marginBottom: 16,
                }, variant: "filled", onClick: function () {
                    return openModal({
                        title: "Upload File",
                        children: (React.createElement(React.Fragment, null,
                            React.createElement(FileInput, { placeholder: "Select a file", label: "File", radius: "md", size: "md", onChange: function (file) {
                                    var formData = new FormData();
                                    formData.append("file", file);
                                    console.log(file);
                                    fetch("".concat(process.env.NEXT_PUBLIC_API_URL, "/uploads"), {
                                        method: "POST",
                                        body: formData,
                                        headers: {
                                            account: process.env.NEXT_PUBLIC_ACCOUNT,
                                        },
                                    })
                                        .then(function (res) {
                                        res.json().then(function (data) {
                                            console.log(data);
                                            closeAllModals();
                                            location.reload();
                                        });
                                    })
                                        .catch(function (text) {
                                        openModal({
                                            title: "An Error Occurred.",
                                            children: (React.createElement(React.Fragment, null,
                                                React.createElement(Text, null, text),
                                                React.createElement(Button, { onClick: function () { return closeAllModals(); }, variant: "filled", mr: "md", color: "red" }, "Close"))),
                                        });
                                    });
                                } }))),
                    });
                }, rightIcon: React.createElement(FileUpload, { size: 21 }) }, "Upload")),
        React.createElement(Table, { horizontalSpacing: "md", verticalSpacing: "xs", sx: { tableLayout: "fixed", minWidth: 700 } },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement(Th, { sorted: sortBy === "path", reversed: reverseSortDirection, onSort: function () { } }, "Image"),
                    React.createElement(Th, { sorted: sortBy === "name", reversed: reverseSortDirection, onSort: function () { return setSorting("name"); } }, "Name"))),
            React.createElement("tbody", null, rows.length > 0 ? (rows) : (React.createElement("tr", null,
                React.createElement("td", { colSpan: Object.keys(data[0]).length },
                    React.createElement(Text, { weight: 500, align: "center" }, "Nothing found"))))))));
}

export { AdminPanel, ColorSchemeSwitcher, Component, DND as DragNDrop, HeaderResponsive as Header, NavbarComponent as Navbar, RichTextEditor, TableSort as Table, UserButton, useComponent, useLogin };
//# sourceMappingURL=index.js.map
