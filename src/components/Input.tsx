import React from 'react'

const Input = () => {
    const [value, setValue] = React.useState('')
    return (
        <section className='center'>
            <div className='input-container'>
                <input type="text" placeholder='Enter text..' className='input' />
                <button className='button'>
                    Add +
                </button>
            </div>
        </section>
    )
}

export default Input