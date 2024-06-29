import styles from './index.module.scss'
import React, { useEffect, useRef, useState } from 'react';

interface InputTaskProps { 
    id:string;
    title:string;
    onDone:(id:string) => void;
    onEdited:(id:string, title:string) => void;
    onRemoved:(id:string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
    id,
    title,
    onDone,
    onEdited,
    onRemoved

}) => { 
    const [checked,setChecked] = useState(false) 
    const [editMode,setEditMode] = useState(false)
    const [value,setValue] = useState(title)
    const editTitleRef = useRef<HTMLInputElement>(null)

    useEffect(()=> { 
        if (editMode) { 
            editTitleRef?.current?.focus();
        }
    },[editMode])

    return ( 
        <div className={styles.InputTask}>
            <label htmlFor="" className={styles.InputTaskLabel}>
                <input type="checkbox"
                disabled={editMode}
                checked={checked}
                className={styles.InputTaskCheckBox}
                onChange={(e)=>{
                    setChecked(e.target.checked)
                    if (e.target.checked) { 
                        setTimeout(()=>{ 
                            onDone(id);
                        },300)
                    }
                }}/>
                {editMode ? (
                    <input value={value}
                     onChange={((e)=>setValue(e.target.value))} 
                     onKeyDown={(e)=> { 
                        if( e.key == 'Enter') {
                            onEdited(id, value)
                            setEditMode(false)
                        }
                     }}
                     className={styles.InputTaskTitleEdit} />
                ) : (<h3 className={styles.InputTaskTitle}>{value}</h3>)}
                
            </label>
            {
                editMode ? (
                    <button aria-label='Save'
                    className={styles.InputTaskSave}
                    onClick={()=> { 
                        onEdited(id, value)
                        console.log(editMode);
                        setEditMode(false)                        

                    }}> 
                    </button>
                ) :(
                    <button aria-label='Edit'
                    className={styles.InputTaskEdit}
                    onClick={()=> { 
                        setEditMode(true)
                        console.log(editMode);
                    }}> 
                    </button>
                )
            }

            <button
            aria-label='Remove'
            className={styles.InputTaskRemove}
            onClick={()=> { 
                if (confirm('Are you sure ?')) { 
                    onRemoved(id);
                }
            }}
            >
                
            </button>
        </div>
    )
}