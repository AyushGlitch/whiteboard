import { atom, useRecoilValue } from "recoil";



export const roomMemberAtom= atom({
    key: 'roomMembers',
    default: {
        username: "",
        roomId: "",
        isHost: false,
        score: 0,
        isTurn: false
    },

})


export const useRoomMemberAtomValue= () => {
    return useRecoilValue(roomMemberAtom)
}