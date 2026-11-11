export const CAL_URL = 'https://cal.com/vinicus-giovanni-dvo8w1/30min'

export const WHATSAPP_URL =
  'https://wa.me/5511968635390?text=' +
  encodeURIComponent('Olá, Vinícius! Vi seu portfólio e gostaria de conversar.')

export const EMAIL = 'viniciusgiovanni588@gmail.com'

export const CTA_LABEL = 'Agendar 30 min'

export const ROLE = 'Analista de Dados'

export function calUrl(location: string): string {
  return `${CAL_URL}?utm_source=portfolio&utm_medium=cta&utm_campaign=${location}`
}
