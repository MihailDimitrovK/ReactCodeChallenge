import React, { useState } from "react"
import {
  SearchedResultContext,
  CompanyInformationContext,
} from "../MY-CODE/store/context"
import Search from "../MY-CODE/components/Search/Search"
import SearchResult from "../MY-CODE/components/SearchedResults/SearchedResult"
import CompanyInformation from "../MY-CODE/components/CompanyInformation/CompanyInformation"
import Highlights from "../MY-CODE/components/Highlights/Highlights"
import Relations from "../MY-CODE/components/Relations/Relations"

const App = () => {
  const [searchedValue, setSearchedValue] = useState("")
  const [currentCompanyId, setCurrentCompanyId] = useState("")

  return (
    <SearchedResultContext.Provider value={[searchedValue, setSearchedValue]}>
      <CompanyInformationContext.Provider
        value={[currentCompanyId, setCurrentCompanyId]}
      >
        <Search />
        {searchedValue && <SearchResult />}
        {currentCompanyId && <CompanyInformation />}
        {currentCompanyId && <Highlights />}
        {currentCompanyId && <Relations />}
      </CompanyInformationContext.Provider>
    </SearchedResultContext.Provider>
  )
}

export default App
