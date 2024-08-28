import { COLORS } from "./theme";

const colors = [COLORS.notation1, COLORS.notation2, COLORS.notation3, COLORS.notation4, COLORS.notation5];
const noteScore = ['Très mauvais', 'Mauvais', 'Moyen', 'Bon', 'Excellent'];
const invalidScore = 'Non noté';
const envScore = ['E', 'D', 'C', 'B', 'A']
const criteria = {
    poussiere_salete: "Poussière et saleté",
    goudron: "Goudron",
    particules_de_fer: "Particules de fer",
    residus_insecte: "Résidu d'insecte",
    sebum: "Sébum",
    huiles: "Huiles",
    brillance: "Brillance",
    protection: "Protection",
    durabilite: "Durabilité",
    hydrophobie: "Hydrophobie",
    rayure: "Rayure",
    effet_nettoyant: "Effet nettoyant général",
    nourrissant: "Nourrissant",
    resistance_chimique: "Résistance du produit",
    aspect_final: "Aspect final"
}

const categories = {
    plastic : "Nettoyant plastique",
    body: "Nettoyant carrosserie",
    shampoo: "Shampooing",
    wax: "Cire",
    polish: "Polish",
    scratches: "Efface rayures",
    chrome: "Chrome et Alu",
    dirt: "Détachant goudron",
    rim: "Nettoyant jantes",
    tire: "Nettoyant pneus",
    textile: "Nettoyant textile",
    window: "Nettoyant vitres",
    fog: "Anti-buée",
    rain: "Anti-pluie",
    brake: "Nettoyant frein",
    bugs: "Nettoyant insecte",
    universal: "Nettoyant universel"
}

const noteToColor = (note) => {
    const tranche = Math.floor(note / 2) + 1;

    if (note == 0) return COLORS.invalidNotation;
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
    const tranche = Math.floor(note / 2) + 1;

    if (!(note > 0)) return invalidScore;

    if (tranche > 0 && tranche <= noteScore.length)
        return noteScore[tranche - 1];
    else if (tranche > noteScore.length)
        return noteScore[noteScore.length - 1];

    return '?';
}

const criteriaToText = (c) => {
    if (criteria[c]) return criteria[c];
    return "";
}

const categoryToText = (c) => {
    console.log(c);
    if (categories[c]) return categories[c];
    return "";
}

const formatNote = (note) => {
    const rounded = Math.round(note * 10) / 10;

    // Vérifier si le nombre est entier après arrondi
    if (Number.isInteger(rounded)) {
        return rounded.toString(); // Retourner sans '.0'
    } else {
        return rounded.toFixed(1); // Retourner avec une décimale
    }
}
export { noteToColor, hasCommonItems, envToScore, noteToText, criteriaToText, formatNote, categoryToText };