import React from 'react'
import { graphql } from 'gatsby'
import * as Components from '../components'

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}) {
    const title = 
    data
        .markdownRemark
        .frontmatter
        .title
        .replace(/-/g, ' ')

    return (
        <Components.strings.GlobalWrapper title={`Chubascos / ${title}`}>
            <Components.quarks.ReadModeToggler/>
            <Components.strings.ContainerDecorator
                title={
                    `Chubascos / ${title}`
                }
                cta='/poemas'
                className='wrapper--capitalize'
            >
                <Components.strings.Canvas effect='rain'/>
            </Components.strings.ContainerDecorator>
            <div
                className='wrapper--padding wrapper--color-black wrapper--background-white wrapper--front'
                dangerouslySetInnerHTML={{
                    __html: data.markdownRemark.html
                }}
            />
        </Components.strings.GlobalWrapper>
    )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        slug
        title
      }
    }
  }
`