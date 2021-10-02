import React, {EffectCallback, useEffect} from 'react'
import './styles.scss'

export default ({
	className = '',
	effect = ''
}) => {
	useEffect(() => {
		let clean: EffectCallback

		async function getEffect() {
			const {
				default: canvasEffect
			} = await import(
				`../../../effects/${effect}`
			)

			canvasEffect.start(effect)

			clean = canvasEffect.clean
		}

		getEffect()

		return () => clean?.()
	}, [])

	return (
		<canvas 
			id={effect} 
			className={`canvas ${className}`}
		/>
	)
}