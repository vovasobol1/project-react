import {userReducer} from "./user-reduser";


test('прибавление возраста' , ()=>{
    const startState = {age : 20 , childrenCounter : 2 ,name : 'anton' }

    const endState = userReducer(startState , {type: "INCREMENT-AGE"})

    expect(endState.age).toBe(21)
    expect(endState.childrenCounter).toBe(2)
});


test('прибавление количсетва детей' , ()=>{
    const startState = {age : 20 , childrenCounter : 2 ,name : 'anton' }

    const endState = userReducer(startState , {type: "INCREMENT-CHILDREN-COUNT"})

    expect(endState.childrenCounter).toBe(3)
    expect(endState.age).toBe(20)
});

test('переименование пользователя' , ()=>{
    const startState = {age : 20 , childrenCounter : 2 ,name : 'anton' }
    let newName = 'egor'

    const endState = userReducer(startState , {type: "CHANGE-NAME" , newName:newName})

    expect(endState.childrenCounter).toBe(2)
    expect(endState.age).toBe(20)
    expect(endState.name).toBe(newName)
});