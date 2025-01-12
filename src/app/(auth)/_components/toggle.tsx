import React from 'react'

interface IAuthFormToggle{
    checked: boolean,
    setChecked: React.Dispatch<React.SetStateAction<boolean>>,
    text: string
}

const Toggle =({
    checked,
    setChecked,
    text
}: IAuthFormToggle) => {
    return (
        <label className="inline-flex items-center me-5 cursor-pointer">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={(e)=>setChecked(e.target.checked)}
                checked={checked}
            />
            <div className="relative w-9 h-5 bg-red-600 rounded-full peer
                peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                after:content-[''] after:absolute after:top-0.5 after:bottom-0.5 after:start-[2px] after:bg-black
                after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"
            ></div>
            <span className="ms-5 text-sm font-medium text-gray-900">{text}</span>
        </label>
    )
}
export default Toggle
