import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useCategory } from '@/store'
import { Button } from '@nextui-org/react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'

const categories = [
  { name: 'New' },
  { name: 'Coding' },
  { name: 'ReactJS' },
  { name: 'NextJS' },
  { name: 'Music' },
  { name: 'Education' },
  { name: 'Podcast' },
  { name: 'Movie' },
  { name: 'Gaming' },
  { name: 'Live' },
  { name: 'Sport' },
  { name: 'Comedy' },
  { name: 'Gym' },
]

export function SideDrawer() {
  const currCtg = useCategory((state) => state.category)
  const changeCategory = useCategory((state) => state.changeCategory)

  const navigate = useNavigate()

  const handleCategoryChange = (e) => {
    changeCategory(e.target.innerText)
    navigate('/')
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <RxHamburgerMenu className='text-3xl' />
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle>Relevant</DrawerTitle>
            <DrawerDescription>
              Find videos effectively with relevant tags
            </DrawerDescription>
          </DrawerHeader>
          <div className='p-4 pb-0'>
            <div className='flex flex-wrap items-center justify-center gap-2'>
              {categories.map((category) => (
                <DrawerClose asChild key={category.name}>
                  <Button
                    color={currCtg === category.name ? 'danger' : 'default'}
                    onClick={handleCategoryChange}>
                    {category.name}
                  </Button>
                </DrawerClose>
              ))}
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
