'use client'
import Breadcrumb from "@/components/common/breadcrumb/Breadcrumb";
import SampleVideoMain from "@/components/sample-video/SampleVideoMain";
import { IWeddingInfoType } from "@/interFace/interFace";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
    const { id } = useParams();
    const [weddingInfo, setWeddingInfo] = useState<IWeddingInfoType>();

    const handleFetchWeddingInfos = async () => {
        await axios.get(
            `${process.env.BASE_URL}video/${id}`
        )
            .then((res) => {
                console.log(res)
                setWeddingInfo(res.data.demoVideo)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        handleFetchWeddingInfos();
    }, [id])
    console.log(weddingInfo)
    if (!weddingInfo) return <h1>...Loading</h1>
    return (
        <>
            <main>
                <Breadcrumb breadHome="Global Creations" breadMenu="Sample Video" />
                <SampleVideoMain weddingInfo={weddingInfo} />
            </main>
        </>
    );
};

export default Page;
