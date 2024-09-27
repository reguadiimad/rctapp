import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePerson, fetchPersons } from "../reduxToolKit/Slices/personSlice";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';



export default function PersonsList() {
    const dispatch = useDispatch();
    const { persons, status} = useSelector(state => state.persons);
    const ShapeStyle='mask  relative z-10  select-none rounded-3xl bg-[#848edb]/5  backdrop-blur-xl after:absolute after:inset-0 after:rounded-3xl after:bg-gradient-to-br after:from-white/80 after:via-white/10 after:to-white/80 after:p-px '
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPersons());
        }
    }, [status, dispatch]);

    const handleDelete = (personId) => {
        dispatch(deletePerson(personId));
      };
    


    return (
        <>
            <div className="w-[60%] h-[85%]  z-0 block">

                <div className={"w-[100%] h-[18%] ml-7 pt-9 pl-7 shadow-xl "+ShapeStyle} >
                    <h1 className="text-white text-3xl font-sans font-bold ">Persons List</h1>
                    <p className="text-xs mt-1 mb-10 text-white/70">Scroll down to view more person details. You can edit or delete the selected person's information directly from the list.</p>
                </div>
                {
                    persons.length === 0 && 
                    <div className={"w-[100%] h-[80%] mt-[1%] ml-7 shadow-xl flex items-center justify-center text-white/70 flex-col " + ShapeStyle}>
                         <i class="fa-solid fa-empty-set"></i>
                        <p className="mt-7">No persons found. Please try adding a new person with complete information from the left section.</p>
                    </div>
                }
                <div className="w-[100%] h-[82%] mt-2 pt-4 pb-4 overflow-y-auto block  ml-7">
                    
                {persons.map(prs => (
                    <div className={"w-[100%] mb-2.5   flex justify-center items-center overflow-hidden " + ShapeStyle} key={prs.id}>
                        <div className="w-[10%]  h-full  flex justify-center items-center ">
                            {prs.image_url === null ?
                                <FontAwesomeIcon icon={faUser} className="text-white  text-5xl " /> :
                                <img  src={prs.image_url}  className="w-16 h-16 rounded-full object-cover border-2 border-dashed" alt={prs.first_name + ' ' + prs.last_name} />
                            }
                        </div>
                        <div className="w-[65%] h-full pt-5 pb-5">
                            <h1 className="text-white text-2xl font-bold">{prs.first_name + ' ' + prs.last_name}</h1>
                            <p className="text-white/70 pt-1">
                                <span className="text-white">Email: </span>{prs.email}
                            </p>
                        </div>
                        <div className="w-[25%] h-full flex justify-center items-center pt-5 pb-5">
                            <button type="submit" className="w-[40%] p-2 text-white ">Edit</button>
                            <button className="w-[40%] p-2 bg-red-100 rounded-lg text-purple text-red-600 " onClick={()=>handleDelete(prs.id)}>Delete</button>
                        </div>
                    </div>
                ))}
                    
                </div>

            </div>
        </>
        
    );
}
