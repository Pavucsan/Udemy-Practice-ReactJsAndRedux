import {GET_PROJECTS, GET_PROJECT, DELETE_PROJECT} from '../actions/types'

const initialState = {
    projects : [],
    project : {}
};

export default function(state = initialState, action){
    switch (action.type) {
        case GET_PROJECTS:
            return{
                ...state,
                projects: action.payload
            };  
        case GET_PROJECT:
            return{
                ...state,
                project: action.payload
            }; 
        case DELETE_PROJECT:
            return{
                ...state,
                // projects: action.payload

                // fresh list of project after the delete project
                projects: state.projects.filter(
                    project => project.projectIdentifier !== action.payload
                )
                // filter all project if they have any project match with ProjectIdentifier
                
            }; 
        default:
            return state;
    }
}



