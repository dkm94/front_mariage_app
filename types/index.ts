import { ChangeEvent } from "react";
import { ElementType, ReactNode } from "react";
import { FormikErrors } from "formik";
import { ButtonPropsSizeOverrides } from "@mui/material";

export type RoleType = "admin" | undefined;

export type UserType = {
    id?: string;
    mariageID: string;
    role?: RoleType;
    firstPerson: string;
    secondPerson: string;
    email?: string;
} | undefined;

export type AccountType = {
    id: string;
    email: string;
    password: string;
    role: RoleType;
    mariageID: string;
}

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

export interface IDashboardProps {
    userInfos?: UserType | undefined;
    userRole: string;
    token?: string | null;
    page: string;
}

export type DashboardCardDataType = {
    icon: string;
    title: string;
    description: string;
}[]

export interface IAuthModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    close: () => void;
    children: React.ReactNode;
}

export interface ISidebarProps {
    userInfos?: UserType | null;
    loading: boolean;
}

export type WeddingProps = {
    _id: string;
    guestID: string[];
    tableID: string[];
    todoListID: string[];
    firstPerson: string;
    secondPerson: string;
    adminID: string;
    budgetID: string;
    invitationID: string;
    menuID: string;
} | undefined;

export interface INavbarLinksProps {
    idx: number;
    title: string;
    path: string;
    handleClick: () => void;
}

export type OperationType = {
    _id?: string;
    category: string;
    date?: string;
    price: number | string;
    description: string;
    mariageID?: string;
};

// export type BudgetProps = {
//     _id: string;
//     mariageID: string;
//     operations: OperationType[];
// } | undefined;

export interface ITextfieldOperations {
    size?: string;
    label?: string;
    name: string;
    type: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
    class?: string;
    errors?: FormikErrors<OperationType>;
    touched?: Record<string, boolean>;
    placeholder?: string;
    width?: string;
    autocomplete?: string;
}
export interface IGreyButton {
    href?: string;
    type?: string;
    size?: ButtonPropsSizeOverrides | undefined;
    variant?: string;
    style?: any;
    text?: string;
    disabled?: boolean;
}

export interface IBlackButton {
    href?: string;
    type?: string;
    size?: ButtonPropsSizeOverrides | undefined;
    variant?: string;
    style?: any;
    text?: string;
    disabled?: boolean;
    onClick?: (ev: MouseEvent) => void;
}

export type OperationCategoryType = 'Locations' | 'Habillement/Beauté' | 'Décoration/Fleurs' | 'Alliances/Bijoux' | 'Animation' | 'Traiteur' | 'Faire-part' | 'Autres';

export type TaskType = {
    _id: string;
    color: string;
    isCompleted: boolean;
    mariageID: string;
    text: string;
}

export type WeddingType = {
    _id: string;
    guestID: string[];
    tableID: string[];
    todoListID: string[];
    firstPerson: string;
    secondPerson: string;
    adminID: string;
    budgetID: string;
    invitationID: string;
    menuID: string;
} | undefined;

export type GuestType = {
    family?: string;
    _id: string;
    name: string;
    media?: string;
    tableID?: string;
    mariageID?: string;
    guestMenu?: {
        dessert: string;
        maincourse: string;
        starter: string;
    }
}

export type FormattedGuestType = {
    _id?: string;
    id?: string;
    name: string;
    tableID: string;
}

export type TableType = {
    _id: string;
    mariageID: string;
    name: string;
    guestID?: string[];
}

export type FoodType = {
    _id?: string;
    name: string;
    mariageID?: string;
    category: string;
}

export type Edit = {
    _id: string;
    name: string;
}
export interface IUpdateExpensesFormProps {
    edit: Edit;
    // setEdit: (value: string) => void;
    setEdit: React.Dispatch<React.SetStateAction<OperationType | null>>;
    onSubmit: (obj: any) => void
    deleteExpense: (id: string) => Promise<void>
}