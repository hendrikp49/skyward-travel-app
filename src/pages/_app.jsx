import ActivityContextProvider from "@/contexts/activityContext";
import AllUserContextProvider from "@/contexts/allUserContext";
import BannerContextProvider from "@/contexts/bannerContext";
import PromoContextProvider from "@/contexts/promoContext";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import CategoryContextProvider from "@/contexts/categoryContext";
import TransactionContextProvider from "@/contexts/transactionContext";
import { store } from "@/store";
import { Provider } from "react-redux";
import CartContextProvider from "@/contexts/cartContext";
import UserContextProvider from "@/contexts/userContext";
import IsOpenContextProvider from "@/contexts/isOpen";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <IsOpenContextProvider>
        <UserContextProvider>
          <CartContextProvider>
            <TransactionContextProvider>
              <CategoryContextProvider>
                <ActivityContextProvider>
                  <PromoContextProvider>
                    <BannerContextProvider>
                      <AllUserContextProvider>
                        <Component {...pageProps} />
                        <ToastContainer />
                      </AllUserContextProvider>
                    </BannerContextProvider>
                  </PromoContextProvider>
                </ActivityContextProvider>
              </CategoryContextProvider>
            </TransactionContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </IsOpenContextProvider>
    </Provider>
  );
}
