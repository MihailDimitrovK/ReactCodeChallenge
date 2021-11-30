import { useState, useContext, useEffect } from "react"
import { CompanyInformationContext } from "../../store/context"
import axios from "axios"

import styles from "./CompanyInformation.module.css"

const CompanyInformation = () => {
  const [currentCompanyId] = useContext(CompanyInformationContext)
  const [generalInformation, setGeneralInformation] = useState("")

  useEffect(() => {
    if (currentCompanyId) {
      try {
        axios
          .get(`http://localhost:3000/api/company/basics/${currentCompanyId}`)
          .then((result) => {
            setGeneralInformation(result)
          })
      } catch (error) {
        //alert(error)
      }
    }
  }, [currentCompanyId])

  let info = generalInformation && (
    <tr>
      <td className={styles.cells}>
        {generalInformation.data.data["vat"] ? "registered" : "not registered"}
      </td>
      <td className={styles.cells}>
        {generalInformation.data.data.email["email"]}
      </td>
      <td className={styles.cells}>
        {generalInformation.data.data.phone["phone_number"]}
      </td>
      <td className={styles.cells}>{generalInformation.data.data["score"]}</td>
      <td className={styles.cells}>
        {generalInformation.data.data.address["city"]}
      </td>
      <td className={styles.cells}>{generalInformation.data.data["status"]}</td>
      <td className={styles.cells}>
        {generalInformation.data.data["company_name"]}
      </td>
      <td className={styles.cells}>
        {generalInformation.data.data["company_type"]["long"]}
      </td>
      <td className={styles.cells}>
        {generalInformation.data.data["main_industry_code"]["code"]}
      </td>
      <td className={styles.cells}>
        {generalInformation.data.data["registered_capital"]["value"]}
      </td>
      <td className={styles.cells}>
        {generalInformation.data.data["date_of_incorporation"]}
      </td>
      <td className={styles.cells}>
        {generalInformation.data.data["local_organization_id"]["id"]}
      </td>
      <td className={styles.cells}>
        {generalInformation.data.data["company_secondary_names"]
          && generalInformation.data.data["company_secondary_names"][0].name
          }
      </td>
      <td className={styles.cells}>
        {generalInformation.data.data["risk_assessment"]}
      </td>
    </tr>
  )

  return (
    <div className={styles.container}>
      <table className={styles.layout}>
        <caption className={styles.caption}>Basic Company Information</caption>
        <thead>
          <tr>
            <th className={styles.cells}>Vat </th>
            <th className={styles.cells}>Email</th>
            <th className={styles.cells}>Phone</th>
            <th className={styles.cells}>Score</th>
            <th className={styles.cells}>Address</th>
            <th className={styles.cells}>Status</th>
            <th className={styles.cells}>Company Name</th>
            <th className={styles.cells}>Company type</th>
            <th className={styles.cells}>Main industry cod</th>
            <th className={styles.cells}>Registered capital</th>
            <th className={styles.cells}>Date of incorporation</th>
            <th className={styles.cells}>Local organization id</th>
            <th className={styles.cells}>Company secondary names</th>
            <th className={styles.cells}>Risk assessment</th>
          </tr>
        </thead>
        <tbody>{info}</tbody>
      </table>
    </div>
  )
}

export default CompanyInformation
