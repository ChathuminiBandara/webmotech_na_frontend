import { useRouter } from 'next/router';

const moreDetails = () => {
    const router = useRouter();
    const { packageId } = router.query;

    return <div>Details for Package ID: {packageId}</div>;
};

export default moreDetails;