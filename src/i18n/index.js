import { createI18n } from 'vue-i18n'
import messages from '../lang';

export const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: messages,

})