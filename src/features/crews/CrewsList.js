import { useGetCrewsQuery } from "./crewsApiSlice"
import Crew from "./Crew"

const CrewsList = () => {
    const {
        data: crews,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCrewsQuery()

    let content

    if (isLoading) content = <p>Loading ...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }
    if (isSuccess) {

        const { ids } = crews

        console.log(crews)

        const tableContent = ids?.length
            ? ids.map(crewId => <Crew key={crewId} crewId={crewId} />)
            : null

        content = (
            <table className="table table--crews">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th crew__crewname">Crewname</th>
                        <th scope="col" className="table__th crew__roles">Roles</th>
                        <th scope="col" className="table__th crew__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default CrewsList