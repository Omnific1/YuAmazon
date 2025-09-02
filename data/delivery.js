import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
export const deliveryOptions = [{
    id : '1',
    days : 10,
    priceCents : 0 
},{
    id : '2',
    days : 4,
    priceCents : 70 
},{
    id : '3',
    days : 1,
    priceCents : 200
}]

export const getDeliveryByID = function(id) {
    for(let i = 0 ; i < deliveryOptions.length ; i++){
        if(deliveryOptions[i].id == id){
            return deliveryOptions[i];
        }
    }
    console.error(`delivery ID not found ID : ${id}`)
}

export const calculateDeliveryDate = function (daysAdd) {
    const today = dayjs();
    let deliveryDate = today;

    while (daysAdd > 0) {
        deliveryDate = deliveryDate.add(1, 'day');
        let deliveryWeek = deliveryDate.format('ddd');

        if (deliveryWeek !== 'Sun' && deliveryWeek !== 'Sat') {
            daysAdd--; 
        }
    }

    return deliveryDate.format('dddd, MMM D YYYY');
};


