import React, {RefObject,useRef, useEffect, useState} from "react";
import './index.css'
import Icon from "./select-icon";
export interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
}

interface SelectOption {
    label: string;
    value: string;
}



const Select: React.FC<SelectProps> = ({value, onChange, options}) => {
    const wrapperRef = useRef(null);
    

    function useOutsideAlerter(ref: RefObject<HTMLDivElement>) {
        useEffect(() => {
          function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
              setOpen(false);
            }
          }

          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
    }

    useOutsideAlerter(wrapperRef);

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Array<SelectOption> | []>([]);
    const [searchText, setSearchText] = useState<String>('');
    const [optionsList, setOptionsList] = useState<Array<SelectOption> | []>(options);
    
    useEffect(()=>{
      if(selected.length>0){
        // @ts-ignore: Unreachable code error
        setOptionsList(options.filter((option)=>!selected.includes(option))); 
      }else{
        setOptionsList(options.filter(option=>option.label.toLowerCase().includes(searchText.toLowerCase())));
    }
    }, [searchText]);
    
    const handleSelect = (option: SelectOption, index: number) => {
        setSelected([...selected, option]);
        setOptionsList(optionsList.filter((_, i) => i !== index));    
    }

    return (
        <div className="container" onClick={() => setOpen(true)} ref={wrapperRef}>
            
            <div className={`inside-container ${open?'active':''}`}>
            <label htmlFor="searchInput" className="selected-container">
              {selected.map((item, index) => (
                <div className="selected-item" key={index}>
                    <span>{item.label}</span>
                    <span className="select-item-close" onClick={() => {
                        setSelected(selected.filter((_, i) => i !== index));
                        setOptionsList([...optionsList, item]);
                    }}>x</span>
                    
                </div>
              ))}

             {open?
             <input className="input" id="searchInput" name="searchInput" onChange={(event)=>{
                setSearchText(event.target.value);
               }}/>:null}
             </label>

             <div className="options">
             <div onClick={()=>{
                setSelected([]);
                setOptionsList(options);
             }}><Icon name="close"/></div>
             <Icon name="line" size={24}/>
             {open?<div onClick={()=>{setOpen(false)}}><Icon name="up"/></div>:
              <div onClick={()=>{setOpen(true)}}><Icon name="down"/></div>
             }
             </div>
             </div>

            <div role="listbox" className="listbox" hidden={!open}>
                <p role='listitem' className="listitem">
                {optionsList.map((option, index) => (
                    <p role='listitem' className="listitem" onClick={()=>handleSelect(option, index)}>{option.label}</p>
                ))}
                </p>
                {optionsList.length<=0 && <p className="text-center">No Options</p>}
            </div>
        </div>
    );
}


export default Select;