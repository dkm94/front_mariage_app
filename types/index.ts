import { ElementType, ReactNode } from "react";

export type RoleType = "admin" | undefined;

export type UserType = {
    id: string,
    mariageID: string,
    role: RoleType,
    firstPerson: string,
    secondPerson: string,
} | undefined;

export type ScrollButtonType = ReactNode;
export type LoaderType = ReactNode;

export interface PageProps {
    title: string;
    component: ElementType;
    auth?: string | null;
    userInfos?: UserType | undefined;
    token?: string | null;
}

export interface ProtectedRouteProps {
    isAuth?: RoleType;
    component: ElementType;
    path: string;
    exact?: boolean;
    auth?: string | null;
    infos?: UserType | undefined;
    token?: string | null;
}

export interface VerticalNavbarProps {
    userInfos?: UserType | undefined;
}

export type NavigationDataType = {
    idx: number;
    title: string;
    icon: ElementType;
    pathname: string;
}

export interface ILoginProps {
    setShowForm: React.Dispatch<React.SetStateAction<string>>
}

export interface IRegisterProps extends ILoginProps {}

export type DashboardCardDataType = {
    icon: string;
    title: string;
    description: string;
}[]

export interface IAuthModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    close: boolean;
    children: React.ReactNode;
}

export interface ISidebarProps {
    userInfos?: UserType | undefined;
}

export type WeddingProps = {
    _id: string;
    guestID: string[];
    tableID: string[];
    todoListID: string[];
    firstPerson: string,
    secondPerson: string,
    adminID: string,
    budgetID: string,
    invitationID: string,
    menuID: string
} | undefined;

export interface INavbarLinksProps {
    idx: number;
    title: string;
    path: string;
    handleClick: () => void;
}