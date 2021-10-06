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
            <Components.quarks.SelectEmotion/>
            <Components.strings.Search/>
            <Components.atoms.Poems data={data}/>
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