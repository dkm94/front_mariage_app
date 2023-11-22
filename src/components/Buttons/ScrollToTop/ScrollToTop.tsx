import "./ScrollToTop.css";

import React, { FC, useEffect, useState } from "react";
import { useWindowScroll } from "react-use";

const ScrollToTopButton: FC = () => {

    const { y: pageYOffset } = useWindowScroll();
    const [visible, setVisibility] = useState<boolean>(false);

    useEffect(() => {
        if(pageYOffset > 400){
            setVisibility(true)
        } else {
            setVisibility(false)
        }
    }, [pageYOffset])

    if(!visible){
        return false
    }

    const scrollToTop = (): void => window.scrollTo({ top: 0, behavior: "smooth"})
    
    return(
        <div className="scroll-to-top" onClick={scrollToTop}>
            <i className="icon fas fa-chevron-up"></i>
        </div>
    )
}

export default ScrollToTopButton;