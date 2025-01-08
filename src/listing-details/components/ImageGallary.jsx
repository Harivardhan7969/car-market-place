import React from 'react'

function ImageGallary({ carDetails }) {
    return (
        <div>
            <img src={carDetails?.images[0].imageUrl} className='w-full h-[500px] object-cover rounded-xl ' />
        </div>
    )
}

export default ImageGallary