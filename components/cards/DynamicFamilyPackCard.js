import dynamic from 'next/dynamic';

const DynamicFamilyPackCard = dynamic(() => import('./FamilyPackCard'), {
    ssr: false,
});

export default DynamicFamilyPackCard;