import GameInfo from "./GameInfo";
import {TbClick} from "react-icons/tb";
import ControlButton from "./ControlButton";
import {useContext} from "react";
import {GameContext} from "../../store/GameContext";
import {useNavigate} from "react-router-dom";
import {FaFlagCheckered} from "react-icons/fa";
import GameClock from "./GameClock";

/**
 * Renders the game controls, either on the right or on the bottom of the puzzle board
 * this includes the game information (moves/clock) and the action buttons
 * @returns {JSX.Element}
 * @constructor
 */
const GameControls = () => {
    /**
     * @type {import('../../store/GameContext').GameContextType}
     */
    const {game, start, togglePause, pickNewImage} = useContext(GameContext);

    /**
     * @type {NavigateFunction} navigate instance to go to the "change size" screen
     */
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-between gap-2">
            <div className="flex flex-row md:flex-col gap-4 justify-between">
                <GameInfo label="التحركات" icon={<TbClick />}>{game?.moves?.length ?? 0}</GameInfo>
                <GameClock />
                {game?.gameWon && (
                    <GameInfo icon={<FaFlagCheckered />}>مبروك</GameInfo>
                )}
            </div>
            <div className="flex flex-row md:flex-col gap-2">
                {(!game?.startTime) && [
                    <ControlButton onClick={start} key="startGame">بدء اللعبة</ControlButton>,
                    <ControlButton onClick={pickNewImage} key="changeImage">تغيير الصورة</ControlButton>
                ]}
                {(!!game?.startTime) && (!game?.gameWon) && (
                    <ControlButton onClick={togglePause}>
                        {game.pauseTime ? 'الاستمرار' : 'إيقاف'}
                    </ControlButton>
                )}
                {(!!game?.startTime) && (
                    <ControlButton onClick={pickNewImage}>لعبة الجديد</ControlButton>
                )}
                <ControlButton onClick={() => navigate('/select-size')}>تحديد الحجم</ControlButton>
            </div>
        </div>
    );
}

export default GameControls;