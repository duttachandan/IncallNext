import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/globals.css';
import './Styles/custom.scss'; 
import './Styles/app.css'
import './Styles/responsive.css'
import RootLayout from "./layout"; // Import your layout component

function App({ Component, pageProps }) {
    return (
        <RootLayout>
            <Component {...pageProps} />
        </RootLayout>
    )
}

export default App;
