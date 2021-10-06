import React, { FormEvent } from 'react'
import { Search } from '../../../state'
import { useRecoilState } from 'recoil'
import './styles.scss'

export default ({
	className = '',
}) => {
    const [
        search, 
        setSearch
    ] = useRecoilState(Search)

	return (
		<div className={`search ${className} wrapper--padding`}>
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
	)
}