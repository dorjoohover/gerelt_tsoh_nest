import { SymbolTypes } from "./enum"

export const SymbolType = (value: string) => {

    let firstLetter =value.substring(0, 1).toLowerCase()
    switch(firstLetter) {
        case 'а':
            return SymbolTypes.AB
        case 'б':
            return SymbolTypes.AB
        case 'в':
            return SymbolTypes.VG
        case 'г':
            return SymbolTypes.VG
        case 'д':
            return SymbolTypes.DE
        case 'е':
            return SymbolTypes.DE
        case 'ё':
            return SymbolTypes.EJ
        case 'ж':
            return SymbolTypes.EJ
        case 'з':
            return SymbolTypes.ZI
        case 'и':
            return SymbolTypes.ZI
        case 'к':
            return SymbolTypes.KL
        case 'л':
            return SymbolTypes.KL
        case 'м':
            return SymbolTypes.MN
        case 'н':
            return SymbolTypes.MN
        case 'о':
            return SymbolTypes.OU
        case 'ө':
            return SymbolTypes.OU
        case 'п':
            return SymbolTypes.PR
        case 'р':
            return SymbolTypes.PR
        case 'с':
            return SymbolTypes.ST
        case 'т':
            return SymbolTypes.ST
        case 'у':
            return SymbolTypes.UV
        case 'ү':
            return SymbolTypes.UV
        case 'ф':
            return SymbolTypes.PH
        case 'х':
            return SymbolTypes.PH
        case 'ц':
            return SymbolTypes.TSCH
        case 'ч':
            return SymbolTypes.TSCH
        case 'ш':
            return SymbolTypes.SHSHCH
        case 'щ':
            return SymbolTypes.SHSHCH
        case 'э':
            return SymbolTypes.EY
        case 'я':
            return SymbolTypes.EY

    }
}