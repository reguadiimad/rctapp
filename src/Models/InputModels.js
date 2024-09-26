import React, { forwardRef } from 'react';
import { useDropzone } from 'react-dropzone';

// Forward ref to allow access to the file input in the parent component
const InputModel = forwardRef(({ label, required, value, onChange, placeholder = "", type = 'text', onDrop, file }, ref) => {
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: false,
    });

    if (type === 'file') {
        return (
            <>
                <label>Image</label>
                <div {...getRootProps()}
                    className={`w-[90%] h-[30%] border-4 border-dashed bg-white/20 border-white/50 rounded-lg mt-2 flex items-center justify-center cursor-pointer ${isDragActive ? 'bg-white/30' : ''}`}>
                    <input {...getInputProps()} />
                    
                    {file ? (
                        <div className="mt-4">
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Preview"
                                className="w-20 h-20 object-cover rounded-lg mb-6"
                                onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
                            />
                        </div>
                    ) : (
                        <p className="text-white p-10">
                            {isDragActive ? 'Drop the file here ...' : 'Drag & Drop your file here or click to browse'}
                        </p>
                    )}
                </div>
                
                {/* Display filename instead of "No file chosen" */}
                <div className="mt-2 text-white">
                    {file ? (
                        <p className="text-sm">Selected File: {file.name}</p>
                    ) : (
                        <p className="text-sm">No file chosen</p>
                    )}
                </div>
                
                <input
                    className="hidden" // Hide the default file input UI
                    type="file"
                    onChange={onChange}
                    ref={ref} // Attach the forwarded ref here
                />
            </>
        )
    }

    return (
        <>
            {label && <label className='z-0'>{label}{required && <sup className="ml-0.5 text-red-300">*</sup>}</label>}
            <input
                value={value}
                onChange={onChange}
                required={required}
                type={type}
                placeholder={placeholder}
                className="border-1 text-black/70 border-white mt-2 w-[90%] h-10 rounded-lg bg-white/40 p-2 placeholder:text-black/15 mb-4 outline-none text-sm "
            />
        </>
    );
});

export default InputModel;
