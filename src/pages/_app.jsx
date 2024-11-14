import AllUserContextProvider from "@/contexts/allUserContext";
import PageContextProvider from "@/contexts/pageContext";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <PageContextProvider>
      <AllUserContextProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </AllUserContextProvider>
    </PageContextProvider>
  );
}
