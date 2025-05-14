import CommonLayout from "../../app/layouts/commonLayout";
import HeroSection from "../..//components/HeroSection";
import PackageSection from "../../components/PackageSection";
import HomePack from "../../components/HomePack";
import FeaturedProductsSection from "../../components/FeaturedProductsSection";
import WhyWeBestSection from "../..//components/WhyWeBestSection";
import LocationCheck from "../..//components/modals/LocationCheck";

const Page = () => {
    return <CommonLayout>
        <HeroSection/>
        <PackageSection/>
        {/*<HomePack/>*/}
        <FeaturedProductsSection/>
        <WhyWeBestSection/>
    </CommonLayout>
}

export default Page