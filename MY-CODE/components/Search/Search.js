import { useContext, useState } from "react"
import axios from "axios"
import Button from "../Button/Button"
import {SearchedResultContext,CompanyInformationContext,} from "../../store/context"

import styles from "./Search.module.css"

const Search = () => {
  const [inputValue, setInputValue] = useState("")
  const [, setSearchedValue] = useContext(SearchedResultContext)
  const [, currentCompanyId] = useContext(CompanyInformationContext)

  const onInputChangeValue = (e) => {
    setInputValue(e.target.value.trim())
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    currentCompanyId('')

    try {
      axios
        .get(`http://localhost:3000/api/search?query=${inputValue}`)
        .then((result) => {
          setSearchedValue(result)
        })
    } catch (error) {
      //alert(error)
    }

    setInputValue("")
  }

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="input" className={styles.label}>
          Search for company:
        </label>
        <input
          onChange={onInputChangeValue}
          className={styles.input}
          id="input"
          type="text"
          name="name"
          value={inputValue}
          placeholder="Company name, CVR, phone, email"
          required
        />

        <Button type="submit" value="Search" />
      </form>
    </div>
  )
}

export default Search
