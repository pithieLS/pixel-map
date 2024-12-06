import { getCursorPosInCanvas } from "./TransformUtils"
import axiosInstance from "../axiosInstance"
import { CELL_SIZE } from "../config/constants"
import { GetUserInfos } from "./UserInfos"
import { DrawSingleCell } from "./DrawingUtils"
import { useContext } from "react"
import { ColorContext } from "./context/ColorContext"

export function OnClickInCanvas(event, socket, canvas_pos) {
    let cursorPos = getCursorPosInCanvas({pos_x: event.clientX, pos_y: event.clientY})
    const { selectedColor } = useContext(ColorContext);
    
    // round to the cell size
    cursorPos.pos_x = Math.floor(cursorPos.pos_x/CELL_SIZE)
    cursorPos.pos_y = Math.floor(cursorPos.pos_y/CELL_SIZE)

    const cellData = {
        pos_x: cursorPos.pos_x,
        pos_y: cursorPos.pos_y,
        color: selectedColor,
        modified_by: GetUserInfos().id
    };
    
    DrawSingleCell(cellData)

    axiosInstance.post('/cells', cellData, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        socket.send(JSON.stringify(response.data));
    })
    .catch(error => {
        console.error("Error:", error);
    });
}