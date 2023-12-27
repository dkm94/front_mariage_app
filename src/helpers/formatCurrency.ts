export function floatToEuro(float: number){
    let euroCurrency: string;
    euroCurrency = '\u20AC' + float.toLocaleString('nl-NL',{minimumFractionDigits: 2});
    return euroCurrency;
};
