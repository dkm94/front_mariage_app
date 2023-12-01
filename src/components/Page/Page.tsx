
import React from 'react';

import useDocumentTitle from '../../setupTitle';
import { PageProps } from '../../../types';

const token: string | null = localStorage.getItem("token");

export default function Page({
    title: titre,
    component: Component,
    auth: userRole,
    userInfos: infos,
  }: PageProps) {

    const titlePrefix = "My Wedding | ";

    useDocumentTitle(`${titlePrefix}${titre}`);
    
    return (
      <Component
        page={titre}
        userInfos={infos}
        userRole={userRole}
        token={token}
      />
    );
  };