import React from "react";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { register } from 'timeago.js'

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
                'Load Failure': 'Load Failure',
                'User not found': 'User not found',
                Edit: 'Edit',
                'Change Display Name': 'Change Display Name',
                Save: 'Save',
                Cancel: 'Cancel',
                'My Profile':'My Profile',
                'There is not hoax':'There is not hoax',
                'Load old hoaxes': 'Load old hoaxes',
                'There are new hoaxes': 'There are new hoaxes',
                'Delete Hoax': `Delete Hoax`,
                'Are you sure to delete hoax?': 'Are you sure to delete hoax?',
                'Delete My Account':'Delete My Account',
                'Delete User': 'Delete User',
                'Are you sure to delete your profile?':'Are you sure to delete your profile?'
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
                'Load Failure': 'Yukleme Hatasi',
                'User not found': 'Kullanici bulunamadi',
                Edit: 'Duzenle',
                'Change Display Name': 'Gorunen Adi Degistir',
                Save: 'Kaydet',
                Cancel: 'Iptal',
                'My Profile': 'Hesabim',
                'There is not hoax':'Hoax bulunamadi',
                'Load old hoaxes': 'Eski hoaxlari yukle',
                'There are new hoaxes': 'Yeni hoaxlari yukle',
                'Delete Hoax': `Hoax'u Sil`,
                'Are you sure to delete hoax?': `Hoax'u silmek istediginizden emin misiniz?`,
                'Delete My Account':'Hesabimi Sil',
                'Delete User': 'Kullaniciyi Sil',
                'Are you sure to delete your profile?':'Profilinizi silmek istediginizden emin misiniz?'

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

const timeAgoTR  = function(number, index) {
    return [
        ['az önce', 'şimdi'],
        ['%s saniye önce', '%s saniye içinde'],
        ['1 dakika önce', '1 dakika içinde'],
        ['%s dakika önce', '%s dakika içinde'],
        ['1 saat önce', '1 saat içinde'],
        ['%s saat önce', '%s saat içinde'],
        ['1 gün önce', '1 gün içinde'],
        ['%s gün önce', '%s gün içinde'],
        ['1 hafta önce', '1 hafta içinde'],
        ['%s hafta önce', '%s hafta içinde'],
        ['1 ay önce', '1 ay içinde'],
        ['%s ay önce', '%s ay içinde'],
        ['1 yıl önce', '1 yıl içinde'],
        ['%s yıl önce', '%s yıl içinde'],
    ][index];
}

register('tr',timeAgoTR);

export default i18n;