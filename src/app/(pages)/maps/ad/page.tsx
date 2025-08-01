'use client'
import React, {useState} from 'react';
import MapContent from "@/app/(pages)/maps/components/MapContent";
import {AD_MAP_CONTENT} from "@/config/Constants";
import ADMap from "@/app/(pages)/maps/components/ADMap";

const AndoraPage = () => {
    const [activeProvinceId, setActiveProvinceId] = useState<string | null>('7');
    return (
        <>
            <div className='grid grid-cols-12 gap-4'>
                <div className="col-span-12 md:col-span-5"><ADMap setActiveProvinceId={setActiveProvinceId}/></div>
                <div className='col-span-12 md:col-span-7'><MapContent key={AD_MAP_CONTENT} provinceID={Number(activeProvinceId)} countryID={4} /></div>
            </div>
        </>
    );
};

export default AndoraPage;