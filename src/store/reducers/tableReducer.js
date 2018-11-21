import { cloneDeep } from 'lodash';

const initState = {
    corporators:{
        Hyderabad:[
            {id: 1, name:"Suresh", area:"madhapur", age:45},
            {id: 2, name:"Harish", area:"Kondapur", age:35},
            {id: 3, name:"Ramesh", area:"Miyapur", age:65},
            {id: 4, name:"Rajesh", area:"BHEL", age:55}
        ],
        Bangalore:[
            {id: 1, name:"Manjunath", area:"Mejastic", age:45},
            {id: 2, name:"Mahesh", area:"Hebbal", age:35},
            {id: 3, name:"Raja Rao", area:"KRPuram", age:65},
            {id: 4, name:"Shankar", area:"BTM", age:55}
        ],
        Chennai:[
            {id: 1, name:"Daniel", area:"Villuvakam", age:45},
            {id: 2, name:"Saravana", area:"TNagar", age:35},
            {id: 3, name:"Kishore", area:"Tambaram", age:65},
            {id: 4, name:"Rajan", area:"Ennore", age:55}
        ],
    }
}

const tableReducer = (state = initState, action) => {
    let st = state;
    switch (action.type) {
        case 'DELETE_CORPORATOR_CITY': {
            // so function to update initial state
            const { corporators } = st;
            const corporatorsClone = cloneDeep(corporators);
            Object.keys(corporatorsClone).map(cityName => {
                console.log(action.cityName, cityName)
                if (action.cityName === cityName) {
                    corporatorsClone[cityName] = action.updatedRows;
                }
                return null;
            });
            console.log('corporatorsClone', corporatorsClone);
            st = { ...state, corporators: corporatorsClone };
            break;
        }
        case  "ADD_CORPORATOR_CITY": {
            const { corporators } = st;
            const corporatorsClone = cloneDeep(corporators);
            Object.keys(corporatorsClone).map(cityName => {
                // console.log(action.cityName, action.obj, cityName)
                if (action.cityName === cityName) {
                    // console.log(action.obj);
                    corporatorsClone[cityName].push(action.obj);
                    console.log(corporatorsClone[cityName]);
                    // corporatorsClone[cityName] = action.updatedRows;
                }
                return null;
            });
            console.log('corporatorsClone', corporatorsClone);
            st = { ...state, corporators: corporatorsClone };
            break;
        }
        case "ADD_CITY":{
            const { corporators } = st;
            const corporatorsClone = cloneDeep(corporators);
            corporatorsClone[action.city] = [];
            console.log('corporatorsClone', corporatorsClone);
            st = { ...state, corporators: corporatorsClone };
            break; 
            
        }
        case  "EDIT_CORPORATOR_CITY": {
            const { corporators } = st;
            const corporatorsClone = cloneDeep(corporators);
            const array = [];
            Object.keys(corporatorsClone).map(cityName => {
                if (action.cityName === cityName) {
                    // console.log(corporatorsClone[cityName]);
                    corporatorsClone[cityName].map((info) => {
                        console.log(info);
                        console.log(action.obj);
                        if (action.obj.id === info.id) {
                            console.log(action.obj);
                            array.push(action.obj);
                        } else {
                            array.push(info);
                        }
                        return null;
                    })
                    console.log(array, 'obj1');
                    // corporatorsClone[cityName] = action.updatedRows;
                }
                return null;
            });
            console.log(array);
            console.log('corporatorsClone', corporatorsClone);
            corporatorsClone[action.cityName] = array
            st = { ...state, corporators: corporatorsClone };
            break;
            
        }
        default: {
            return st;
        }
    }
    return st;
}

export default tableReducer