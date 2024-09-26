import { useState, useRef } from "react";
import { useDispatch,} from "react-redux";
import { addPerson } from "../reduxToolKit/Slices/personSlice";
import { useDropzone } from 'react-dropzone';
import BluredInterfaceModel from '../Models/BluredInterfaceModel';
import InputModel from "../Models/InputModels";
import ConfermationModel from "../Models/ConfermationModel";

export default function SideMenu() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState(null);
    const [isSubmited, setIsSubmited] = useState(false);
    const fileInputRef = useRef(null); 
    const dispatch = useDispatch();



    const onDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: false,
    });

    
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        if (file) {
            formData.append('image', file);
        }
    
        dispatch(addPerson(formData));

        setFirstName('');
        setLastName('');
        setEmail('');
        setFile(null);
        setIsSubmited(false);
    };
    

    const handelClearForm = () =>{
        setFirstName('');
        setLastName('');
        setEmail('');
        setFile(null);
        fileInputRef.current && (fileInputRef.current.value = '');
    };

    return (
        <BluredInterfaceModel w='[22%]' h='[85%]' extraStyle="p-7 pt-10 overflow-hidden">
            
            <h1 className="text-white text-3xl font-sans font-bold z-50">Person App</h1>
            <p className="text-xs mt-1 mb-10 text-white/70">Please fill out the form below to add someone to the list</p>
            
            <form className="mt-10 text-white/90 " onSubmit={handleSubmit}>
                <InputModel label={'First Name'} required={true} value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="Imad"/>
                <InputModel label={'Last Name'} required={true} value={lastName} onChange={e=>setLastName(e.target.value)} placeholder="Reguadi"/>
                <InputModel label={'Email'} required={true} value={email} onChange={e=>setEmail(e.target.value)} placeholder="xgy@aaaa.bb" type="email"/>
                <InputModel type="file" onChange={e => setFile(e.target.files[0])} onDrop={onDrop} file={file} ref={fileInputRef}/>

                <div className="w-full flex flex-row-reverse pr-3">
                    <div className="w-[50%] mr-[-10%] justify-start mt-10">
                        <button type="button" className="w-[45%] p-2 bg-purple-200 rounded-lg text-purple mr-2" onClick={handelClearForm}>Clear</button>
                        <button disabled={firstName === '' || lastName === '' || email === ''} type="button" onClick={() => setIsSubmited(!isSubmited)} className="w-[45%] p-2 bg-teal-500 rounded-lg text-white disabled:opacity-30">Add</button>
                    </div>
                </div>
                <ConfermationModel isVisible={isSubmited} firstName={firstName} lastName={lastName} onClose={()=>setIsSubmited(false)}/>
            </form>
        </BluredInterfaceModel>
    );
}
