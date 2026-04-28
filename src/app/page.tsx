import FooterComponent from "./(clientView)/components/FooterComponent";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import LandingPage from "./(clientView)/components/LandingPage";
import HomeAuthGate from "@/components/HomeAuthGate";

export default function Page(){
  return (
    <HomeAuthGate>
      <div>
        <LandingPage/>
        <FooterComponent/>
      </div>
    </HomeAuthGate>
  )
}