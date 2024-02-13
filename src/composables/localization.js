import i18n from '../i18n/index'
const locale = i18n.global.locale;

// Función para obtener el texto localizado y reemplazar valores
export function useLocalizeText(key) {
    return i18n.global.t(key);
}
