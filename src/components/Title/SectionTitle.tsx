import "./style.css";

import React from 'react';

interface SectionTitleProps {
    title: string;
}

const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <div className="box-content__title">
            <h3>{title}</h3>
        </div>
  )
}

export default SectionTitle