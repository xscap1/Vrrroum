// import "./data/filter_body.json";
// import "./data/filter_brake.json";
// import "./data/filter_bugs.json";
// import "./data/filter_chrome.json";
// import "./data/filter_dirt.json";
// import "./data/filter_fog.json";
// import "./data/filter_oil.json";
// import "./data/filter_plastic.json";
// import "./data/filter_polish.json";
// import "./data/filter_rain.json";
// import "./data/filter_rim.json";
// import "./data/filter_scratches.json";
// import "./data/filter_shampoo.json";
// import "./data/filter_textile.json";
// import "./data/filter_tire.json";
// import "./data/filter_tiremec.json";
// import "./data/filter_universal.json";
// import "./data/filter_wax.json";
// import "./data/filter_window.json";

const filters = {
    body: require("./data/filter_body.json"),
    brake: require("./data/filter_brake.json"),
    bugs: require("./data/filter_bugs.json"),
    chrome: require("./data/filter_chrome.json"),
    dirt: require("./data/filter_dirt.json"),
    fog: require("./data/filter_fog.json"),
    oil: require("./data/filter_oil.json"),
    plastic: require("./data/filter_plastic.json"),
    polish: require("./data/filter_polish.json"),
    rain: require("./data/filter_rain.json"),
    rim: require("./data/filter_rim.json"),
    scratches: require("./data/filter_scratches.json"),
    shampoo: require("./data/filter_shampoo.json"),
    textile: require("./data/filter_textile.json"),
    tire: require("./data/filter_tire.json"),
    tiremec: require("./data/filter_tiremec.json"),
    universal: require("./data/filter_universal.json"),
    wax: require("./data/filter_wax.json"),
    window: require("./data/filter_window.json")
};

const getFilter = (name) => {
    try {
        return filters[name];
    } catch (error) {
        console.error(`Error loading filter: ${name}`, error);
        return null;
    }
}

export { getFilter }; 