import { Input } from '@/components/ui/input'
import React from 'react'

function InputField({ item, handleInputChanges, carInfo }) {
    return (
        <div>
            <Input type={item.fieldType}
                required={item.required}
                defaultValue={carInfo?.[item.name]}
                onChange={(e) => handleInputChanges(item.name, e.target.value)}
            />
        </div>
    )
}

export default InputField