import { useContext } from "react"
import {
  SearchedResultContext,
  CompanyInformationContext,
} from "../../store/context"

import styles from "./SearchedResult.module.css"

const SearchedResult = () => {
  const [searchedValue] = useContext(SearchedResultContext)
  const [, setCurrentCompanyId] = useContext(CompanyInformationContext)

  const listItem = Object.keys(searchedValue.data.data).map((data) => (
    <tr key={searchedValue.data.data[data]["local_organization_id"]["id"]}>
      <td
        className={styles.link}
        onClick={() =>
          setCurrentCompanyId(
            searchedValue.data.data[data]["local_organization_id"]["id"],
          )
        }
      >
        {searchedValue.data.data[data]["company_name"]}
      </td>
      <td className={styles.cells}>
        {searchedValue.data.data[data]["local_organization_id"]["id"]}
      </td>
    </tr>
  ))

  return searchedValue.data.count !== 0 ? (
    <div className={styles.container}>
      <table className={styles.layout}>
        <thead>
          <tr>
            <th className={styles.cells}>Company Name</th>
            <th className={styles.cells}>Company ID</th>
          </tr>
        </thead>

        <tbody>{listItem}</tbody>
      </table>
    </div>
  ) : (
    <div className={styles.error}>No data found</div>
  )
}

export default SearchedResult
