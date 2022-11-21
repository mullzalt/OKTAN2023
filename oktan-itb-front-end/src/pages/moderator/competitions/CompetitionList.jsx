import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Pulse from '../../../components/loadings/Pulse'
import Spinner from '../../../components/loadings/Spinner'
import { ModeratorCompetitionItem } from '../../../components/moderator'
import { FilterRadio, SearchBar, AddButton } from '../../../components/tables/TableContainer'
import { Layout } from '../../../components/user'
import { useGetCompetitionsQuery } from '../../../features'
import { useCreateEmptyCompetitionsMutation } from '../../../features/competitions/competitionSlice'


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

  const navigate = useNavigate()

  const [queryParams, setQueryParams] = useState({
    where: '',
    drafted: 'false',
    category: ''
  })

  const [createCompetition, {
    data: createData,
    isLoading: isCreateLoading,
    isError: isCreateError,
    error: createError,
    isSuccess: isCreateSuccess }]
    = useCreateEmptyCompetitionsMutation()

  const { data, error, isLoading, refetch } = useGetCompetitionsQuery(queryParams)

  useEffect(() => {
    if (isCreateError) {
      toast.error(error.message)
    }

    if (isCreateSuccess) {
      toast.success('Berhasil menambahkan data')
      refetch()
      navigate(createData.id + '/edit')
    }


  }, [createError, isCreateLoading, isCreateError, createData, isCreateSuccess, refetch])

  const createHandle = async (e) => {
    e.preventDefault()
    try {
      const newCompetition = await createCompetition()
    } catch (error) {
      toast.error(error.message)
    }
  }

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

      <AddButton isLoading={false} onClick={createHandle} />
    </React.Fragment>
  )
}

export default CompetitionList