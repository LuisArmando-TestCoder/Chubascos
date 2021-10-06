import React from 'react'
import * as Components from '../..'
import { Search, Emotions } from '../../../state'
import { useRecoilValue } from 'recoil'
import './styles.scss'

function getTitle(node): string {
	return node?.frontmatter?.title.replace(/-/g, ' ')
}

export default ({
	className = '',
	data
}) => {
	const search = useRecoilValue(Search)
	const emotions = useRecoilValue(Emotions)

	return (
		<ul className={`
				poems 
				${className}
				wrapper--grid 
				wrapper--padding
			`}
		>
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
						const emotion = node?.frontmatter?.tags[0]

						if (
							emotions.includes(emotion) || 
							emotions.length === 0
						) return (
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
										name={emotion}
									/>
									{title}
								</a>
							</li>
						)
					})
			}
		</ul>

	)
}