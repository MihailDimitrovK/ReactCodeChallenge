import { useState, useContext, useEffect } from "react"
import { CompanyInformationContext } from "../../store/context"
import axios from "axios"

import styles from "./Relations.module.css"

const Relations = () => {
  const [currentCompanyId] = useContext(CompanyInformationContext)

  const [relations, setRelations] = useState()

  useEffect(() => {
    if (currentCompanyId) {
      try {
        axios
          .get(
            `http://localhost:3000/api/company/relations/${currentCompanyId}`,
          )
          .then((result) => {
            setRelations(result)
          })
      } catch (error) {
        //alert(error)
      }
    }
  }, [currentCompanyId])

  let arrDate = []

  relations
    && relations.data.data.forEach((element) => {
        arrDate.push(element.name)
        element.functions.forEach((e) => {
          let date1 = new Date(e.valid_from)
          let date2
          if (e.valid_to) {
            date2 = new Date(e.valid_to)
          } else {
            date2 = new Date()
          }

          const diffTime = Math.abs(date2 - date1)
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) / 365)
          console.log(diffDays)
          arrDate.push(diffDays)
        })
      })
    

  return (
    <div className={styles.container}>
      <table>
        <caption className={styles.caption}>Relations</caption>

        <tbody>
          <tr>
            {arrDate.map((e) => (
              <td className={styles.cells} key={Math.random()}>
                {e}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Relations
