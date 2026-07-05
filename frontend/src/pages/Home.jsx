import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DashboardStats from "../components/DashboardStats";
import UploadCard from "../components/UploadCard";
import ATSChart from "../components/ATSChart";
import ResumeHistory from "../components/ResumeHistory";

function Home() {
    return (
        <>
            <Navbar />

            <Hero />

            <DashboardStats />

            <UploadCard />

            <ATSChart />

            <ResumeHistory />
        </>
    );
}

export default Home;