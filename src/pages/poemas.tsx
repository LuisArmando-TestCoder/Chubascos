import React, { FormEvent, useState } from 'react'
import { graphql } from 'gatsby'
import * as Components from '../components'

function getTitle(node): string {
    return node?.frontmatter?.title.replace(/-/g, ' ')
}

export default ({ data }) => {
    const [
        search, 
        setSearch
    ] = useState('')

    return (
        <Components.strings.GlobalWrapper title='Chubascos'>
            <Components.quarks.ReadModeToggler/>
            <Components.strings.ContainerDecorator
                title='Chubascos / Poemas'
            >
                <Components.strings.Canvas effect='rain' />
            </Components.strings.ContainerDecorator>
            <div className='wrapper--padding'>
                <input
                    placeholder='Busca poemas'
                    className='wrapper--search'
                    type='search'
                    value={search}
                    onChange={(event: FormEvent) => {
                        const {target} = event.nativeEvent

                        setSearch(target['value'])
                    }}
                />
            </div>
            <ul className='wrapper--grid wrapper--padding'>
                {
                    data.allMarkdownRemark.edges
                    .filter(({ node }) => {
                        return getTitle(node)
                        .toLowerCase?.()
                        .includes(
                            search?.toLowerCase?.()
                        )
                    })
                    .map(({ node }, index) => {
                        const title = getTitle(node)

                        return (
                            <li key={index + title}>
                                <a
                                    className={`
                                        wrapper--cta
                                        wrapper--capitalize 
                                        wrapper--color-white 
                                        wrapper--opacity-hover 
                                        wrapper--big-font
                                        highlight--parent
                                    `}
                                    href={node?.frontmatter?.slug}
                                >
                                    <Components.strings.Icon
                                        className='emotion'
                                        name={node?.frontmatter?.tags[0]}
                                    />
                                    {title}
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        </Components.strings.GlobalWrapper>
    )
}

export const pageQuery = graphql`
    query {
        allMarkdownRemark {
            edges {
                node {
                    frontmatter {
                        title
                        tags
                        slug
                    }
                }
            }
        }
    }  
`