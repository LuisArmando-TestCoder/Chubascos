import React from 'react'
import {
    Helmet,
} from 'react-helmet'
import {
    RecoilRoot,
} from 'recoil'
import RecoilOutside from 'recoil-outside'

import './styles.scss'

export default ({ children, title }) => {
    const HelmetWrapper = Helmet as any as React.ComponentType<{title: string}>

    return (
        <RecoilRoot>
            <RecoilOutside/>
            <HelmetWrapper title={title}>
                <meta
                    name='description'
                    content='Charcos tras mi paso. Chubascos de poemas.'
                />
                <meta charSet='utf-8'/>
            </HelmetWrapper>
            { children }
        </RecoilRoot>
    )
}