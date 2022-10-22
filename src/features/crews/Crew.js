import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectCrewById } from './crewsApiSlice'

const Crew = ({ crewId }) => {
    const crew = useSelector(state => selectCrewById(state, crewId))

    const navigate = useNavigate()

    if (crew) {
        const handleEdit = () => navigate(`/dash/crews/${crewId}`)
        return (
            <tr className="table__row crew">
                <td className={`table__cell`}>{crew.name}</td>
                <td className={`table__cell`}>{crew.clubId}</td>
                <td className={`table__cell`}>{crew.event}
    
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Crew