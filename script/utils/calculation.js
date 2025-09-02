export const percent = function(value, percent) {
    return parseFloat((value * (percent / 100)).toFixed(2));
}