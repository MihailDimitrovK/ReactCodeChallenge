import { useState, useContext, useEffect } from "react"
import { CompanyInformationContext } from "../../store/context"
import axios from "axios"

import styles from "./Highlights.module.css"

const Highlights = () => {
  const [currentCompanyId] = useContext(CompanyInformationContext)
  const [highlights, setHighlights] = useState()

  const negative = []
  const positive = []
  const neutral = []

  useEffect(() => {
    if (currentCompanyId) {
      try {
        axios
          .get(
            `http://localhost:3000/api/company/highlights/${currentCompanyId}`,
          )
          .then((result) => {
            setHighlights(result)
          })
      } catch (error) {
        //alert(error)
      }
    }
  }, [currentCompanyId])

  highlights
    && Object.keys(highlights.data.data).map((i) => {
        if (highlights.data.data[i]["classification"] === "negative") {
          negative.push(highlights.data.data[i])
        } else if (highlights.data.data[i]["classification"] === "positive") {
          positive.push(highlights.data.data[i])
        } else {
          neutral.push(highlights.data.data[i])
        }
      })
    

  negative.sort((a, b) => b.weight - a.weight)
  positive.sort((a, b) => b.weight - a.weight)
  neutral.sort((a, b) => b.weight - a.weight)

  const negativeArr = negative.map((i) => (
    <tr key={i.title}>
      <td className={styles.negative}></td>
      <td className={styles.cells}>{i.title}</td>
      <td className={styles.cells}>{i.message}</td>
    </tr>
  ))
  
  const positiveArr = positive.map((i) => (
    <tr key={i.title}>
      <td className={styles.positive}></td>
      <td className={styles.cells}>{i.title}</td>
      <td className={styles.cells}>{i.message}</td>
    </tr>
  ))

  const neutralArr = neutral.map((i) => (
    <tr key={i.title}>
      <td className={styles.neutral}></td>
      <td className={styles.cells}>{i.title}</td>
      <td className={styles.cells}>{i.message}</td>
    </tr>
  ))

  return (
    <div className={styles.container}>
      <table className={styles.layout}>
        <caption className={styles.caption}>Highlights</caption>
        <thead>
          <tr>
            <th className={styles.cells}></th>
            <th className={styles.cells}>Title</th>
            <th className={styles.cells}>Message</th>
          </tr>
        </thead>

        <tbody>
          {negativeArr}
          {positiveArr}
          {neutralArr}
        </tbody>
      </table>
    </div>
  )
}

export default Highlights
