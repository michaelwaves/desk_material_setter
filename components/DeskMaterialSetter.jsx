import { DeskData } from "./DeskData"

export default function DeskMaterialSetter({ setDeskMaterial }) {

    const buttons = DeskData.map((desk) => (
        <button className={"rounded-3xl w-12 h-12 hover:scale-110 hover:rounded-xl transition-all duration-50 " + desk.id}
            onClick={() => setDeskMaterial(desk.material)}></button>))

    const whiteButtons = DeskData.map((desk) => (
        <button className={"rounded-3xl w-12 h-12 hover:scale-110 hover:rounded-xl transition-all duration-50 " + desk.id}
            onClick={() => setDeskMaterial(desk.matwhite)}></button>))

    return (
        <div className="flex-col space-y-2">
            <div className="flex flex-row space-x-2 border-solid border-black border-4 rounded-xl p-2">
                {buttons}
            </div>
            <div className="flex flex-row space-x-2 border-solid border-white border-4 rounded-xl p-2">
                {whiteButtons}
            </div>
        </div>
    )
}