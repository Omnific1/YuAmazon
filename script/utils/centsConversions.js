export const convertCentToRupees = function(priceCents){
    return parseFloat(((priceCents / 100) * 82).toFixed(2)) 
}