import { atom } from 'recoil'
import { getWindow } from 'ssr-window'

const key = 'emotions'

export default atom({
    key,
    default: (() => {
        // try {
        //     const { sessionStorage } = getWindow()
        //     const value = JSON.parse(
        //         sessionStorage.getItem(key)
        //     )

        //     return value || []
        // } catch {
            return []
        // }
    })(),
})