import { task } from '@z1/lib-feature-box-server-nedb'
import { Tail } from 'tail'

// main
export const tailCmd = task((t, a) => async (app, props) => {
    const tail = new Tail(props.path)
    return tail
})
