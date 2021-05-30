
export const iconMap = {
    'sms': 'sms',
    'phone': 'phone',
    'email': 'mail'
}

export const truncateTxt = (length, initialText) => {
    const txt = initialText.substring(0, length);
    return `${txt} ...`
}