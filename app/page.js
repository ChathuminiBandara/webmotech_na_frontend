"use client";
import React, {useEffect} from "react";
import HomePage from "../app/home/page";
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import {setLoading} from "@/redux/actions/loadingActions";


export default function Home() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setLoading(false));
    }, []);

    return (
        < >
            <HomePage/>
        </ >
    );
}
