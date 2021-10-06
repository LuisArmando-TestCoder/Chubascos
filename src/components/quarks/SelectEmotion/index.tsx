import React from 'react'
import * as Components from '../..'
import { Emotions } from '../../../state'
import { useRecoilState } from 'recoil'
import './styles.scss'
import { getWindow } from 'ssr-window'

const emotionsNames = [
	'desperation', 'happy', 'love',
	'normal', 'sad'
] as const

function saveEmotions(emotions) {
	getWindow().sessionStorage.setItem(
		'emotions',
		JSON.stringify(emotions)
	)
}

export default ({
	className = '',
}) => {
	const [emotions, setEmotions] = useRecoilState(Emotions)

	return (
		<div className={`
			select-emotion 
			wrapper--color-white 
			wrapper--padding 
			${className}
		`}>
			<p>
				Busca poemas por su emoción:
			</p>
			{' '}
			<ul className='select-emotion__list'>
				<li className='select-emotion__item'>
					<button 
						onClick={() => {
							const newEmotions = []

							setEmotions(newEmotions)
							saveEmotions(newEmotions)
						}}
						className='select-emotion__filter-button'
					>
						X
					</button>
				</li>
				{
					emotionsNames.map(emotion => (
						<li key={emotion} className='select-emotion__item'>
							<button 
								onClick={() => {
									if (emotions.includes(emotion)) {
										const newEmotions = [...emotions]

										newEmotions.splice(
											newEmotions.indexOf(emotion), 1
										)

										setEmotions(newEmotions)
										saveEmotions(newEmotions)

										return
									}

									const newEmotions = [...emotions, emotion]

									setEmotions(newEmotions)
									saveEmotions(newEmotions)
								}}
								className='select-emotion__filter-button'
							>
								<Components.strings.Icon
									className={emotions.includes(emotion) ? 'selected' : ''}
									name={emotion}
								/>
							</button>
						</li>
					))
				}
			</ul>
		</div>
	)
}