import React from 'react';
import { useAppContext } from '../hooks/ContextProvider';
import { Item } from '../constants';

const Input: React.FC = () => {
    const [value, setValue] = React.useState<string>('');
    const [err, setErr] = React.useState<string>('')
    const { addItem } = useAppContext();

    const handleItem = () => {
        if (value == "") {
            setErr('*Input cannot be empty')
            return;
        }
        setErr('')
        const newItem: Item = { id: Date.now(), text: value };
        addItem(newItem);
        setValue('');
    };

    return (
        <section className='center'>
            <div className='input-container'>

                <input
                    type="text"
                    value={value}
                    placeholder='Enter text..'
                    className='input'
                    onChange={(e) => setValue(e.target.value)}
                />

                <button className=' button add-button' onClick={handleItem}>
                    Add +
                </button>
            </div>
            <p className='error-message'>{err}</p>
        </section>
    );
};

export default Input;
