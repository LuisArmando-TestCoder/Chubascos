import React from 'react'
import './styles.scss'

export default ({
	className = '',
	children,
	title = '',
	cta = '',
}) => {
	return (
		<div
			className={`container-decorator ${className}`}
		>
			<div className='container-decorator__info wrapper--padding wrapper--color-white'>
				{
					title && (
						<h2 className='container-decorator__title'>
							{title}
						</h2>
					)
				}
				{
					<a
						className='container-decorator__cta wrapper--cta'
						href={cta || '/'}
					>
						{cta || '/Página principal'}
					</a>
				}
			</div>
			<div className='container-decorator__children'>
				{children}
			</div>
		</div>
	)
}