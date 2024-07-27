import React from 'react';
import { useAppContext } from '../hooks/ContextProvider';
import { Item } from '../constants';

const Input: React.FC = () => {
    const [value, setValue] = React.useState<string>('');
    const { addItem } = useAppContext();

    const handleItem = () => {
        const newItem: Item = { id: Date.now(), text: value }; // Generate a unique id using Date.now()
        addItem(newItem);
        setValue(''); // Clear the input field after adding the item
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
                <button className='button' onClick={handleItem}>
                    Add +
                </button>
            </div>
        </section>
    );
};

export default Input;
