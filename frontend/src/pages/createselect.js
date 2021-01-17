import React, { useState,useEffect } from 'react'
import CreatableSelect from "react-select/creatable"
const createOption = (label) => ({
    label: label,
    value: label,
})
const defaultOptions = [
    createOption("general director"),
    createOption("section manager"),
    createOption("group member"),
]
function CreateSelect({options,setoptions}){
    const [start, setStart] = useState(true)
    const [value, setValue] = useState("")
    const [isLoading,setisloading] = useState(false)
    const handleChange = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
        setValue(newValue)
    }
    const handleCreate = (inputValue) => {
        setisloading(true)
        console.group('Option created');
        console.log('Wait a moment...');
        setTimeout(() => {
          const newOption = createOption(inputValue);
          console.log(newOption);
          console.groupEnd();
          setisloading(false)
          setoptions([...options, newOption])
          setValue(newOption)
        }, 1000);
    }
    useEffect(()=>{
        if(start){
            setoptions(defaultOptions)
            setStart(false)
        }
    },[start])
    return (
        <CreatableSelect isClearable 
            isDisabled={isLoading}  isLoading={isLoading}
            onChange={handleChange} onCreateOption={handleCreate}
            options={options}       value={value}
            placeholder="Add group category..."/>
    )
  }

export default CreateSelect;