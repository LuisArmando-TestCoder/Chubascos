import React, {useState, useEffect} from 'react'
import { getWindow } from 'ssr-window'
import * as Components from '../..'
import {state} from '../../../effects/rain'

import './styles.scss'

export default ({
	className = '',
}) => {
	const [
		readMode, setReadMode
	] = useState(
		(() => {
			try {
				return JSON.parse(
					getWindow().localStorage.getItem('read-mode')
				)
			} catch {
				return false
			}
		})()
	)

	useEffect(() => {
		getWindow().localStorage.setItem(
			'read-mode', JSON.stringify(readMode)
		)

		state.isReadMode = readMode
	}, [readMode])

	return (
		<button
			onClick={
				() => setReadMode(!readMode)
			}
			className={`read-mode-toggler ${className} read-mode-toggler--${
				readMode ? 'activated' : ''
			}`} 
			role='button'
		>
			<Components.strings.Icon name='book'/>
		</button>
	)
}