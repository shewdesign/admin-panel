/// <reference types="react" />
import * as React from 'react';
import React__default from 'react';

declare const AdminPanel: ({ tabs, auth, ...data }: any) => JSX.Element;

declare function ColorSchemeSwitcher(): JSX.Element;

declare const Component: React__default.FC<{
    page: string;
    id: string;
}>;

declare const DND: ({ children }: any) => JSX.Element;

declare function HeaderResponsive({ opened, setOpened }: any): JSX.Element;

declare function NavbarComponent({ user, pages, logout, setTab, opened, info, }: any): JSX.Element;

declare const _default: React.ComponentType<{}>;

interface RowData {
    name: string;
    id: string;
    path: string;
}
interface TableSortProps {
    data: RowData[];
}
declare function TableSort({ data }: TableSortProps): JSX.Element;

interface UserButtonProps {
    image: string;
    name: string;
    email: string;
    icon?: React__default.ReactNode;
    onClick: () => void;
}
declare function UserButton({ image, name, email, icon, onClick, ...others }: UserButtonProps): JSX.Element;

declare const useComponent: <T>(page: string, id: string) => [T | undefined, string, (component: T) => void];

declare const useLogin: (API_URL?: string) => [boolean, (token: string, email: string) => void];

export { AdminPanel, ColorSchemeSwitcher, Component, DND as DragNDrop, HeaderResponsive as Header, NavbarComponent as Navbar, _default as RichTextEditor, TableSort as Table, UserButton, useComponent, useLogin };
