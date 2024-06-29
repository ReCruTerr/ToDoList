import React, { useCallback, useState } from 'react'
import styles from './inputPlus.module.scss'

interface I_inputPlusProps { 
    onAdd:(title:string) => void
}
export const InputPlus:React.FC<I_inputPlusProps> = ({onAdd})=> { 
    const [inputValue,setInputValue] = useState('');
    const addTasks = useCallback(()=> { 
        onAdd(inputValue);
        setInputValue('')
    },[inputValue])
    return( 
        <div className={styles.inputPlus}>
            <input type="text" 
            className={styles.inputPlusValue} 
            placeholder='some words'
            value={inputValue}
            onChange={(e)=>setInputValue(e.target.value)} 
            onKeyDown={(e)=> { 
                if (e.key == 'Enter') { 
                    addTasks();
                }
            }}/>
            <button aria-label='Add'
            onClick={()=> addTasks()}
            className={styles.inputPlusButton}
             >
                <img src="" alt="" />
            </button>
        </div>
    )
}