import React from 'react'
import ProfilePicUpload from './ProfilePicUpload'

export default function ProfilePic(props) {
    return (
        <div>
            <img src={ props.profilePicUrl } alt={ `${props.firstname} ${props.lastname}` }/>
            <button onClick={ props.toggleUploader } >Toggle Uploader</button>
        </div>
    )
}
