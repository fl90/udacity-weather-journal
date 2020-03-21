//import { calcTripLength } from "../src/client/index";


describe("Filter function", ()=> {
    // test stuff
    test("It should calc the length of the trip from 01.03.2020 to 15.03.2020", () => {
        // actual test

        expect(calcTripLength(new Date(2020, 3, 1), new Date(2020, 3, 15))).toEqual(14);
    });
})

const oneDay = 24 * 60 * 60 * 1000;
function calcTripLength(start, end){
    let length = Math.ceil(Math.abs((end - start) / oneDay));
    return length;
};