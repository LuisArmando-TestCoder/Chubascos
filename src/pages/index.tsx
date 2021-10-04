import React from 'react'
import * as Components from '../components'

const contacts = [
    {
        href: 'https://github.com/LuisArmando-TestCoder',
        cta: 'Github',
    },
    {
        href: 'https://www.wattpad.com/user/Odoriens',
        cta: 'Wattpad',
    },
    {
        href: 'https://www.instagram.com/latestcoder/',
        cta: 'Instagram',
    },
    {
        href: 'https://testcoder.netlify.com',
        cta: 'Portfolio',
    },
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
                <p>
                    Porque miro de frente
                </p>
                <p>
                    a mis pensamientos,
                </p>
                <p>
                    escribo estos poemas.
                </p>
                <br />
                <p>
                    Porque soy parte del todo
                </p>
                <p>
                    y no hay quien me detenga.
                </p>
            </div>
            <ul className='wrapper--color-white wrapper--padding'>
                {
                    contacts.map(({href, cta}) => (
                        <li key={href}>
                            <a
                                className={`
                                    wrapper--opacity-hover
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
