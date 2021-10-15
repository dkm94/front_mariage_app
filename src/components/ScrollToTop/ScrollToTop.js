import React, { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";
import "./ScrollToTop.css";

const ScrollToTop = () => {
    const { y: pageYOffset } = useWindowScroll();
    const [visible, setVisibility] = useState(false);

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

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth"})
    
    return(
        <div className="scroll-to-top" onClick={scrollToTop}>
            <i className="icon fas fa-chevron-up"></i>
        </div>
    )
}

export default ScrollToTop;