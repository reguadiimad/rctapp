// FullScreenModal.js
import React from 'react';
import '../style.scss'
import { useSelector } from 'react-redux';

const ConfermationModel = ({ isVisible, firstName, lastName, onClose}) => {
    const {persons} = useSelector((state) => state.persons);
    const personExists = persons.some(
        (person) =>
            person.first_name === firstName && 
            person.last_name === lastName
    );

    

    
    if(!isVisible)return null
        return (
            <div className='flex items-center justify-center absolute w-full h-full top-0 left-0 backdrop-blur-lg bg-white/50 imad'>
            <div className='w-[70%]  text-sm'>

                    <p className='m-auto w-full text-center  text-black/80'>
                    {
                        !personExists ?
                        `Are you sure you want to add ${firstName} ${lastName} to the list?` :
                        `${firstName} ${lastName} already exists in our list.`
                    }
                    </p>
                    <div className='w-full flex justify-center items-center mt-5'>
                        <button className='p-2 rounded-md text-red-400 m-1' onClick={onClose}>Back</button>
                        {!personExists && <input type='submit' className='p-2 pl-3 pr-3 rounded-md text-white bg-teal-400 m-1 cursor-pointer' value={'Sure'}/>}
                    </div>
            </div>
            </div>

            
        );
};

export default ConfermationModel;
