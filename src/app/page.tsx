import Footer from "@/components/Footer";
import Benefit from "./containers/benefit";
import Campaign from "./containers/campaign";
import Experience from "./containers/experience";
import GetTalent from "./containers/getTalent";
import Hero from "./containers/hero";
import NewsLetter from "./containers/newsLetter";
import Offers from "./containers/offers";
import Training from "./containers/training";

// async function getUserAuthDetails() {

//   console.log("the get server************")
//   // const cookieStore = cookies();
//   // const token = cookieStore.get("token")?.value;
//   // console.log("token", token)
//   // if (!token) return false;
//   // try {
//   //   const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET_KEY);
//   //   return true;
//   // } catch (err) {
//   //   console.log("err", err);
//   //   return false;
//   // }
// }


export default function Home() {
  // const userAuthDetails = await getUserAuthDetails();

  return (
    <main className="flex min-h-screen h-full flex-col">
      <Hero />
      <Training />
      <Offers />
      <GetTalent />
      <NewsLetter />
      <Experience />
      <Benefit />
      <Campaign />
      <Footer />
    </main>
  );
}
