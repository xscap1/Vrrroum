import { COLORS } from "./theme";

const colors = [COLORS.notation1, COLORS.notation2, COLORS.notation3, COLORS.notation4, COLORS.notation5];
const noteScore = ['Mauvais', 'Médiocre', 'Bon', 'Excellent'];
const envScore = ['E', 'D', 'C', 'B', 'A']

const noteToColor = (note) => {
    const tranche = Math.floor(note / 2) + 1;

    if (tranche > 0 && tranche <= colors.length)
        return colors[tranche - 1];
    else if (tranche > colors.length)
        return colors[colors.length - 1];

    return COLORS.invalidNotation;
};

const hasCommonItems = (array1, array2) => {
    const set1 = new Set(array1);
    const set2 = new Set(array2);

    return [...set1].some(item => set2.has(item));
}

const envToScore = (note) => {
    const tranche = Math.floor(note / 2) + 1;

    if (tranche > 0 && tranche <= envScore.length)
        return envScore[tranche - 1];
    else if (tranche > envScore.length)
        return envScore[envScore.length - 1];

    return '?';
}

const noteToText = (note) => {
    const tranche = Math.floor(note / 2.5) + 1;

    if (tranche > 0 && tranche <= noteScore.length)
        return noteScore[tranche - 1];
    else if (tranche > noteScore.length)
        return noteScore[noteScore.length - 1];

    return '?';
}

export { noteToColor, hasCommonItems, envToScore, noteToText };