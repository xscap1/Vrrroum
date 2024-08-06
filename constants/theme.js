const COLORS = {
    yellow : "#ddff00",
    background : "#1d1f1e",
    darkgray : "#0f1213",
    lightgray : "#3e4545",
    lightwhite : "#ecf0ef",
    subwhite : "#cdd3d2",
    notation1: "#FF0000",
    notation2: "#FF4000",
    notation3: "#FFBF00",
    notation4: "#01DF3A",
    notation5: "#088A29",
    invalidNotation : "#3e4545",
    lightgreen: "#35C262",
    whitesmoke : "#f2f2f2",
    gainsbora : "#e6e6e6",
    hyperlink: "#0000EE",
};

const SIZES = {
    xSmall: 10,
    small: 12,
    xMedium: 14,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32,
};

const SHADOWS = {
    small: {
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
    },
};

export { COLORS, SIZES, SHADOWS };