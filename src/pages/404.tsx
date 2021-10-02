import React from 'react'
import * as Components from '../components'

export default () => {
    return (
        <Components.strings.GlobalWrapper title='Chubascos / 404'>
            <Components.strings.ContainerDecorator
                title='Chubascos / 404'
            >
                <Components.strings.Canvas effect='rain' />
            </Components.strings.ContainerDecorator>
        </Components.strings.GlobalWrapper>
    )
}
