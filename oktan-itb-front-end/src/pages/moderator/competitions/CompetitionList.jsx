import React from 'react'
import { useState } from 'react'
import Pulse from '../../../components/loadings/Pulse'
import Spinner from '../../../components/loadings/Spinner'
import { ModeratorCompetitionItem } from '../../../components/moderator'
import { FilterRadio, SearchBar } from '../../../components/tables/TableContainer'
import { Layout } from '../../../components/user'
import { useGetCompetitionsQuery } from '../../../features'


const fiterOptions = [
  { title: 'PUBLIC', type: 'info', value: 'false' },
  { title: 'DRAFT', type: 'warning', value: 'true' }
]
const categoryOptions = [
  { title: 'ISOTERM', type: 'info', value: 'ISOTERM' },
  { title: 'CRYSTAL', type: 'primary', value: 'CRYSTAL' },
  { title: 'ALL', type: 'success', value: '' },
]

const CompetitionList = () => {

  const [queryParams, setQueryParams] = useState({
    where: '',
    drafted: 'false',
    category: ''
  })


  const { data, error, isLoading } = useGetCompetitionsQuery(queryParams)

  return (
    <React.Fragment>

      <SearchBar
        onChange={e => setQueryParams(prev => ({
          ...prev,
          where: e.target.value
        }))}
      />

      <div className='flex justify-between gap-2'>
        <FilterRadio key={'category'}
          options={categoryOptions}
          name={'category'}
          selected={queryParams.category}
          onChange={e => setQueryParams(prev => ({
            ...prev,
            category: e.target.value
          }))}
        />
        <FilterRadio key={'draft'}
          options={fiterOptions}
          name={'draft'}
          selected={queryParams.drafted}
          onChange={e => setQueryParams(prev => ({
            ...prev,
            drafted: e.target.value
          }))}
        />
      </div>

      <div className='grid grid-cols-4 gap-4'>
        {isLoading
          ? <Spinner />
          : error
            ? (<>Something went wrong</>)
            : data.map(competition => {
              return <ModeratorCompetitionItem id={competition.id} key={competition.id} />
            })
        }
      </div>
    </React.Fragment>
  )
}

export default CompetitionList