import { QueryClient, QueryClientProvider } from "react-query";
import "tailwindcss/tailwind.css";
import "../../styles/globals.css";
const client = new QueryClient();


function MyApp({ Component, pageProps }) {
  return (
    <>
    <QueryClientProvider client={client}>
  <Component {...pageProps} />
  </QueryClientProvider>
  </>
  );
}

export default MyApp;
