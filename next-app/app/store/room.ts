import { atom, useRecoilValue } from "recoil";

export const roomAtom= atom({
    key: 'room',
    default: {
        roomId: "",
        numOfMembers: 0,
        members: []
    }
})


export const useRoomAtomValue= () => {
    return useRecoilValue(roomAtom)
}