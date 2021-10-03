import React from 'react'
import {
    Icons as IconsState
} from '../../../state'
import {
    usePromisedRecoilValue
} from '../../../utils'

interface Properties {
    name: 'book'
    className?: string
}

export default ({
    name,
    className = ''
}: Properties) => {
    const icon = usePromisedRecoilValue(IconsState, {
        transform: icons => icons[name]
    })

    return (
        <span
            className={`icon ${className}`}
            dangerouslySetInnerHTML={{__html: icon}}
        />
    )
}

