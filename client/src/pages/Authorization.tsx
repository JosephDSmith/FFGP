
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../functionality/UserContext';
import AuthCard from '../components/Authorization/AuthCard';


const Authorization = () => {
  const nav = useNavigate();
  const [popup, setPopup] = useState<Window | null>(null);
  const { user, setUser } = useContext(UserContext)!;

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 400;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    const title = 'Login with Google';
    const url = '/google';

    setPopup(popup);
  };

  useEffect(() => {
    // Add the message listener
    const messageEventListener = (event: MessageEvent) => {

      console.log(event.data.user);
      if (event.data.url && event.data.url.match('/google/auth')) {
        setUser(event.data);

        nav('/home');
      }
    };

    window.addEventListener('message', messageEventListener);

    return () => {
      window.removeEventListener('message', messageEventListener);
    };
  }, [setUser, nav]);


  useEffect(() => {
    const popupCloseListener = () => {
      setPopup(null);
    };

    if (popup) {
      popup.addEventListener('beforeunload', popupCloseListener);
    }

    return () => {
      if (popup) {
        popup.removeEventListener('beforeunload', popupCloseListener);
      }
    };
  }, [popup]);

  return (
    <div className="authorization flex flex-col items-center justify-center mt-16">
      <img src="https://i.ibb.co/WKs7pwz/programmershomepage.png" alt="programmers collaborating"/>
      <div className="mt-4">
        <AuthCard onGoogleLogin={handleGoogleLogin} />
      </div>
    </div>
  );
};

export default Authorization;
