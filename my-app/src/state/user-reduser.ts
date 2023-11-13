
type UserStateType = {
    age:number
    childrenCounter : number
    name : string
}

type ActionType = {
    type: string
    [key : string] : any
}


export const userReducer = (state :UserStateType, action : ActionType):UserStateType =>{
    switch (action.type){
        case 'INCREMENT-AGE':
            return {
                ...state,
                age : state.age += 1
            }
        case 'INCREMENT-CHILDREN-COUNT':
            return {
                ...state,
                childrenCounter : state.childrenCounter += 1
            }
        case 'CHANGE-NAME':
            return {
                ...state,
                name : action.newName
            }
        default :
            throw new Error("я не знаю такой команды")

    }
}

