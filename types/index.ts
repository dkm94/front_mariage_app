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