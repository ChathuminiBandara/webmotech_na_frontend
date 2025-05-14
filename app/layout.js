"use client"
import {Inter} from "next/font/google";
import "./globals.css";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import React, {Suspense} from "react";


const inter = Inter({subsets: ["latin"]});
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer} from "react-toastify";


import {Provider} from 'react-redux';
import store from './../redux/index';
import Loader from "../components/loader/Loader";
import {ConfigProvider} from "antd";

export default function RootLayout({children}) {

    return (
        <html lang="en">
        <body className={inter.className}>
        <Provider store={store}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "rgb(45, 163, 74)",
                    },
                    components: {
                        Form: {
                            /* here is your component tokens */
                        },
                        input: {
                            colorPrimary: "rgb(45, 163, 74)",
                            activeBg: "rgb(45, 163, 74)",
                            activeBorderColor: "rgb(45, 163, 74)",
                            hoverBorderColor: "rgb(45, 163, 74)",
                        },
                    }
                }}
            >
                <Suspense fallback={<Loader/>}>
                    <AntdRegistry>
                        <Loader/>
                        {children}

                    </AntdRegistry>
                </Suspense>
            </ConfigProvider>
        </Provider>
        </body>
        </html>
    );
}
