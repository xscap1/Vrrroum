import { COLORS } from "./theme";

const colors = [COLORS.notation1, COLORS.notation2, COLORS.notation3, COLORS.notation4, COLORS.notation5];

const noteToColor = (note) => {
    const tranche = Math.floor(note / 2) + 1;

    if (tranche > 0 && tranche <= colors.length)
        return colors[tranche-1];
    return COLORS.invalidNotation;
};

export { noteToColor };