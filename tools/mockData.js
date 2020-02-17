const newFlight = {
  id: null,
  airline: "",
  flightNumber: null,
  from: "",
  to: "",
  arrive: "",
  seats: [],
  passengerList: [],
  ancillaryServices: [],
  mealPreferences: [],
  shoppingItems:[]
};

const flightData = [
  {
    id: 1,
    airline: "Air India",
    flightNumber: 12345,
    from: "Mumbai",
    to: "delhi",
    arrive: "22:30",
    seats: [
      {
        seatNumber: "1",
        checkedIn: true,
        passangerId: 1
      },
      {
        seatNumber: "2",
        checkedIn: true,
        passangerId: 2
      },
      {
        seatNumber: "3",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "4",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "5",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "6",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "7",
        checkedIn: true,
        passangerId: 3
      },
      {
        seatNumber: "8",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "9",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "10",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "11",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "12",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "13",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "14",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "15",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "16",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "17",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "18",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "19",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "20",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "21",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "22",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "23",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "24",
        checkedIn: false,
        passangerId: null
      }
    ],
    passengerList: [
      {
        id: 1,
        name: "Prasad kadam",
        age: "28",
        address: "",
        passportNumber: "N123456",
        expiryDate: "2020-01-23",
        dob: "1992-01-23",
        ancillaryServices: [
          "Entertainment", "In-flight Shop"
        ],
        mealPreferences:[],
        shoppingItems: [],
        checkedIn: true,
        seatNumber: "1",
        wheelchair: false,
        infants: false
      },
      {
        id: 2,
        name: "Prasad kadam2",
        age: "28",
        address: "",
        passportNumber: "N123456",
        expiryDate: "2020-01-23",
        dob: "1992-01-23",
        ancillaryServices: [
          "Special Meals", "Entertainment"
        ],
        mealPreferences:["veg", "non-veg"],
        shoppingItems: [],
        checkedIn: true,
        seatNumber: "2",
        wheelchair: false,
        infants: false
      },
      {
        id: 3,
        name: "Prasad kadam3",
        age: "28",
        address: "skjdh fkshf kshfk",
        passportNumber: "",
        expiryDate: "2020-01-23",
        dob: "1992-01-23",
        ancillaryServices: [
          "Special Meals", "Excess baggage", "In-flight Shop"
        ],
        mealPreferences:["veg", "non-veg"],
        shoppingItems: [],
        checkedIn: true,
        seatNumber: "7",
        wheelchair: false,
        infants: false
      },
      {
        id: 4,
        name: "Prasad kadam4",
        age: "28",
        address: "",
        passportNumber: "N123456",
        expiryDate: "2020-01-23",
        dob: "",
        ancillaryServices: [
          "Entertainment", "In-flight Shop"
        ],
        mealPreferences:[],
        shoppingItems: [],
        checkedIn: false,
        seatNumber: null,
        wheelchair: false,
        infants: true
      },
      {
        id: 5,
        name: "Prasad kadam5",
        age: "28",
        address: "",
        passportNumber: "N123456",
        expiryDate: "2020-01-23",
        dob: "",
        ancillaryServices: [
          "Entertainment", "In-flight Shop"
        ],
        mealPreferences:[],
        shoppingItems: [],
        checkedIn: false,
        seatNumber: null,
        wheelchair: true,
        infants: true
      }
    ],
    ancillaryServices: [
      "Entertainment",
      "Special Meals",
      "In-flight Shop",
      "Excess baggage",
      "Physician Support",
    ],
    mealPreferences: [
      "veg",
      "non-veg",
      "Jain Meal",
      "Gluten Free Meal",
      "Diabetic Meal",
      "Seafood Meal",
      "Baby Meal"
    ],
    shoppingItems: [
      "Item1",
      "Item2",
      "Item4",
      "Item5",
      "Item6",
      "Item7",
      "Item8",
      "Item9",
      "Item10",
    ]
  },
  {
    id: 2,
    airline: "Air Asia",
    flightNumber: 54321,
    from: "Mumbai",
    to: "delhi",
    arrive: "22:00",
    seats: [
      {
        seatNumber: "1",
        checkedIn: true,
        passangerId: 1
      },
      {
        seatNumber: "2",
        checkedIn: true,
        passangerId: 2
      },
      {
        seatNumber: "3",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "4",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "5",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "6",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "7",
        checkedIn: true,
        passangerId: 3
      },
      {
        seatNumber: "8",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "9",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "10",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "11",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "12",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "13",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "14",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "15",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "16",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "17",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "18",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "19",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "20",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "21",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "22",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "23",
        checkedIn: false,
        passangerId: null
      },
      {
        seatNumber: "24",
        checkedIn: false,
        passangerId: null
      }
    ],
    passengerList: [
      {
        id: 1,
        name: "Prasad kadam",
        age: "28",
        address: "",
        passportNumber: "N123456",
        expiryDate: "2020-01-23",
        dob: "1992-01-23",
        ancillaryServices: [
          "Entertainment", "In-flight Shop"
        ],
        mealPreferences:[],
        shoppingItems: [],
        checkedIn: true,
        seatNumber: "1",
        wheelchair: false,
        infants: false
      },
      {
        id: 2,
        name: "Prasad kadam2",
        age: "28",
        address: "",
        passportNumber: "N123456",
        expiryDate: "2020-01-23",
        dob: "1992-01-23",
        ancillaryServices: [
          "Special Meals", "Entertainment"
        ],
        mealPreferences:["veg", "non-veg"],
        shoppingItems: [],
        checkedIn: true,
        seatNumber: "2",
        wheelchair: false,
        infants: false
      },
      {
        id: 3,
        name: "Prasad kadam3",
        age: "28",
        address: "skjdh fkshf kshfk",
        passportNumber: "",
        expiryDate: "2020-01-23",
        dob: "1992-01-23",
        ancillaryServices: [
          "Special Meals", "Excess baggage", "In-flight Shop"
        ],
        mealPreferences:["veg", "non-veg"],
        shoppingItems: [],
        checkedIn: true,
        seatNumber: "7",
        wheelchair: false,
        infants: false
      },
      {
        id: 4,
        name: "Prasad kadam4",
        age: "28",
        address: "",
        passportNumber: "N123456",
        expiryDate: "2020-01-23",
        dob: "",
        ancillaryServices: [
          "Entertainment", "In-flight Shop"
        ],
        mealPreferences:[],
        shoppingItems: [],
        checkedIn: false,
        seatNumber: null,
        wheelchair: false,
        infants: true
      },
      {
        id: 5,
        name: "Prasad kadam5",
        age: "28",
        address: "",
        passportNumber: "N123456",
        expiryDate: "2020-01-23",
        dob: "",
        ancillaryServices: [
          "Entertainment", "In-flight Shop"
        ],
        mealPreferences:[],
        shoppingItems: [],
        checkedIn: false,
        seatNumber: null,
        wheelchair: true,
        infants: true
      }
    ],
    ancillaryServices: [
      "Entertainment",
      "Special Meals",
      "In-flight Shop",
      "Excess baggage",
      "Physician Support",
    ],
    mealPreferences: [
      "veg",
      "non-veg",
      "Jain Meal",
      "Gluten Free Meal",
      "Diabetic Meal",
      "Seafood Meal",
      "Baby Meal"
    ],
    shoppingItems: [
      "Item1",
      "Item2",
      "Item4",
      "Item5",
      "Item6",
      "Item7",
      "Item8",
      "Item9",
      "Item10",
    ]
  }
]

const userRoles = [
  {
    email: "airlineconsole.ad@gmail.com",
    role: "admin"   
  },
  {
    email: "airlineconsole.staff@gmail.com",
    role: "staff"
  }
]
    
const currentUser = {
      name : "",
      email: "",
      imageUrl: ""
    }

const newPassenger = {
  name: "",
  age: "",
  address: "",
  passportNumber: "",
  expiryDate: "",
  dob: "",
  ancillaryServices: [],
  mealPreferences:[],
  shoppingItems: [],
  checkedIn: false,
  seatNumber: "",
  wheelchair: false,
  infants: false
}
module.exports = {
  flightData,
  newFlight,
  userRoles,
  currentUser,
  newPassenger
};
