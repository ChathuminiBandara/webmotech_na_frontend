"use client"
import CommonLayout from "@/app/layouts/commonLayout";
import ProductViewSection from "@/components/ProductViewSection";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import * as packageService from "@/service/packageService";
import {customToastMsg} from "@/util/CommonFun";
import {setLoading} from "@/redux/actions/loadingActions";

const page = ({params}) => {
    const dispatch = useDispatch();
    const [prodData, setProdDate] = useState([])
    useEffect(() => {
        dispatch(setLoading(false));
        getPackageDetails()
    }, []);


    const getPackageDetails = () => {
        console.log('packageDetails', params)
        dispatch(setLoading(true));
        packageService.getPackageSizeDetailsBySlug(params.id).then(res => {
            let temp = {
                ...res.data,
                packageType: params.category
            }
            setProdDate(temp)
            dispatch(setLoading(false));
        }).catch(c => {
                customToastMsg(c.message, 0)
                dispatch(setLoading(false));
            }
        )
    }

    console.log(prodData)
    return <CommonLayout>
        <ProductViewSection packageType={params.category} prodData={prodData}/>
    </CommonLayout>
}
export default page