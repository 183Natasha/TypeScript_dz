import makeOrdinal from './makeOrdinal';
import isFinite from './isFinite'
import isSafeNumber from './isSafeNumber'

const enum NumbersInWords {
    TEN = 10,
    ONE_HUNDRED = 100,
    ONE_THOUSAND = 1000,
    ONE_MILLION = 1000000,
    ONE_BILLION = 1000000000,        //         1.000.000.000 (9)
    ONE_TRILLION = 1000000000000,      //     1.000.000.000.000 (12)
    ONE_QUADRILLION = 1000000000000000, // 1.000.000.000.000.000 (15)
    MAX = 9007199254740992,       // 9.007.199.254.740.992 (15)
}

let LESS_THAN_TWENTY: string[] = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];

let TENTHS_LESS_THAN_HUNDRED: string[] = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example toWords(12) => 'twelve'
 * @param {number|string} number
 * @param {boolean} [asOrdinal] - Deprecated, use toWordsOrdinal() instead!
 * @returns {string}
 */
function toWords(number: number|string, asOrdinal?: boolean) {
    let words: string;
    let num : number = parseInt(number.toString(), 10);

    if (!isFinite(num)) {
        throw new TypeError(
            'Not a finite number: ' + number + ' (' + typeof number + ')'
        );
    }
    if (!isSafeNumber(num)) {
        throw new RangeError(
            'Input is not a safe number, it’s either too large or too small.'
        );
    }
    words = generateWords(num);
    return asOrdinal ? makeOrdinal(words) : words;
}

function generateWords(number:number, words?:string[]) : string {
    let remainder: number, 
        word:string

    // We’re done
    if (number === 0) {
        return !words ? 'zero' : words.join(' ').replace(/,$/, '');
    }
    // First run
    if (!words) {
        words = [];
    }
    // If negative, prepend “minus”
    if (number < 0) {
        words.push('minus');
        number = Math.abs(number);
    }

    if (number < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[number];

    } else if (number < NumbersInWords.ONE_HUNDRED) {
        remainder = number % NumbersInWords.TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / NumbersInWords.TEN)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }

    } else if (number < NumbersInWords.ONE_THOUSAND) {
        remainder = number % NumbersInWords.ONE_HUNDRED;
        word = generateWords(Math.floor(number / NumbersInWords.ONE_HUNDRED)) + ' hundred';

    } else if (number < NumbersInWords.ONE_MILLION) {
        remainder = number % NumbersInWords.ONE_THOUSAND;
        word = generateWords(Math.floor(number / NumbersInWords.ONE_THOUSAND)) + ' thousand,';

    } else if (number < NumbersInWords.ONE_BILLION) {
        remainder = number % NumbersInWords.ONE_MILLION;
        word = generateWords(Math.floor(number / NumbersInWords.ONE_MILLION)) + ' million,';

    } else if (number < NumbersInWords.ONE_TRILLION) {
        remainder = number % NumbersInWords.ONE_BILLION;
        word = generateWords(Math.floor(number / NumbersInWords.ONE_BILLION)) + ' billion,';

    } else if (number < NumbersInWords.ONE_QUADRILLION) {
        remainder = number % NumbersInWords.ONE_TRILLION;
        word = generateWords(Math.floor(number / NumbersInWords.ONE_TRILLION)) + ' trillion,';

    } else if (number <= NumbersInWords.MAX) {
        remainder = number % NumbersInWords.ONE_QUADRILLION;
        word = generateWords(Math.floor(number / NumbersInWords.ONE_QUADRILLION)) +
        ' quadrillion,';
    }

    words.push(word);
    return generateWords(remainder, words);
}

export default toWords;