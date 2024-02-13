import { createI18n } from 'vue-i18n'

import en from "../language/en.json";
import es from "../language/es.json";


const i18n = createI18n({
    legacy:false,
    locale: "en",
    fallbackLocale: "en",
    messages: {
        "en": en,
        "es": es
      }
})

export default i18n