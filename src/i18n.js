import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sign Up': 'Sign Up',
                'Passwords mismatch': 'Password mismatch',
                Username: 'Username',
                'Display Name': 'Display Name',
                Password: 'Password',
                'Password Repeat': 'Password Repeat',
                Login: 'Login',
                Logout: 'Logout',
                Users: 'Users',
                Next: 'Next >',
                Previous: '< Previous',
                'Loading...': 'Loading...',
                'Load Failure': 'Load Failure'
            }
        },
        tr: {
            translations: {
                'Sign Up': 'Kayıt Ol',
                'Passwords mismatch': 'Sifre eslesmedi',
                Username: 'Kullanıcı Adı',
                'Display Name': 'Gorunen Ad',
                Password: 'Parola',
                'Password Repeat': 'Parolayi Tekrarla',
                Login: 'Giris',
                Logout: 'Cikis Yap',
                Users: 'Kullanicilar',
                Next: 'Sonraki >',
                Previous: '< Onceki',
                'Loading...': 'Yukleniyor...',
                'Load Failure': 'Yukleme Hatasi'
            }
        }
    },
    fallbackLng: 'tr',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }
});

export default i18n;