"use client"
import React, {useEffect} from 'react';
import "../../styles/Loader.scss";
import {useSelector} from "react-redux";

const Loader = () => {
    const loader = useSelector(state => state.loading.isLoading);

    useEffect(() => {

        const pageHeight = document.documentElement.scrollHeight;
        console.log("Id height:", pageHeight);
    }, []);

    return (
        loader && <div id='loader_div'>
            <div className="loader"></div>
        </div>
    );
}

export default Loader;