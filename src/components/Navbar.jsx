import { useDebounce } from '@/lib/utils'
import { useCategory } from '@/store'
import { Avatar, Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { SideDrawer } from './Drawer'

const Navbar = () => {
  const changeCategory = useCategory((state) => state.changeCategory)
  const resetCategory = useCategory((state) => state.resetCategory)
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

  const debouncedSearch = useDebounce(searchTerm)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    navigate('/')
  }

  const handleLogoClick = () => {
    resetCategory()
    navigate('/')
  }

  useEffect(() => {
    if (debouncedSearch && debouncedSearch !== '') {
      changeCategory(debouncedSearch)
    } else {
      changeCategory('New')
    }
  }, [debouncedSearch, changeCategory])

  return (
    <>
      <div className='h-16 flex justify-between items-center gap-10 p-5'>
        <SideDrawer />
        <Input
          size='sm'
          placeholder='Search...'
          type='text'
          className='max-w-60 md:max-w-96'
          onChange={handleSearch}
        />
        <Avatar src='/logo512.png' isBordered onClick={handleLogoClick} />
      </div>
      <Outlet />
    </>
  )
}
export default Navbar
