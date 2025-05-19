import FooterComponent from "./(clientView)/components/FooterComponent";
import ListCardComponent from "./(clientView)/components/ListCard";
import NavbarComponent from "./(clientView)/components/LandingPage";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import LandingPage from "./(clientView)/components/LandingPage";

export default function Page(){
  return (
    <div>
      <LandingPage/>
      <FooterComponent/>
    </div>
  )
}