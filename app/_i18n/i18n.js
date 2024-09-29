import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import data from '../_locales/data.json'

const resources = {
  FR: {
    translation: data.fr
  },
  AR: {
    translation: data.ar
  },
  CHI: {
    translation: data.chi
  },
  RUS: {
    translation: data.ru
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", 

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;