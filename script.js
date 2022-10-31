//select dom elements
const counterContainerEl = document.getElementById("counterContainer")
const addCounterEl = document.getElementById("addCounter");
const resetCounterEl = document.getElementById("resetCounter");

//action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADD_COUNTER = "addCounter";
const RESET_COUNTER = "resetCounter";

//action creators
const increment = (value) => {
    return {
        type: INCREMENT,
        payload: value
    }
}

const decrement = (value) => {
    return {
        type: DECREMENT,
        payload: value
    }
}

const addCounter = (value) => {
    return {
        type: ADD_COUNTER,
        payload: value
    }
}

const resetCounters = (value) => {
    return {
        type: RESET_COUNTER,
        payload: value
    }
}

//define initial state
const initialState = {
    counters: [
        {
            id: 0,
            value: 0,
            increaseBy: 1,
            defaultValue: 0
        }
    ]
}

//reducer
const counterReducer = (state = initialState, action) => {
    console.log(action)
    if (action.type === INCREMENT) {
        return {
            ...state,
            counters: state.counters.map((counter) =>
                counter.id === action.payload.id ? { ...counter, value: counter.value + counter.increaseBy } : { ...counter }

            )
        }
    } else if (action.type === DECREMENT) {
        return {
            ...state,
            counters: state.counters.map((counter) =>
                counter.id === action.payload.id ? { ...counter, value: counter.value - counter.increaseBy } : { ...counter }
            )
        }
    } else if (action.type === ADD_COUNTER) {
        return {
            ...state,
            counters: [
                ...state.counters,
                {
                    id: state.counters.length + 1,
                    value: action.payload.defaultValue,
                    ...action.payload
                }

            ]
        }

    } else if (action.type === RESET_COUNTER) {
        return {https://github.com/learnwithsumit/tirw-1-assignment-solutions.git
            ...state,
            counters: state.counters.map((counter) => ({
                ...counter,
                value: counter.defaultValue
            }))
        }
    } else {
        return state;
    }

}

//create store 
const store = Redux.createStore(counterReducer);

const render = () => {
    const state = store.getState();
    state.counters.forEach((counter, i) => {
        if (!document.getElementById(`${counter}-div-${counter.id}-{i}`)) {
            const element = document.createElement("div");
            element.setAttribute("id", `${counter}-div-${counter.id}-{i}`);
            element.innerHTML = getCounterHTMLStringWithId(`${i}-${counter.id}`);
            counterContainerEl.insertAdjacentElement("beforeend", element);

            const incrementEl = document.getElementById(`increment-${i}-${counter.id}`);
            const decrementEl = document.getElementById(`decrement-${i}-${counter.id}`);

            incrementEl.addEventListener("click", () => {
                store.dispatch(increment(counter));
            });
            decrementEl.addEventListener("click", () => {
                // console.log("hi")
                store.dispatch(decrement(counter));
            })
        }

        const counterValueEl = document.getElementById(`counter-value-${i}-${counter.id}`);
        counterValueEl.innerHTML = counter.value;



    });
}

//Counter template with id
const getCounterHTMLStringWithId = (id) =>
    `<div class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow mb-5" id="counter-${id}"><div id="counter-value-${id}" class="text-2xl font-semibold"></div><div class="flex space-x-3"><button class="bg-indigo-400 text-white px-3 py-2 rounded shadow" id="increment-${id}">Increment</button><button id="decrement-${id}" class="bg-red-400 text-white px-3 py-2 rounded shadow" id="decrement">Decrement</button></div></div>`;

// update UI initially
render()

addCounterEl.addEventListener("click", () => {
    store.dispatch(addCounter(
        {
            defaultValue: Math.floor(Math.random() * 10 + 1),
            increaseBy: Math.floor(Math.random() * 10 + 1)
        }
    ))
})
resetCounterEl.addEventListener("click", () => {
    store.dispatch(resetCounters())
})

store.subscribe(render)