import React from 'react'
import * as Components from '../components'

const contacts = [
    // {
    //     href: 'https://github.com/LuisArmando-TestCoder',
    //     cta: 'Github',
    // },
    {
        href: 'https://www.instagram.com/latestcoder/',
        cta: 'Instagram',
    },
    {
        href: 'https://docs.google.com/document/d/1W-MDlWtRF2aVwTgcTcecp7eS2C_Y093DsN3s39_5wSA/edit?usp=sharing',
        cta: 'Sé de dónde no quiero huir, conceptos',
    },
    // {
    //     href: 'https://testcoder.netlify.com',
    //     cta: 'Portfolio',
    // },
]

export default () => {
    return (
        <Components.strings.GlobalWrapper title='Chubascos'>
            <Components.quarks.ReadModeToggler/>
            <Components.strings.ContainerDecorator
                title='Chubascos'
                cta='/poemas'
            >
                <Components.strings.Canvas effect='rain'/>
            </Components.strings.ContainerDecorator>
            <div className='wrapper--color-white wrapper--padding'>
                <p>Los poetas,</p>
                <p>como chubascos;</p>
                <p>lluvias repentinas</p>
                <p>dejando charcos.</p>
            </div>
            <ul className='wrapper--color-white wrapper--padding'>
                {
                    contacts.map(({href, cta}) => (
                        <li key={href}>
                            <a
                                className={`
                                    wrapper--cta
                                    wrapper--block
                                `}
                                href={href}
                                target='_blank'
                            >
                                {cta}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </Components.strings.GlobalWrapper>
    )
}
