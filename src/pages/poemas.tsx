import React from 'react'
import { graphql } from 'gatsby'
import * as Components from '../components'

export default ({ data }) => {
    return (
        <Components.strings.GlobalWrapper title='Chubascos'>
            <Components.quarks.ReadModeToggler/>
            <Components.strings.ContainerDecorator
                title='Chubascos / Poemas'
            >
                <Components.strings.Canvas effect='rain' />
            </Components.strings.ContainerDecorator>
            <ul className='wrapper--grid wrapper--padding'>
                {
                    data.allMarkdownRemark.edges.map(({ node }, index) => {
                        return (
                            <li key={index + node?.frontmatter?.title}>
                                <a
                                    className={`
                                        wrapper--cta
                                        wrapper--capitalize 
                                        wrapper--color-white 
                                        wrapper--opacity-hover 
                                        wrapper--big-font
                                    `}
                                    href={node?.frontmatter?.slug}
                                >{node?.frontmatter?.title.replace(/-/g, ' ')}</a>
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
                        slug
                    }
                }
            }
        }
    }  
`